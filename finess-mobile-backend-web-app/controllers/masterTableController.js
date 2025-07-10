const MasterTable = require("../models/masterTableModel");

exports.create = async (req, res) => {
  try {
    await MasterTable.createEntry(req.body);
    res.json({ success: true, message: "Entry created" });
  } catch (err) {
    console.error("Error in create:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    const entries = await MasterTable.getAllEntries();
    res.json(entries);
  } catch (err) {
    console.error("Error in getAll:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const entry = await MasterTable.getEntryById(req.params.id);
    if (!entry) return res.status(404).json({ error: "Entry not found" });
    res.json(entry);
  } catch (err) {
    console.error("Error in getById:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    await MasterTable.updateEntry(req.params.id, req.body);
    res.json({ success: true, message: "Entry updated" });
  } catch (err) {
    console.error("Error in update:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    await MasterTable.deleteEntry(req.params.id);
    res.json({ success: true, message: "Entry deleted" });
  } catch (err) {
    console.error("Error in remove:", err);
    res.status(500).json({ error: err.message });
  }
};
