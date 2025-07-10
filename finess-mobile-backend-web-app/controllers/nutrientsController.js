const Nutrient = require("../models/nutrientsModel");

// ✅ Create
exports.create = async (req, res) => {
  try {
    await Nutrient.createNutrient(req.body);
    res.json({ success: true, message: "Nutrient created" });
  } catch (err) {
    console.error("Error in create:", err);
    res.status(500).json({ error: err.message });
  }
};

// ✅ Get All
exports.getAll = async (req, res) => {
  try {
    const nutrients = await Nutrient.getAllNutrients();
    res.json(nutrients);
  } catch (err) {
    console.error("Error in getAll:", err);
    res.status(500).json({ error: err.message });
  }
};

// ✅ Get By ID
exports.getById = async (req, res) => {
  try {
    const nutrient = await Nutrient.getNutrientById(req.params.id);
    if (!nutrient) return res.status(404).json({ error: "Nutrient not found" });
    res.json(nutrient);
  } catch (err) {
    console.error("Error in getById:", err);
    res.status(500).json({ error: err.message });
  }
};

// ✅ Update
exports.update = async (req, res) => {
  try {
    await Nutrient.updateNutrient(req.params.id, req.body);
    res.json({ success: true, message: "Nutrient updated" });
  } catch (err) {
    console.error("Error in update:", err);
    res.status(500).json({ error: err.message });
  }
};

// ✅ Delete
exports.delete = async (req, res) => {
  try {
    await Nutrient.deleteNutrient(req.params.id);
    res.json({ success: true, message: "Nutrient deleted" });
  } catch (err) {
    console.error("Error in delete:", err);
    res.status(500).json({ error: err.message });
  }
};
