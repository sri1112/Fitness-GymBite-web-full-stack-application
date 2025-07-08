exports.up = function (knex) {
  return knex.schema.createTable("products", (table) => {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.enu("status", ["active", "inactive"]).defaultTo("active");
    table.decimal("price", 10, 2);
    table.decimal("selling_price", 10, 2);
    // Audit fields
    table.string("created_by").defaultTo("admin"); // Who created
    table.timestamp("created_on").defaultTo(knex.fn.now()); // When created
    table.string("updated_by").defaultTo("admin"); // Who updated
    table.timestamp("updated_on").defaultTo(knex.fn.now()); // When updated
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("products");
};
