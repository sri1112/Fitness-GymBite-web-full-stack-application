// // routes/userRolesMappingRoutes.js
const express = require('express');
const router = express.Router();
const userRolesMappingController = require('../controllers/userRolesMappingController');

router.get('/', userRolesMappingController.getAll);
router.get('/:id', userRolesMappingController.getById);
router.post('/', userRolesMappingController.assign);
router.put('/:id', userRolesMappingController.update);
router.delete('/:id', userRolesMappingController.remove);

module.exports = router;
