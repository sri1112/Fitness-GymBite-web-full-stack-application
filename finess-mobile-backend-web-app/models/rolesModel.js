const knex = require("../config/knex");

exports.createRole = (roleData) => {
  return knex('roles').insert({
    role_name: roleData.role_name,
    created_on: knex.fn.now(),
    updated_on: knex.fn.now()
  });
};

exports.getAllRoles = () => {
  return knex('roles').select('*');
};

exports.getRoleById = (id) => {
  return knex('roles').where({ id }).first();
};

exports.updateRole = (id, roleData) => {
  return knex('roles')
    .where({ id })
    .update({
      role_name: roleData.role_name,
      updated_on: knex.fn.now()
    });
};

exports.deleteRole = (id) => {
  return knex('roles').where({ id }).del();
};
