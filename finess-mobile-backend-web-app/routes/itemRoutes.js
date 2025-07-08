const express = require('express');
const multer = require('multer');
const path = require('path');
const controller = require('../controllers/itemController');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});

const upload = multer({ storage });

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', upload.single('image'), controller.create);
router.put('/:id', upload.single('image'), controller.update);
router.delete('/:id', controller.remove);

module.exports = router;
