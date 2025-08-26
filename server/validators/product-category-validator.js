const { body, param } = require("express-validator");

exports.validateCreateProductCategory = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Category name is required")
    .isLength({ min: 2, max: 50 })
    .withMessage("Category name must be between 2 and 50 characters"),
];

exports.validateUpdateProductCategory = [
  body("name")
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("Category name must be between 2 and 50 characters"),
];

exports.validateIdParam = [
  param("id").isMongoId().withMessage("Invalid category ID"),
];
