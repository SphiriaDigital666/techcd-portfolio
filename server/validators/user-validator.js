const { body, param, query } = require("express-validator");

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
    .withMessage("Password must be at least 8 characters")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter")
    .matches(/[a-z]/)
    .withMessage("Password must contain at least one lowercase letter")
    .matches(/[0-9]/)
    .withMessage("Password must contain at least one number")
    .matches(/[@$!%*?&#^()_\-+=]/)
    .withMessage("Password must contain at least one special character"),

  body("role")
    .notEmpty()
    .withMessage("Role is required")
    .isMongoId()
    .withMessage("Invalid role ID"),
];

exports.validateUpdateUser = [
  query("field")
    .notEmpty()
    .withMessage("Field parameter is required")
    .isIn(["profile", "email", "username", "password", "phoneNo"])
    .withMessage(
      "Field must be either profile, email, username, password or phoneNo"
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
    .if((value, { req }) => req.query.field !== "profile")
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

  body("role")
    .if((value, { req }) => req.query.field === "profile")
    .notEmpty()
    .withMessage("Role is required")
    .isMongoId()
    .withMessage("Invalid role ID"),
];

exports.validateIdParam = [
  param("id").isMongoId().withMessage("Invalid user ID"),
];
