const knex = require("../config/knex");

exports.createUser = (userData) => {
  return knex('users1').insert({
    ...userData,
    created_on: knex.fn.now(),
    updated_on: knex.fn.now()
  });
};

exports.getAllUsers = () => {
  return knex('users1').select('*');
};

exports.getUserById = (id) => {
  return knex('users1').where({ id }).first();
};

exports.updateUser = (id, userData) => {
  return knex('users1')
    .where({ id })
    .update({
      ...userData,
      updated_on: knex.fn.now()
    });
};

exports.deleteUser = (id) => {
  return knex('users1').where({ id }).del();
};
// const knex = require("../config/knex");

// existing exports...

exports.getUsersWithMappings = async () => {
  // 1. Get all users
  const users = await knex("users1").select("*");

  // 2. Get gym mappings
  const gymMappings = await knex("gym_user_mapping")
    .join("gyms", "gym_user_mapping.gym_id", "gyms.id")
    .select(
      "gym_user_mapping.user_id",
      "gyms.id as gym_id",
      "gyms.gym_name"
    );

  // 3. Get role mappings
  const roleMappings = await knex("user_roles_mapping")
    .join("roles", "user_roles_mapping.role_id", "roles.id")
    .select(
      "user_roles_mapping.user_id",
      "roles.id as role_id",
      "roles.role_name"
    );

  // 4. Merge into user objects
  return users.map((user) => ({
    ...user,
    gyms: gymMappings
      .filter((g) => g.user_id === user.id)
      .map((g) => ({
        id: g.gym_id,
        gym_name: g.gym_name
      })),
    roles: roleMappings
      .filter((r) => r.user_id === user.id)
      .map((r) => ({
        id: r.role_id,
        role_name: r.role_name
      }))
  }));
};
