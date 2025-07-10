const knex = require("../config/knex");

exports.createMapping = ({ user_id, role_id, created_by = "admin", updated_by = "admin" }) => {
  return knex('user_roles_mapping').insert({
    user_id,
    role_id,
    created_by,
    created_on: knex.fn.now(),
    updated_by,
    updated_on: knex.fn.now()
  });
};

exports.getAllMappings = () => {
  return knex('user_roles_mapping').select('*');
};

exports.getMappingById = (id) => {
  return knex('user_roles_mapping').where({ id }).first();
};

exports.updateMapping = (id, mappingData) => {
  return knex('user_roles_mapping')
    .where({ id })
    .update({
      ...mappingData,
      updated_on: knex.fn.now()
    });
};

exports.deleteMapping = (id) => {
  return knex('user_roles_mapping').where({ id }).del();
};
