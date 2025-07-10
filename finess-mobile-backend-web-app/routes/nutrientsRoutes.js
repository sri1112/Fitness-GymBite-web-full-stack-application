const express = require("express");
const router = express.Router();
const nutrientsController = require("../controllers/nutrientsController");

router.get("/", nutrientsController.getAll);
router.get("/:id", nutrientsController.getById);
router.post("/", nutrientsController.create);
router.put("/:id", nutrientsController.update);
router.delete("/:id", nutrientsController.delete);

module.exports = router;
