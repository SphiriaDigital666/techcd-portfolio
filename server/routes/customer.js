const express = require("express");
const router = express.Router();
const customerController = require("../controllers/customer");
const {
  validateCreateCustomer,
  validateUpdateCustomer,
  validateIdParam,
} = require("../validators/customer-validator");
const { runValidation } = require("../middleware/validate");

router.post(
  "/",
  validateCreateCustomer,
  runValidation,
  customerController.createCustomer
);

router.get("/", customerController.getCustomers);

router.get(
  "/:id",
  validateIdParam,
  runValidation,
  customerController.getCustomerById
);

router.patch(
  "/:id",
  validateIdParam,
  validateUpdateCustomer,
  runValidation,
  customerController.updateCustomer
);

router.delete(
  "/:id",
  validateIdParam,
  runValidation,
  customerController.deleteCustomer
);

module.exports = router;
