exports.up = function(knex) {
  return knex.schema.createTable('product_items_mapping', (table) => {
    table.increments('id').primary();
    table.integer('product_id').unsigned().notNullable()
         .references('id').inTable('products')
         .onDelete('CASCADE');
    table.integer('item_id').unsigned().notNullable()
         .references('id').inTable('items')
         .onDelete('CASCADE');
    table.decimal('quantity', 10, 2).defaultTo(1);
    table.integer('created_by').unsigned();
    table.timestamp('created_on').defaultTo(knex.fn.now());
    table.integer('updated_by').unsigned();
    table.timestamp('updated_on').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('product_items_mapping');
};
