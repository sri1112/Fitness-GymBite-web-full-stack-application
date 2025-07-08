const Item = require('../models/itemsModel');

exports.getAll = async (req, res) => {
  try {
    let items = await Item.getAll();

    const baseUrl = `${req.protocol}://${req.get('host')}/uploads/`;

    items = items.map((item) => {
      if (item.image) {
        item.image = baseUrl + item.image;
      }
      try {
        item.nutrients = JSON.parse(item.nutrients);
      } catch {
        item.nutrients = [];
      }
      return item;
    });

    res.json(items);
  } catch (err) {
    console.error('Error in getAll:', err);
    res.status(500).json({ error: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    let item = await Item.getById(req.params.id);
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }

    const baseUrl = `${req.protocol}://${req.get('host')}/uploads/`;
    if (item.image) {
      item.image = baseUrl + item.image;
    }
    try {
      item.nutrients = JSON.parse(item.nutrients);
    } catch {
      item.nutrients = [];
    }

    res.json(item);
  } catch (err) {
    console.error('Error in getById:', err);
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const nutrients = JSON.parse(req.body.nutrients || '[]');

    const itemData = {
      name: req.body.name,
      quantityType: req.body.quantityType,
      quantity: req.body.quantity,
      type: req.body.type,
      description: req.body.description,
      costPrice: req.body.costPrice,
      sellingPrice: req.body.sellingPrice,
      image: req.file ? req.file.filename : null,
      createdBy: 'admin',
      updatedBy: 'admin'
    };

    const itemId = await Item.create(itemData, nutrients);

    res.json({ success: true, itemId });
  } catch (err) {
    console.error('Error in create:', err);
    res.status(500).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const data = JSON.parse(req.body.data);
    const nutrients = data.nutrients || [];
    delete data.nutrients;

    if (req.file) {
      data.image = req.file.filename;
    }
    data.updatedBy = 'admin';

    await Item.update(req.params.id, data, nutrients);

    res.json({ success: true });
  } catch (err) {
    console.error('Error in update:', err);
    res.status(500).json({ error: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    await Item.remove(req.params.id);
    res.json({ success: true });
  } catch (err) {
    console.error('Error in remove:', err);
    res.status(500).json({ error: err.message });
  }
};
