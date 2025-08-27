const { body, param, query } = require("express-validator");

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
    .withMessage("Password must be at least 8 characters")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter")
    .matches(/[a-z]/)
    .withMessage("Password must contain at least one lowercase letter")
    .matches(/[0-9]/)
    .withMessage("Password must contain at least one number")
    .matches(/[@$!%*?&#^()_\-+=]/)
    .withMessage("Password must contain at least one special character"),

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

  body("shippingInfo.state")
    .notEmpty()
    .withMessage("Shipping state is required")
    .isLength({ min: 2 })
    .withMessage("Shipping state must be at least 2 characters"),

  body("shippingInfo.zipCode")
    .notEmpty()
    .withMessage("Shipping zip code is required")
    .isPostalCode("any")
    .withMessage("Invalid zip code format"),
];

exports.validateUpdateCustomer = [
  query("field")
    .notEmpty()
    .withMessage("Field parameter is required")
    .isIn(["profile", "email", "username", "password", "phoneNo", "address"])
    .withMessage(
      "Field must be either profile, email, username, password, phoneNo or address"
    ),

  body("firstName")
    .if((value, { req }) => req.query.field === "profile")
    .notEmpty()
    .withMessage("First name is required")
    .isLength({ min: 2 })
    .withMessage("First name must be at least 2 characters"),

  body("lastName")
    .if((value, { req }) => req.query.field === "profile")
    .notEmpty()
    .withMessage("Last name is required")
    .isLength({ min: 2 })
    .withMessage("Last name must be at least 2 characters"),

  body("username")
    .if((value, { req }) => req.query.field === "username")
    .notEmpty()
    .withMessage("Username is required")
    .isLength({ min: 3 })
    .withMessage("Username must be at least 3 characters"),

  body("email")
    .if((value, { req }) => req.query.field === "email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format"),

  body("phoneNo")
    .if((value, { req }) => req.query.field === "phoneNo")
    .notEmpty()
    .withMessage("Phone number is required")
    .isMobilePhone()
    .withMessage("Invalid phone number"),

  body("password")
    .if(
      (value, { req }) =>
        req.query.field !== "profile" && req.query.field !== "address"
    )
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter")
    .matches(/[a-z]/)
    .withMessage("Password must contain at least one lowercase letter")
    .matches(/[0-9]/)
    .withMessage("Password must contain at least one number")
    .matches(/[@$!%*?&#^()_\-+=]/)
    .withMessage("Password must contain at least one special character"),

  body("newPassword")
    .if((value, { req }) => req.query.field === "password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter")
    .matches(/[a-z]/)
    .withMessage("Password must contain at least one lowercase letter")
    .matches(/[0-9]/)
    .withMessage("Password must contain at least one number")
    .matches(/[@$!%*?&#^()_\-+=]/)
    .withMessage("Password must contain at least one special character"),

  body("shippingInfo.firstName")
    .if((value, { req }) => req.query.field === "address")
    .notEmpty()
    .withMessage("Shipping first name is required")
    .isLength({ min: 2 })
    .withMessage("Shipping first name must be at least 2 characters"),

  body("shippingInfo.lastName")
    .if((value, { req }) => req.query.field === "address")
    .notEmpty()
    .withMessage("Shipping last name is required")
    .isLength({ min: 2 })
    .withMessage("Shipping last name must be at least 2 characters"),

  body("shippingInfo.phoneNo")
    .if((value, { req }) => req.query.field === "address")
    .notEmpty()
    .withMessage("Shipping phone number is required")
    .isMobilePhone()
    .withMessage("Invalid shipping phone number"),

  body("shippingInfo.email")
    .if((value, { req }) => req.query.field === "address")
    .notEmpty()
    .withMessage("Shipping email is required")
    .isEmail()
    .withMessage("Invalid shipping email format"),

  body("shippingInfo.address")
    .if((value, { req }) => req.query.field === "address")
    .notEmpty()
    .withMessage("Shipping address is required")
    .isLength({ min: 5 })
    .withMessage("Shipping address must be at least 5 characters"),

  body("shippingInfo.city")
    .if((value, { req }) => req.query.field === "address")
    .notEmpty()
    .withMessage("Shipping city is required")
    .isLength({ min: 2 })
    .withMessage("Shipping city must be at least 2 characters"),

  body("shippingInfo.state")
    .if((value, { req }) => req.query.field === "address")
    .notEmpty()
    .withMessage("Shipping state is required")
    .isLength({ min: 2 })
    .withMessage("Shipping state must be at least 2 characters"),

  body("shippingInfo.zipCode")
    .if((value, { req }) => req.query.field === "address")
    .notEmpty()
    .withMessage("Shipping zip code is required")
    .isPostalCode("any")
    .withMessage("Invalid zip code format"),
];

exports.validateIdParam = [
  param("id").isMongoId().withMessage("Invalid customer ID"),
];
