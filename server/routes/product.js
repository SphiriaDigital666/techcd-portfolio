const express = require("express");
const router = express.Router();
const multer = require("../middleware/multer");
const productController = require("../controllers/product");
const {
  validateCreateProduct,
  validateUpdateProduct,
  validateIdParam,
} = require("../validators/product-validator");
const parseJson = require("../middleware/parse-json");
const { runValidation } = require("../middleware/validate");

router.post(
  "/",
  multer.array("productImages", 5),
  parseJson(["attributes", "categories"]),
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
  multer.array("images", 5),
  parseJson(["attributes", "categories"]),
  validateIdParam,
  validateUpdateProduct,
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
