const db = require("../config/knex");

/**
 * Insert multiple nutrient mappings
 * @param {Array} mappings
 */
exports.bulkInsert = async (mappings) => {
  if (mappings.length) {
    await db("item_nutrient_mapping").insert(mappings);
  }
};

/**
 * Delete all mappings for a given item
 * @param {Number} itemId
 */
exports.deleteByItemId = async (itemId) => {
  await db("item_nutrient_mapping").where({ item_id: itemId }).del();
};

/**
 * Get all nutrient mappings for an item (joined with nutrients master)
 * @param {Number} itemId
 */
exports.getByItemId = (itemId) => {
  return db("item_nutrient_mapping as m")
    .join("nutrients as n", "m.nutrient_id", "n.id")
    .select(
      "m.id",
      "m.value",
      "m.unit",
      "n.id as nutrient_id",
      "n.nutrient_name"
    )
    .where("m.item_id", itemId);
};
