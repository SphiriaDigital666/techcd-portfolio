const { body, param } = require("express-validator");

exports.validateCreateUser = [
  body("firstName")
    .notEmpty()
    .withMessage("First name is required")
    .isLength({ min: 2 })
    .withMessage("First name must be at least 2 characters"),

  body("lastName")
    .notEmpty()
    .withMessage("Last name is required")
    .isLength({ min: 2 })
    .withMessage("Last name must be at least 2 characters"),

  body("username")
    .notEmpty()
    .withMessage("Username is required")
    .isLength({ min: 3 })
    .withMessage("Username must be at least 3 characters"),

  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format"),

  body("phoneNo")
    .notEmpty()
    .withMessage("Phone number is required")
    .isMobilePhone()
    .withMessage("Invalid phone number"),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters"),

  body("role")
    .notEmpty()
    .withMessage("Role is required")
    .isMongoId()
    .withMessage("Invalid role ID"),
];

exports.validateUpdateUser = [
  body("firstName")
    .optional()
    .isLength({ min: 2 })
    .withMessage("First name must be at least 2 characters"),

  body("lastName")
    .optional()
    .isLength({ min: 2 })
    .withMessage("Last name must be at least 2 characters"),

  body("username")
    .optional()
    .isLength({ min: 3 })
    .withMessage("Username must be at least 3 characters"),

  body("email").optional().isEmail().withMessage("Invalid email format"),

  body("phoneNo")
    .optional()
    .isMobilePhone()
    .withMessage("Invalid phone number"),

  body("password")
    .optional()
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters"),

  body("role").optional().isMongoId().withMessage("Invalid role ID"),
];

exports.validateIdParam = [
  param("id").isMongoId().withMessage("Invalid user ID"),
];
