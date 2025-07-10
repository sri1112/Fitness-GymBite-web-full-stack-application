const productItemsModel = require('../models/productItemsModel');

async function addProductItems(req, res) {
  const { productId, items } = req.body;
  const userId = req.user?.id || 1;  // Replace with real auth user ID

  if (!productId || !Array.isArray(items)) {
    return res.status(400).json({ error: 'Invalid payload' });
  }

  try {
    await productItemsModel.deleteMappings(productId); // clear old mappings
    await productItemsModel.addMappings(productId, items, userId);
    res.json({ message: 'Product items updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
}

async function getProductItems(req, res) {
  const { productId } = req.params;
  try {
    const mappings = await productItemsModel.getMappings(productId);
    res.json(mappings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
}

module.exports = {
  addProductItems,
  getProductItems
};
