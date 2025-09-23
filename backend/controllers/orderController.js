import Cart from "../models/Cart.js";
import Order from "../models/Order.js";
import Product from "../models/Product.js";

export const placeOrder = async (req, res) => {
  try {
    const user = req.user;
    const { shippingAddress = {}, paymentMethod = "COD", couponCode = null } = req.body;

    const cart = await Cart.findOne({ user: user._id }).populate("items.product");
    if (!cart || cart.items.length === 0) return res.status(400).json({ message: "Cart is empty" });

    // Calculate prices
    let itemsPrice = 0;
    const orderItems = [];
    for (const it of cart.items) {
      const prod = it.product;
      if (prod.stock < it.quantity) return res.status(400).json({ message: `Insufficient stock for ${prod.name}` });
      orderItems.push({
        product: prod._id,
        name: prod.name,
        price: prod.price,
        quantity: it.quantity
      });
      itemsPrice += prod.price * it.quantity;
    }

    let discountPercent = 0;
    if (couponCode) {
      // try apply coupon
      const Coupon = (await import("../models/Coupon.js")).default;
      const coupon = await Coupon.findOne({ code: couponCode, active: true });
      if (coupon && (!coupon.expiresAt || coupon.expiresAt > new Date())) {
        discountPercent = coupon.discountPercent || 0;
      }
    }

    const discountAmount = (itemsPrice * discountPercent) / 100;
    const itemsAfterDiscount = itemsPrice - discountAmount;

    const shippingPrice = itemsAfterDiscount > 1000 ? 0 : 50; // example
    const taxPrice = +(itemsAfterDiscount * 0.05).toFixed(2);
    const totalPrice = +(itemsAfterDiscount + shippingPrice + taxPrice).toFixed(2);

    // Decrease product stock
    for (const it of cart.items) {
      const prod = await Product.findById(it.product._id);
      prod.stock = Math.max(0, prod.stock - it.quantity);
      await prod.save();
    }

    // Create order
    const order = await Order.create({
      user: user._id,
      items: orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
      coupon: couponCode ? { code: couponCode, discountPercent } : undefined
    });

    // Clear cart
    cart.items = [];
    await cart.save();

    res.status(201).json(order);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: e.message });
  }
};

export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).populate("user", "name email").sort({ createdAt: -1 });
    res.json(orders);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const order = await Order.findById(id);
    if (!order) return res.status(404).json({ message: "Order not found" });
    order.status = status || order.status;
    await order.save();
    res.json(order);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
