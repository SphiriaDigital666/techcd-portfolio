const { body, param } = require("express-validator");

exports.validateCreateCustomer = [
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

  body("shippingInfo.firstName")
    .notEmpty()
    .withMessage("Shipping first name is required")
    .isLength({ min: 2 })
    .withMessage("Shipping first name must be at least 2 characters"),

  body("shippingInfo.lastName")
    .notEmpty()
    .withMessage("Shipping last name is required")
    .isLength({ min: 2 })
    .withMessage("Shipping last name must be at least 2 characters"),

  body("shippingInfo.phoneNo")
    .notEmpty()
    .withMessage("Shipping phone number is required")
    .isMobilePhone()
    .withMessage("Invalid shipping phone number"),

  body("shippingInfo.email")
    .notEmpty()
    .withMessage("Shipping email is required")
    .isEmail()
    .withMessage("Invalid shipping email format"),

  body("shippingInfo.address")
    .notEmpty()
    .withMessage("Shipping address is required")
    .isLength({ min: 5 })
    .withMessage("Shipping address must be at least 5 characters"),

  body("shippingInfo.city")
    .notEmpty()
    .withMessage("Shipping city is required")
    .isLength({ min: 2 })
    .withMessage("Shipping city must be at least 2 characters"),

  body("shippingInfo.zipCode")
    .notEmpty()
    .withMessage("Shipping zip code is required")
    .isPostalCode("any")
    .withMessage("Invalid zip code format"),
];

exports.validateUpdateCustomer = [
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

  body("shippingInfo.firstName")
    .notEmpty()
    .withMessage("Shipping first name is required")
    .isLength({ min: 2 })
    .withMessage("Shipping first name must be at least 2 characters"),

  body("shippingInfo.lastName")
    .notEmpty()
    .withMessage("Shipping last name is required")
    .isLength({ min: 2 })
    .withMessage("Shipping last name must be at least 2 characters"),

  body("shippingInfo.phoneNo")
    .notEmpty()
    .withMessage("Shipping phone number is required")
    .isMobilePhone()
    .withMessage("Invalid shipping phone number"),

  body("shippingInfo.email")
    .notEmpty()
    .withMessage("Shipping email is required")
    .isEmail()
    .withMessage("Invalid shipping email format"),

  body("shippingInfo.address")
    .notEmpty()
    .withMessage("Shipping address is required")
    .isLength({ min: 5 })
    .withMessage("Shipping address must be at least 5 characters"),

  body("shippingInfo.city")
    .notEmpty()
    .withMessage("Shipping city is required")
    .isLength({ min: 2 })
    .withMessage("Shipping city must be at least 2 characters"),

  body("shippingInfo.zipCode")
    .notEmpty()
    .withMessage("Shipping zip code is required")
    .isPostalCode("any")
    .withMessage("Invalid zip code format"),
];

exports.validateIdParam = [
  param("id").isMongoId().withMessage("Invalid customer ID"),
];
