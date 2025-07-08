exports.up = function(knex) {
  return knex.schema.alterTable('users', function(table) {
    table.string('email', 191).notNullable().alter();
  });
};

exports.down = function(knex) {
  return knex.schema.alterTable('users', function(table) {
    table.string('email', 255).notNullable().alter();
  });
};
