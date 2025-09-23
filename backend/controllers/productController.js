import Product from "../models/Product.js";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const p = await Product.findById(req.params.id);
    if (!p) return res.status(404).json({ message: "Product not found" });
    res.json(p);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { name, description, price, stock, category, image } = req.body;
    const product = await Product.create({ name, description, price, stock, category, image });
    res.status(201).json(product);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const p = await Product.findById(req.params.id);
    if (!p) return res.status(404).json({ message: "Product not found" });

    const updates = req.body;
    Object.assign(p, updates);
    await p.save();
    res.json(p);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const p = await Product.findById(req.params.id);
    if (!p) return res.status(404).json({ message: "Product not found" });
    await p.remove();
    res.json({ message: "Product removed" });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
