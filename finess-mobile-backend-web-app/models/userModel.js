const knex = require('../config/knex');

async function createUser({ email, password, userType }) {
  return await knex('users').insert({ email, password, userType });
}

async function findUserByEmail(email) {
  return knex('users').where({ email }).first();
}

module.exports = {
  createUser,
  findUserByEmail,
};
