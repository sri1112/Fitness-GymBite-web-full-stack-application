exports.up = function(knex) {
  return knex.schema.createTable('item_nutrient_mapping', (table) => {
    table.increments('id').primary();
    table.integer('item_id').unsigned().references('id').inTable('items').onDelete('CASCADE');
    table.integer('nutrient_id').unsigned().references('id').inTable('nutrientss').onDelete('CASCADE');
    table.decimal('value', 10, 2).notNullable();

    table.string('created_by').defaultTo('admin');
    table.timestamp('created_on').defaultTo(knex.fn.now());
    table.string('updated_by').defaultTo('admin');
    table.timestamp('updated_on').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('item_nutrient_mapping');
};
