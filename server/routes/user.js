const express = require("express");
const router = express.Router();
const userRoleController = require("../controllers/user");
const {
  validateCreateUser,
  validateUpdateUser,
  validateIdParam,
} = require("../validators/user-validator");
const { runValidation } = require("../middleware/validate");

router.post(
  "/",
  validateCreateUser,
  runValidation,
  userRoleController.createUser
);

router.get("/", userRoleController.getUsers);

router.get(
  "/:id",
  validateIdParam,
  runValidation,
  userRoleController.getUserById
);

router.patch(
  "/:id",
  validateIdParam,
  validateUpdateUser,
  runValidation,
  userRoleController.updateUser
);

router.delete(
  "/:id",
  validateIdParam,
  runValidation,
  userRoleController.deleteUser
);

module.exports = router;
