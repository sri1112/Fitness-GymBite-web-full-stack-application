const knex = require("../config/knex");

exports.createNutrient = (data) => {
  return knex("nutrientss").insert({
    ...data,
    created_on: knex.fn.now(),
    updated_on: knex.fn.now(),
  });
};

exports.getAllNutrients = () => {
  return knex("nutrientss").select("*");
};

exports.getNutrientById = (id) => {
  return knex("nutrientss").where({ id }).first();
};

exports.updateNutrient = (id, data) => {
  return knex("nutrientss")
    .where({ id })
    .update({
      ...data,
      updated_on: knex.fn.now(),
    });
};

exports.deleteNutrient = (id) => {
  return knex("nutrientss").where({ id }).del();
};
