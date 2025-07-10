const express = require('express');
const router = express.Router();
const gymsController = require('../controllers/gymsController');

router.get('/', gymsController.getAll);
router.get('/:id', gymsController.getById);
router.post('/', gymsController.create);
router.put('/:id', gymsController.update);
router.delete('/:id', gymsController.delete);

module.exports = router;
