import Product from "../models/Product.js";
import Coupon from "../models/Coupon.js";

export const createCoupon = async (req, res) => {
  try {
    const { code, discountPercent, expiresAt } = req.body;
    if (!code || discountPercent == null) return res.status(400).json({ message: "Missing fields" });
    const existing = await Coupon.findOne({ code });
    if (existing) return res.status(400).json({ message: "Coupon code exists" });

    const coupon = await Coupon.create({ code, discountPercent, expiresAt });
    res.status(201).json(coupon);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export const getCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.find({});
    res.json(coupons);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export const updateCoupon = async (req, res) => {
  try {
    const coupon = await Coupon.findById(req.params.id);
    if (!coupon) return res.status(404).json({ message: "Coupon not found" });
    Object.assign(coupon, req.body);
    await coupon.save();
    res.json(coupon);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export const deleteCoupon = async (req, res) => {
  try {
    const coupon = await Coupon.findById(req.params.id);
    if (!coupon) return res.status(404).json({ message: "Coupon not found" });
    await coupon.remove();
    res.json({ message: "Coupon removed" });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
