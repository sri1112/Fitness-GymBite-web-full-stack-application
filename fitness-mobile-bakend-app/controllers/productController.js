// const Product = require("../models/productModel");

// exports.getAllProducts = async (req, res) => {
//   try {
//     const products = await Product.getAll();
//     res.json(products);
//   } catch (err) {
//     res.status(500).json({ message: "Server error" });
//   }
// };

// exports.getProduct = async (req, res) => {
//   try {
//     const product = await Product.getById(req.params.id);
//     if (!product) return res.status(404).json({ message: "Not found" });
//     res.json(product);
//   } catch (err) {
//     res.status(500).json({ message: "Server error" });
//   }
// };

// exports.createProduct = async (req, res) => {
//   try {
//     const id = await Product.create(req.body);
//     res.status(201).json({ id });
//   } catch (err) {
//     res.status(500).json({ message: "Server error" });
//   }
// };

// exports.updateProduct = async (req, res) => {
//   try {
//     await Product.update(req.params.id, req.body);
//     res.json({ message: "Updated" });
//   } catch (err) {
//     res.status(500).json({ message: "Server error" });
//   }
// };

// exports.deleteProduct = async (req, res) => {
//   try {
//     await Product.remove(req.params.id);
//     res.json({ message: "Deleted" });
//   } catch (err) {
//     res.status(500).json({ message: "Server error" });
//   }
// };
// const Product = require("../models/productModel");

// exports.getAllProducts = async (req, res) => {
//   try {
//     const products = await Product.getAll();
//     res.json(products);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// exports.getProduct = async (req, res) => {
//   try {
//     const product = await Product.getById(req.params.id);
//     if (!product) return res.status(404).json({ message: "Not found" });
//     res.json(product);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// exports.createProduct = async (req, res) => {
//   try {
//     const { name, price, quantity, brand, image, label, type, description, created_by } = req.body;

//     const [id] = await Product.create({
//       name,
//       price,
//       quantity,
//       brand,
//       image,
//       label,
//       type,
//       description,
//       created_by,
//       updated_by: created_by
//     });

//     res.status(201).json({ id });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// exports.updateProduct = async (req, res) => {
//   try {
//     const { name, price, quantity, brand, image, label, type, description, updated_by } = req.body;

//     await Product.update(req.params.id, {
//       name,
//       price,
//       quantity,
//       brand,
//       image,
//       label,
//       type,
//       description,
//       updated_by
//     });

//     res.json({ message: "Updated" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// };


// exports.deleteProduct = async (req, res) => {
//   try {
//     await Product.remove(req.params.id);
//     res.json({ message: "Deleted" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// };
const Product = require("../models/productModel");

/**
 * Get all products
 */
exports.getAll = async (req, res) => {
  try {
    const products = await Product.getAll();
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

/**
 * Get single product
 */
exports.getOne = async (req, res) => {
  try {
    const product = await Product.getById(req.params.id);
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

/**
 * Create new product with nutrients
 */
// exports.create = async (req, res) => {
//   try {
//     const data = JSON.parse(req.body.data);

//     // Handle uploaded image
//     if (req.file) {
//       data.image = req.file.filename;
//     }

//     // Audit fields
//     data.createdBy = 'admin';
//     data.updatedBy = 'admin';

//     // Separate nutrients
//     const nutrients = data.nutrients || [];
//     delete data.nutrients;

//     await Product.create(data, nutrients);
//     res.json({ success: true });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: err.message });
//   }
// };
// Create product with nutrients
// const Product = require("../models/productModel");
const Nutrient = require("../models/nutrientModel");
// const Product = require("../models/productModel");

/**
 * Get all products
 */
// exports.getAll = async (req, res) => {
//   try {
//     const products = await Product.getAll();
//     res.json(products);
//   } catch (err) {
//     console.error('Error fetching products:', err);
//     res.status(500).json({ error: err.message });
//   }
// };

exports.getAll = async (req, res) => {
  try {
    let products = await Product.getAll();

    // Add base URL for image
    const baseUrl = `${req.protocol}://${req.get('host')}/uploads/`;

    // Post-process each product
    products = products.map((p) => {
      // Add full image URL
      if (p.image) {
        p.image = baseUrl + p.image;
      }

      // Parse nutrients JSON
      try {
        p.nutrients = JSON.parse(p.nutrients);
      } catch {
        p.nutrients = [];
      }

      return p;
    });

    res.json(products);
  } catch (err) {
    console.error('Error in getAll:', err);
    res.status(500).json({ error: err.message });
  }
};


/**
 * Get single product by ID
 */
// exports.getOne = async (req, res) => {
//   try {
//     const product = await Product.getById(req.params.id);
//     res.json(product);
//   } catch (err) {
//     console.error('Error fetching product:', err);
//     res.status(500).json({ error: err.message });
//   }
// };
exports.getById = async (req, res) => {
  try {
    let product = await Product.getById(req.params.id);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const baseUrl = `${req.protocol}://${req.get('host')}/uploads/`;

    if (product.image) {
      product.image = baseUrl + product.image;
    }

    try {
      product.nutrients = JSON.parse(product.nutrients);
    } catch {
      product.nutrients = [];
    }

    res.json(product);
  } catch (err) {
    console.error('Error in getById:', err);
    res.status(500).json({ error: err.message });
  }
};

/**
 * Create new product with optional nutrients
 */
exports.create = async (req, res) => {
  try {
    // Build the product object from request body
    const productData = {
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

    // Insert product and get new ID
    const productId = await Product.create(productData);

    // Defensive nutrients parsing
    let nutrients = [];
    if (req.body.nutrients) {
      if (typeof req.body.nutrients === 'string') {
        nutrients = JSON.parse(req.body.nutrients);
      } else if (Array.isArray(req.body.nutrients)) {
        nutrients = req.body.nutrients;
      }
    }

    // Insert nutrients if any
    if (nutrients.length > 0) {
      const nutrientRecords = nutrients.map(n => ({
        product_id: productId,
        nutrient_name: n.nutrient_name,
        value: n.value,
        unit: n.unit || 'g',
        created_by: 'admin',
        updated_by: 'admin'
      }));

      await Nutrient.bulkInsert(nutrientRecords);
    }

    res.json({ success: true, productId });

  } catch (err) {
    console.error('Error creating product:', err);
    res.status(500).json({ error: err.message });
  }
};

/**
 * Update product with optional nutrients
 */
exports.update = async (req, res) => {
  try {
    // Expect JSON string in 'data' field (form-data)
    const data = JSON.parse(req.body.data);

    if (req.file) {
      data.image = req.file.filename;
    }

    // Audit fields
    data.updatedBy = 'admin';
    data.updatedOn = new Date();

    const nutrients = data.nutrients || [];
    delete data.nutrients;

    await Product.update(req.params.id, data, nutrients);

    res.json({ success: true });
  } catch (err) {
    console.error('Error updating product:', err);
    res.status(500).json({ error: err.message });
  }
};

/**
 * Delete product by ID
 */
exports.remove = async (req, res) => {
  try {
    await Product.remove(req.params.id);
    res.json({ success: true });
  } catch (err) {
    console.error('Error deleting product:', err);
    res.status(500).json({ error: err.message });
  }
};

