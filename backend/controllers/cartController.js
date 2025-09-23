import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate("items.product");
    if (!cart) return res.json({ items: [] });
    res.json(cart);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export const addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });
    if (product.stock < quantity) return res.status(400).json({ message: "Insufficient stock" });

    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) cart = await Cart.create({ user: req.user._id, items: [] });

    const idx = cart.items.findIndex(i => i.product.toString() === productId);
    if (idx > -1) {
      cart.items[idx].quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }

    await cart.save();
    res.json(cart);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export const updateCartItem = async (req, res) => {
  try {
    const { itemId } = req.params; // itemId is productId (to keep simple)
    const { quantity } = req.body;
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const idx = cart.items.findIndex(i => i.product.toString() === itemId);
    if (idx === -1) return res.status(404).json({ message: "Item not in cart" });

    if (quantity <= 0) {
      cart.items.splice(idx, 1);
    } else {
      // Check stock
      const product = await Product.findById(itemId);
      if (product.stock < quantity) return res.status(400).json({ message: "Insufficient stock" });
      cart.items[idx].quantity = quantity;
    }
    await cart.save();
    res.json(cart);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export const removeCartItem = async (req, res) => {
  try {
    const { itemId } = req.params; // productId
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });
    cart.items = cart.items.filter(i => i.product.toString() !== itemId);
    await cart.save();
    res.json(cart);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
