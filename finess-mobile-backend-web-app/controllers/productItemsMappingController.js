const ProductItemsMapping = require("../models/productItemsMappingModel");

exports.add = async (req, res) => {
  try {
    await ProductItemsMapping.addMapping(req.body);
    res.json({ success: true, message: "Item mapped to product" });
  } catch (err) {
    console.error("Error in add:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    const mappings = await ProductItemsMapping.getAllMappings();
    res.json(mappings);
  } catch (err) {
    console.error("Error in getAll:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const mapping = await ProductItemsMapping.getMappingById(req.params.id);
    if (!mapping) return res.status(404).json({ error: "Mapping not found" });
    res.json(mapping);
  } catch (err) {
    console.error("Error in getById:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    await ProductItemsMapping.updateMapping(req.params.id, req.body);
    res.json({ success: true, message: "Mapping updated" });
  } catch (err) {
    console.error("Error in update:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    await ProductItemsMapping.deleteMapping(req.params.id);
    res.json({ success: true, message: "Mapping deleted" });
  } catch (err) {
    console.error("Error in remove:", err);
    res.status(500).json({ error: err.message });
  }
};
