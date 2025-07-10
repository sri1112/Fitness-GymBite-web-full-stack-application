exports.up = function (knex) {
  return knex.schema.createTable("master_table", (table) => {
    table.increments("id").primary();
    table.string("key", 191).notNullable().unique();
    table.boolean("active").defaultTo(true);

    // Audit columns
    table.string("created_by").defaultTo("admin");
    table.timestamp("created_on").defaultTo(knex.fn.now());
    table.string("updated_by").defaultTo("admin");
    table.timestamp("updated_on").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("master_table");
};
