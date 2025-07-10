exports.up = function (knex) {
  return knex.schema.createTable("roles", (table) => {
    table.increments("id").primary();
    table.string("role_name", 100).notNullable().unique(); // set length
    table.string("created_by").defaultTo("admin");
    table.timestamp("created_on").defaultTo(knex.fn.now());
    table.string("updated_by").defaultTo("admin");
    table.timestamp("updated_on").defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("roles");
};
