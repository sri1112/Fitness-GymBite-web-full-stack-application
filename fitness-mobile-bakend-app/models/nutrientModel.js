const db = require("../config/knex");

// Bulk insert nutrients
exports.bulkInsert = (records) => {
  return db('nutrients').insert(records);
};
