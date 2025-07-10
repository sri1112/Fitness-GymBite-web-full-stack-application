const Product = require("../models/productsModel");

exports.create = async (req, res) => {
  try {
    await Product.createProduct(req.body);
    res.json({ success: true, message: "Product created" });
  } catch (err) {
    console.error("Error in create:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    const products = await Product.getAllProducts();
    res.json(products);
  } catch (err) {
    console.error("Error in getAll:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const product = await Product.getProductById(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json(product);
  } catch (err) {
    console.error("Error in getById:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    await Product.updateProduct(req.params.id, req.body);
    res.json({ success: true, message: "Product updated" });
  } catch (err) {
    console.error("Error in update:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    await Product.deleteProduct(req.params.id);
    res.json({ success: true, message: "Product deleted" });
  } catch (err) {
    console.error("Error in remove:", err);
    res.status(500).json({ error: err.message });
  }
};
