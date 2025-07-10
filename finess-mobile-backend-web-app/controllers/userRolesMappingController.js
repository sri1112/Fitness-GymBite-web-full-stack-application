// const knex = require("../config/knex");

// exports.createMapping = ({ user_id, role_id, created_by = "admin", updated_by = "admin" }) => {
//   return knex('user_roles_mapping').insert({
//     user_id,
//     role_id,
//     created_by,
//     created_on: knex.fn.now(),
//     updated_by,
//     updated_on: knex.fn.now()
//   });
// };

// exports.getAllMappings = () => {
//   return knex('user_roles_mapping as urm')
//     .join('users1 as u', 'urm.user_id', 'u.id')
//     .join('roles as r', 'urm.role_id', 'r.id')
//     .select(
//       'urm.id',
//       'u.id as user_id',
//       'u.user_name',
//       'r.id as role_id',
//       'r.role_name',
//       'urm.created_on',
//       'urm.updated_on'
//     );
// };

// exports.getMappingById = (id) => {
//   return knex('user_roles_mapping')
//     .where({ id })
//     .first();
// };

// exports.updateMapping = (id, mappingData) => {
//   return knex('user_roles_mapping')
//     .where({ id })
//     .update({
//       ...mappingData,
//       updated_on: knex.fn.now()
//     });
// };

// exports.deleteMapping = (id) => {
//   return knex('user_roles_mapping').where({ id }).del();
// };
// controllers/userRolesMappingController.js
const UserRoleMapping = require("../models/userRolesMappingModel");

exports.assign = async (req, res) => {
  try {
    await UserRoleMapping.createMapping(req.body);
    res.json({ success: true, message: "Role assigned to user" });
  } catch (err) {
    console.error("Error in assign:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    const mappings = await UserRoleMapping.getAllMappings();
    res.json(mappings);
  } catch (err) {
    console.error("Error in getAll:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const mapping = await UserRoleMapping.getMappingById(req.params.id);
    if (!mapping) return res.status(404).json({ error: "Mapping not found" });
    res.json(mapping);
  } catch (err) {
    console.error("Error in getById:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    await UserRoleMapping.updateMapping(req.params.id, req.body);
    res.json({ success: true, message: "Mapping updated" });
  } catch (err) {
    console.error("Error in update:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    await UserRoleMapping.deleteMapping(req.params.id);
    res.json({ success: true, message: "Mapping deleted" });
  } catch (err) {
    console.error("Error in remove:", err);
    res.status(500).json({ error: err.message });
  }
};
