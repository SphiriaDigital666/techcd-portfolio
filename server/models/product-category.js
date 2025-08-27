const mongoose = require("mongoose");

const ProductCategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "ProductCategory",
  ProductCategorySchema,
  "product_categories"
);
