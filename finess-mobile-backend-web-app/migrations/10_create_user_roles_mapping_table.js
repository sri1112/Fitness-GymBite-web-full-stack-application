exports.up = function (knex) {
  return knex.schema.createTable("user_roles_mapping", (table) => {
    table.increments("id").primary();
    table
      .integer("user_id")
      .unsigned()
      .references("id")
      .inTable("users1")
      .onDelete("CASCADE");
    table
      .integer("role_id")
      .unsigned()
      .references("id")
      .inTable("roles")
      .onDelete("CASCADE");
    // Audit fields
    table.string("created_by").defaultTo("admin"); // Who created
    table.timestamp("created_on").defaultTo(knex.fn.now()); // When created
    table.string("updated_by").defaultTo("admin"); // Who updated
    table.timestamp("updated_on").defaultTo(knex.fn.now()); // When updated
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("user_roles_mapping");
};
