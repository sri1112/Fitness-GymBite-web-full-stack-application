const User = require("../models/users1Model");

exports.create = async (req, res) => {
  try {
    await User.createUser(req.body);
    res.json({ success: true, message: "User created" });
  } catch (err) {
    console.error("Error in create:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    const users = await User.getAllUsers();
    res.json(users);
  } catch (err) {
    console.error("Error in getAll:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const user = await User.getUserById(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    console.error("Error in getById:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    await User.updateUser(req.params.id, req.body);
    res.json({ success: true, message: "User updated" });
  } catch (err) {
    console.error("Error in update:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    await User.deleteUser(req.params.id);
    res.json({ success: true, message: "User deleted" });
  } catch (err) {
    console.error("Error in remove:", err);
    res.status(500).json({ error: err.message });
  }
};
exports.getAllWithMappings = async (req, res) => {
  try {
    const users = await User.getUsersWithMappings();
    res.json(users);
  } catch (err) {
    console.error("Error in getAllWithMappings:", err);
    res.status(500).json({ error: err.message });
  }
};
