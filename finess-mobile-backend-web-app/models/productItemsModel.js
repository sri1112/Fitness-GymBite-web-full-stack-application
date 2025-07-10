const knex = require('../knex');

async function addMappings(productId, items, userId) {
  const insertData = items.map(i => ({
    product_id: productId,
    item_id: i.itemId,
    quantity: i.quantity,
    created_by: userId
  }));

  return knex('product_items_mapping').insert(insertData);
}

async function getMappings(productId) {
  return knex('product_items_mapping')
    .where('product_items_mapping.product_id', productId)
    .join('items', 'items.id', 'product_items_mapping.item_id')
    .select(
      'product_items_mapping.id as mappingId',
      'product_items_mapping.quantity',
      'items.id as itemId',
      'items.name',
      'items.quantityType',
      'items.quantity',
      'items.image'
    );
}

async function deleteMappings(productId) {
  return knex('product_items_mapping').where({ product_id: productId }).del();
}

module.exports = {
  addMappings,
  getMappings,
  deleteMappings
};
