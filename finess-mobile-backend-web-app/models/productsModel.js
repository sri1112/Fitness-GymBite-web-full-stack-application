const knex = require("../config/knex");

exports.createProduct = (productData) => {
  return knex('products').insert({
    ...productData,
    created_on: knex.fn.now(),
    updated_on: knex.fn.now()
  });
};

exports.getAllProducts = () => {
  return knex('products').select('*');
};

exports.getProductById = (id) => {
  return knex('products').where({ id }).first();
};

exports.updateProduct = (id, productData) => {
  return knex('products')
    .where({ id })
    .update({
      ...productData,
      updated_on: knex.fn.now()
    });
};

exports.deleteProduct = (id) => {
  return knex('products').where({ id }).del();
};
