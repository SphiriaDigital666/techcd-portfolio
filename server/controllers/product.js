const Product = require("../models/product");
const cloudinary = require("../utils/cloudinary");

exports.createProduct = async (req, res) => {
  try {
    const files = req.files;
    const urls = [];
    const {
      title,
      smallDescription,
      description,
      price,
      discountPrice,
      categories,
      attributes,
      status,
    } = req.body;

    for (const file of files) {
      await cloudinary.uploader.upload(file.path, function (error, result) {
        if (error) throw error;
        urls.push(result.secure_url);
      });
    }

    const product = new Product({
      title,
      smallDescription,
      description,
      price,
      discountPrice,
      categories,
      attributes,
      productImages: urls,
      status,
    });
    await product.save();

    res.status(201).json({
      success: true,
      data: product,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate("categories", "name description")
      .populate("attributes.attribute", "name variations");

    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate("categories", "name description")
      .populate("attributes.attribute", "name variations");

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const files = req.files;
    const urls = [];
    const {
      title,
      smallDescription,
      description,
      price,
      discountPrice,
      categories,
      attributes,
      status,
    } = req.body;

    for (const file of files) {
      await cloudinary.uploader.upload(file.path, function (error, result) {
        if (error) throw error;
        urls.push(result.secure_url);
      });
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        title,
        smallDescription,
        description,
        price,
        discountPrice,
        categories,
        attributes,
        productImages: urls,
        status,
      },
      {
        new: true,
        runValidators: true,
      }
    )
      .populate("categories", "name description")
      .populate("attributes.attribute", "name variations");

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
