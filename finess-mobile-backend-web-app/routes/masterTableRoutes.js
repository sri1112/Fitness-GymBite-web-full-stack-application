const express = require('express');
const router = express.Router();
const masterTableController = require('../controllers/masterTableController');

// CRUD routes
router.get('/', masterTableController.getAll);
router.get('/:id', masterTableController.getById);
router.post('/', masterTableController.create);
router.put('/:id', masterTableController.update);
router.delete('/:id', masterTableController.delete);

module.exports = router;
