/**
 * Migration: Create products and nutrients tables with audit columns.
 * 
 * We split nutrients into its own table with foreign key to products.
 */

exports.up = async function(knex) {
  // ----------------------------------------
  // 1️⃣ Create products table
  // ----------------------------------------
  await knex.schema.createTable('products2', (table) => {
    table.increments('id').primary();                         // Primary key
    table.string('name').notNullable();                       // Product name
    table.string('quantityType');                             // 'pieces' or 'grams'
    table.string('quantity');                                 // e.g. '1', '100g'
    table.string('image');                                    // Image filename or URL
    table.enum('type', ['veg', 'non-veg']).defaultTo('veg');  // Veg or Non-Veg
    table.text('description');                                // Detailed description
    table.decimal('costPrice', 10, 2);                        // Cost price
    table.decimal('sellingPrice', 10, 2);                     // Selling price

    // Audit fields
    table.string('createdBy').defaultTo('admin');             // Who created
    table.timestamp('createdOn').defaultTo(knex.fn.now());    // When created
    table.string('updatedBy').defaultTo('admin');             // Who updated
    table.timestamp('updatedOn').defaultTo(knex.fn.now());    // When updated
  });

  // ----------------------------------------
  // 2️⃣ Create nutrients table
  // ----------------------------------------
  await knex.schema.createTable('nutrients', (table) => {
    table.increments('id').primary();                         // Primary key

    // Foreign key to products table
    table.integer('product_id').unsigned()
         .references('id').inTable('products2')
         .onDelete('CASCADE');                                // Cascade delete

    table.string('nutrient_name').notNullable();              // e.g. 'Fat', 'Carbs'
    table.decimal('value', 10, 2).notNullable();              // Nutrient value
    table.string('unit').defaultTo('g');                      // Units, e.g. 'g', 'mg'

    // Audit fields
    table.string('created_by').defaultTo('admin');            // Who created
    table.timestamp('created_on').defaultTo(knex.fn.now());   // When created
    table.string('updated_by').defaultTo('admin');            // Who updated
    table.timestamp('updated_on').defaultTo(knex.fn.now());   // When updated
  });
};

/**
 * Rollback: Drop nutrients first (FK dependency), then products.
 */
exports.down = async function(knex) {
  await knex.schema.dropTableIfExists('nutrients');  // Drop nutrients table first
  await knex.schema.dropTableIfExists('products2');   // Then drop products
};
