const Gym = require("../models/gymsModel");

// ✅ Create
exports.create = async (req, res) => {
  try {
    const data = req.body;
    await Gym.createGym(data);
    res.json({ success: true, message: "Gym created" });
  } catch (err) {
    console.error("Error in create:", err);
    res.status(500).json({ error: err.message });
  }
};

// ✅ Get All
exports.getAll = async (req, res) => {
  try {
    const gyms = await Gym.getAllGyms();
    res.json(gyms);
  } catch (err) {
    console.error("Error in getAll:", err);
    res.status(500).json({ error: err.message });
  }
};

// ✅ Get By ID
exports.getById = async (req, res) => {
  try {
    const id = req.params.id;
    const gym = await Gym.getGymById(id);
    if (!gym) {
      return res.status(404).json({ error: "Gym not found" });
    }
    res.json(gym);
  } catch (err) {
    console.error("Error in getById:", err);
    res.status(500).json({ error: err.message });
  }
};

// ✅ Update
exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    await Gym.updateGym(id, data);
    res.json({ success: true, message: "Gym updated" });
  } catch (err) {
    console.error("Error in update:", err);
    res.status(500).json({ error: err.message });
  }
};

// ✅ Delete
exports.remove = async (req, res) => {
  try {
    const id = req.params.id;
    await Gym.deleteGym(id);
    res.json({ success: true, message: "Gym deleted" });
  } catch (err) {
    console.error("Error in remove:", err);
    res.status(500).json({ error: err.message });
  }
};
