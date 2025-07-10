const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users1Controller');

router.get('/', usersController.getAll);
router.get('/:id', usersController.getById);
router.post('/', usersController.create);
router.put('/:id', usersController.update);
router.delete('/:id', usersController.remove);
router.get('/with-mappings', usersController.getAllWithMappings);

module.exports = router;
