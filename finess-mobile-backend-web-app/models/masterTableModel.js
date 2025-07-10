const knex = require("../config/knex");

exports.createEntry = (data) => {
  return knex('master_table').insert({
    ...data,
    created_on: knex.fn.now(),
    updated_on: knex.fn.now()
  });
};

exports.getAllEntries = () => {
  return knex('master_table').select('*');
};

exports.getEntryById = (id) => {
  return knex('master_table').where({ id }).first();
};

exports.updateEntry = (id, data) => {
  return knex('master_table')
    .where({ id })
    .update({
      ...data,
      updated_on: knex.fn.now()
    });
};

exports.deleteEntry = (id) => {
  return knex('master_table').where({ id }).del();
};
