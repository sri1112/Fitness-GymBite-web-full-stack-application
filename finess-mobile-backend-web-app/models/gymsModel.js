const knex = require("../config/knex");

// ✅ Create Gym
exports.createGym = async (gymData) => {
  return await knex('gyms').insert({
    ...gymData,
    created_on: knex.fn.now(),
    updated_on: knex.fn.now(),
  });
};

// ✅ Get All Gyms
exports.getAllGyms = () => {
  return knex('gyms').select('*');
};

// ✅ Get Gym by ID
exports.getGymById = (id) => {
  return knex('gyms').where({ id }).first();
};

// ✅ Update Gym
exports.updateGym = (id, gymData) => {
  return knex('gyms')
    .where({ id })
    .update({
      ...gymData,
      updated_on: knex.fn.now(),
    });
};

// ✅ Delete Gym
exports.deleteGym = (id) => {
  return knex('gyms').where({ id }).del();
};
