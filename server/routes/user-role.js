const express = require("express");
const router = express.Router();
const userRoleController = require("../controllers/user-role");
const {
  validateCreateUserRole,
  validateUpdateUserRole,
  validateIdParam,
} = require("../validators/user-role-validator");
const { runValidation } = require("../middleware/validate");

router.post(
  "/",
  validateCreateUserRole,
  runValidation,
  userRoleController.createUserRole
);

router.get("/", userRoleController.getUserRoles);

router.get(
  "/:id",
  validateIdParam,
  runValidation,
  userRoleController.getUserRoleById
);

router.patch(
  "/:id",
  validateIdParam,
  validateUpdateUserRole,
  runValidation,
  userRoleController.updateUserRole
);

router.delete(
  "/:id",
  validateIdParam,
  runValidation,
  userRoleController.deleteUserRole
);

module.exports = router;
