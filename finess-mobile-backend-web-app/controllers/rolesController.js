const Role = require("../models/rolesModel");

// exports.create = async (req, res) => {
//   try {
//     await Role.createRole(req.body);
//     res.json({ success: true, message: "Role created" });
//   } catch (err) {
//     console.error("Error in create:", err);
//     res.status(500).json({ error: err.message });
//   }
// };


exports.create = async (req, res) => {
  try {
    await Role.createRole(req.body);
    res.json({ success: true, message: "Role created" });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ error: "Role name already exists." });
    }
    console.error("Error in create:", err);
    res.status(500).json({ error: err.message });
  }
};


exports.getAll = async (req, res) => {
  try {
    const roles = await Role.getAllRoles();
    res.json(roles);
  } catch (err) {
    console.error("Error in getAll:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const role = await Role.getRoleById(req.params.id);
    if (!role) return res.status(404).json({ error: "Role not found" });
    res.json(role);
  } catch (err) {
    console.error("Error in getById:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    await Role.updateRole(req.params.id, req.body);
    res.json({ success: true, message: "Role updated" });
  } catch (err) {
    console.error("Error in update:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    await Role.deleteRole(req.params.id);
    res.json({ success: true, message: "Role deleted" });
  } catch (err) {
    console.error("Error in remove:", err);
    res.status(500).json({ error: err.message });
  }
};
