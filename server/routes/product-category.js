const express = require("express");
const router = express.Router();
const productCategoryController = require("../controllers/product-category");
const {
  validateCreateProductCategory,
  validateUpdateProductCategory,
  validateIdParam,
} = require("../validators/product-category-validator");
const { runValidation } = require("../middleware/validate");

router.post(
  "/",
  validateCreateProductCategory,
  runValidation,
  productCategoryController.createProductCategory
);

router.get("/", productCategoryController.getProductCategories);

router.get(
  "/:id",
  validateIdParam,
  runValidation,
  productCategoryController.getProductCategoryById
);

router.patch(
  "/:id",
  validateIdParam,
  validateUpdateProductCategory,
  runValidation,
  productCategoryController.updateProductCategory
);

router.delete(
  "/:id",
  validateIdParam,
  runValidation,
  productCategoryController.deleteProductCategory
);

module.exports = router;
