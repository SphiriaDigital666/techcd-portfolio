const express = require("express");
const router = express.Router();
const productController = require("../controllers/product");
const {
  validateCreateProduct,
  validateUpdateProduct,
  validateIdParam,
} = require("../validators/product-validator");
const { runValidation } = require("../middleware/validate");

router.post(
  "/",
  validateCreateProduct,
  runValidation,
  productController.createProduct
);

router.get("/", productController.getProducts);

router.get(
  "/:id",
  validateIdParam,
  runValidation,
  productController.getProductById
);

router.patch(
  "/:id",
  validateIdParam,
  runValidation,
  productController.updateProduct
);

router.delete(
  "/:id",
  validateIdParam,
  runValidation,
  productController.deleteProduct
);

module.exports = router;
