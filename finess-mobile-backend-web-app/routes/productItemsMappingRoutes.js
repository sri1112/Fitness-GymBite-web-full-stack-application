const express = require('express');
const router = express.Router();
const productItemsMappingController = require('../controllers/productItemsMappingController');

router.get('/', productItemsMappingController.getAll);
router.get('/:id', productItemsMappingController.getById);
router.post('/', productItemsMappingController.add);
router.put('/:id', productItemsMappingController.update);
router.delete('/:id', productItemsMappingController.remove);

module.exports = router;
