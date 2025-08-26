const express = require("express");
const router = express.Router();
const attributeController = require("../controllers/attribute");
const {
  validateCreateAttribute,
  validateUpdateAttribute,
  validateIdParam,
} = require("../validators/attribute-validator");
const { runValidation } = require("../middleware/validate");

router.post(
  "/",
  validateCreateAttribute,
  runValidation,
  attributeController.createAttribute
);

router.get("/", attributeController.getAttributes);

router.get(
  "/:id",
  validateIdParam,
  runValidation,
  attributeController.getAttributeById
);

router.patch(
  "/:id",
  validateIdParam,
  validateUpdateAttribute,
  runValidation,
  attributeController.updateAttribute
);

router.delete(
  "/:id",
  validateIdParam,
  runValidation,
  attributeController.deleteAttribute
);

module.exports = router;
