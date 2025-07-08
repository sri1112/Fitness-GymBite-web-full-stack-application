
exports.up = async function(knex) {
  // ----------------------------------------
  // 1️⃣ Create items table
  // ----------------------------------------
  await knex.schema.createTable('items', (table) => {
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
}

exports.down =  async function(knex) {
   await knex.schema.dropTableIfExists('items');   // Then drop items
};
