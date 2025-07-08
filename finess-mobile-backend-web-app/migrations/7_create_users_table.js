exports.up = function (knex) {
  return knex.schema.createTable("users1", (table) => {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.string("email").notNullable().unique();
    table.string("mobile").notNullable();
    table.string("password").notNullable();
    table.enu("status", ["active", "inactive"]).defaultTo("active");
    // Audit fields
    table.string("created_by").defaultTo("admin"); // Who created
    table.timestamp("created_on").defaultTo(knex.fn.now()); // When created
    table.string("updated_by").defaultTo("admin"); // Who updated
    table.timestamp("updated_on").defaultTo(knex.fn.now()); // When updated
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("users1");
};
