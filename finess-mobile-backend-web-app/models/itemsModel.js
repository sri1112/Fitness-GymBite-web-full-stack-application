const db = require('../config/knex');

exports.getAll = () => {
  return db('items as i')
    .leftJoin('item_nutrient_mapping as m', 'i.id', 'm.item_id')
    .leftJoin('nutrientss as n', 'm.nutrient_id', 'n.id')
    .select(
      'i.*',
      db.raw(`
        JSON_ARRAYAGG(
          JSON_OBJECT(
            'id', n.id,
            'nutrient_name', n.name,
            'value', m.value,
            'unit', n.unit
          )
        ) as nutrients
      `)
    )
    .groupBy('i.id');
};

exports.getById = (id) => {
  return db('items as i')
    .leftJoin('item_nutrient_mapping as m', 'i.id', 'm.item_id')
    .leftJoin('nutrientss as n', 'm.nutrient_id', 'n.id')
    .select(
      'i.*',
      db.raw(`
        JSON_ARRAYAGG(
          JSON_OBJECT(
            'id', n.id,
            'nutrient_name', n.name,
            'value', m.value,
            'unit', n.unit
          )
        ) as nutrients
      `)
    )
    .where('i.id', id)
    .groupBy('i.id')
    .first();
};

exports.create = async (itemData, nutrients = []) => {
  return await db.transaction(async (trx) => {
    const [itemId] = await trx('items').insert(itemData);

    if (nutrients.length) {
      for (const nutrient of nutrients) {
        let nutrientId;

        // Check if nutrient exists in nutrientss table
        const existing = await trx('nutrientss')
          .where('name', nutrient.nutrient_name)
          .first();

        if (existing) {
          nutrientId = existing.id;
        } else {
          [nutrientId] = await trx('nutrientss').insert({
            name: nutrient.nutrient_name,
            unit: nutrient.unit || 'g',
          });
        }

        await trx('item_nutrient_mapping').insert({
          item_id: itemId,
          nutrient_id: nutrientId,
          value: nutrient.value,
        });
      }
    }

    return itemId;
  });
};

exports.update = async (id, itemData, nutrients = []) => {
  return await db.transaction(async (trx) => {
    await trx('items').where({ id }).update(itemData);
    await trx('item_nutrient_mapping').where({ item_id: id }).del();

    for (const nutrient of nutrients) {
      let nutrientId;

      const existing = await trx('nutrientss')
        .where('name', nutrient.nutrient_name)
        .first();

      if (existing) {
        nutrientId = existing.id;
      } else {
        [nutrientId] = await trx('nutrientss').insert({
          name: nutrient.nutrient_name,
          unit: nutrient.unit || 'g',
        });
      }

      await trx('item_nutrient_mapping').insert({
        item_id: id,
        nutrient_id: nutrientId,
        value: nutrient.value,
      });
    }
  });
};

exports.remove = (id) => {
  return db('items').where({ id }).del();
};
