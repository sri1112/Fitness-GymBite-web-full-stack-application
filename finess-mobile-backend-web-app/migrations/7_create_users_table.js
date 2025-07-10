exports.up = function (knex) {
  return knex.schema.createTable("users1", (table) => {
    table.increments("id").primary();

    table.string("name", 100).notNullable();
    table.string("email", 191).notNullable().unique();
    table.string("mobile", 15).notNullable();
    table.string("password", 255).notNullable();

    table.enu("status", ["active", "inactive"]).defaultTo("active");

    // Audit fields
    table.string("created_by").defaultTo("admin");
    table
      .timestamp("created_on")
      .defaultTo(knex.fn.now());

    table.string("updated_by").defaultTo("admin");
    table
      .timestamp("updated_on")
      .defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("users1");
};
