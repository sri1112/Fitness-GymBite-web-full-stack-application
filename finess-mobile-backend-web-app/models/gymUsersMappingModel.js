const knex = require("../config/knex");

exports.addMapping = (mappingData) => {
  return knex('gym_users_mapping').insert({
    ...mappingData,
    created_on: knex.fn.now(),
    updated_on: knex.fn.now()
  });
};

exports.getAllMappings = () => {
  return knex('gym_users_mapping').select('*');
};

exports.getMappingById = (id) => {
  return knex('gym_users_mapping').where({ id }).first();
};

exports.updateMapping = (id, mappingData) => {
  return knex('gym_users_mapping')
    .where({ id })
    .update({
      ...mappingData,
      updated_on: knex.fn.now()
    });
};

exports.deleteMapping = (id) => {
  return knex('gym_users_mapping').where({ id }).del();
};
