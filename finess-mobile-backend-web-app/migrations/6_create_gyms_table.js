exports.up = function(knex) {
  return knex.schema.createTable('gyms', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('mobile');
    table.string('email');
    table.string('image');
    table.string('address');
    table.decimal('latitude', 10, 7);
    table.decimal('longitude', 10, 7);
      // Audit fields
    table.string('created_by').defaultTo('admin');            // Who created
    table.timestamp('created_on').defaultTo(knex.fn.now());   // When created
    table.string('updated_by').defaultTo('admin');            // Who updated
    table.timestamp('updated_on').defaultTo(knex.fn.now());   // When updated
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('gyms');
};
