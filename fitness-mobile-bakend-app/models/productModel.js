// const db = require("../config/db");

// exports.getAll = async () => {
//   const [rows] = await db.query("SELECT * FROM products");
//   return rows;
// };

// exports.getById = async (id) => {
//   const [rows] = await db.query("SELECT * FROM products WHERE id = ?", [id]);
//   return rows[0];
// };

// exports.create = async (product) => {
//   const { name, price, quantity, brand, image, label, type, description } = product;
//   const [result] = await db.query(
//     `INSERT INTO products (name, price, quantity, brand, image, label, type, description)
//      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
//     [name, price, quantity, brand, image, label, type, description]
//   );
//   return result.insertId;
// };

// exports.update = async (id, product) => {
//   const { name, price, quantity, brand, image, label, type, description } = product;
//   await db.query(
//     `UPDATE products SET name = ?, price = ?, quantity = ?, brand = ?, image = ?, label = ?, type = ?, description = ? WHERE id = ?`,
//     [name, price, quantity, brand, image, label, type, description, id]
//   );
// };

// exports.remove = async (id) => {
//   await db.query("DELETE FROM products WHERE id = ?", [id]);
// };
// Import Knex DB connection
// Import Knex DB connection
const db = require("../config/knex");

/**
 * Get all products with their nutrients (joined).
 */
exports.getAll = () => {
  return db('products2 as p')
    .leftJoin('nutrients as n', 'p.id', 'n.product_id')
    .select(
      'p.*',
      db.raw(`
        JSON_ARRAYAGG(
          JSON_OBJECT(
            "id", n.id,
            "nutrient_name", n.nutrient_name,
            "value", n.value,
            "unit", n.unit
          )
        ) as nutrients
      `)
    )
    .groupBy('p.id');
};

/**
 * Get single product by ID with nutrients.
 */
exports.getById = (id) => {
  return db('products2 as p')
    .leftJoin('nutrients as n', 'p.id', 'n.product_id')
    .select(
      'p.*',
      db.raw(`
        JSON_ARRAYAGG(
          JSON_OBJECT(
            "id", n.id,
            "nutrient_name", n.nutrient_name,
            "value", n.value,
            "unit", n.unit
          )
        ) as nutrients
      `)
    )
    .where('p.id', id)
    .groupBy('p.id')
    .first();
};

/**
 * Create new product and nutrients inside a transaction.
 * Returns the new product ID.
 */
exports.create = async (product, nutrients = []) => {
  return await db.transaction(async (trx) => {
    // Insert product, returning the inserted ID
    const [insertId] = await trx('products2').insert(product);

    // If nutrients are provided, insert them with the product ID
    if (nutrients.length) {
      const nutrientsWithProductId = nutrients.map((n) => ({
        ...n,
        product_id: insertId,
        created_by: 'admin',
        updated_by: 'admin',
      }));
      await trx('nutrients').insert(nutrientsWithProductId);
    }

    return insertId;
  });
};

/**
 * Update product and replace nutrients in a transaction.
 */
exports.update = async (id, product, nutrients = []) => {
  return await db.transaction(async (trx) => {
    // Update product row
    await trx('products2').where({ id }).update(product);

    // Remove existing nutrients for this product
    await trx('nutrients').where({ product_id: id }).del();

    // Insert new nutrients if provided
    if (nutrients.length) {
      const nutrientsWithProductId = nutrients.map((n) => ({
        ...n,
        product_id: id,
        created_by: 'admin',
        updated_by: 'admin',
      }));
      await trx('nutrients').insert(nutrientsWithProductId);
    }
  });
};

/**
 * Delete product and cascade delete its nutrients.
 */
exports.remove = (id) => {
  return db('products2').where({ id }).del();
};
