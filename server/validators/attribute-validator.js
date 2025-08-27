const { body, param } = require("express-validator");
const mongoose = require("mongoose");

exports.validateCreateAttribute = [
  body("name")
    .notEmpty()
    .withMessage("Attribute name is required")
    .isString()
    .withMessage("Attribute name must be a string")
    .trim(),

  body("variations")
    .isArray()
    .withMessage("Variations must be a non-empty array"),

  body("variations.*")
    .notEmpty()
    .withMessage("Each variation is required")
    .isString()
    .withMessage("Each variation must be a string")
    .trim(),
];

exports.validateUpdateAttribute = [
  param("id")
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage("Invalid attribute ID"),

  body("name")
    .optional()
    .isString()
    .withMessage("Attribute name must be a string")
    .trim(),

  body("variations")
    .optional()
    .isArray({ min: 1 })
    .withMessage("Variations must be a non-empty array"),

  body("variations.*")
    .optional()
    .isString()
    .withMessage("Each variation must be a string")
    .trim(),
];

exports.validateIdParam = [
  param("id").isMongoId().withMessage("Invalid attribute ID"),
];
