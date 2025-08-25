const { body, param } = require("express-validator");

exports.validateCreateUserRole = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Role name is required")
    .isLength({ min: 2, max: 50 })
    .withMessage("Role name must be between 2 and 50 characters"),
];

exports.validateUpdateUserRole = [
  body("name")
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("Role name must be between 2 and 50 characters"),
];

exports.validateIdParam = [
  param("id").isMongoId().withMessage("Invalid role ID"),
];
