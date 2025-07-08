exports.up = function (knex) {
  return knex.schema
    .dropTableIfExists("users")
    .createTable("users", function (table) {
      table.increments("id").primary();
      table.string("email", 191).notNullable().unique();
      table.string("password", 255).notNullable();
      table.enu("userType", ["Admin", "Super Admin"]).notNullable();
      table.string("created_by").defaultTo("admin");
      table.timestamp("created_on").defaultTo(knex.fn.now());
      table.string("updated_by").defaultTo("admin");
      table.timestamp("updated_on").defaultTo(knex.fn.now());
    });
};

// exports.down = function (knex) {
//   return knex.schema.dropTableIfExists("users");
// };
exports.down = (knex) => knex.schema.dropTable("users");
