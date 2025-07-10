const express = require('express');
const router = express.Router();
const gymUsersMappingController = require('../controllers/gymUsersMappingController');

router.get('/', gymUsersMappingController.getAll);
router.get('/:id', gymUsersMappingController.getById);
router.post('/', gymUsersMappingController.add);
router.put('/:id', gymUsersMappingController.update);
router.delete('/:id', gymUsersMappingController.remove);

module.exports = router;
