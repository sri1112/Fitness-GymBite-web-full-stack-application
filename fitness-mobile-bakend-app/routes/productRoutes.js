// const express = require("express");
// const router = express.Router();
// const productController = require("../controllers/productController");

// router.get("/", productController.getAllProducts);
// router.get("/:id", productController.getProduct);
// router.post("/", productController.createProduct);
// router.put("/:id", productController.updateProduct);
// router.delete("/:id", productController.deleteProduct);

// module.exports = router;
const express = require('express');
const multer = require('multer');
const path = require('path');
const controller = require('../controllers/productController');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});

const upload = multer({ storage });

// CRUD routes
router.get('/', controller.getAll);
router.get('/:id', controller.getOne);
router.post('/', upload.single('image'), controller.create);
router.put('/:id', upload.single('image'), controller.update);
router.delete('/:id', controller.remove);

module.exports = router;
