const express = require("express");
const router = express.Router();
const couponController = require("../controllers/coupon");
const {
  validateCreateCoupon,
  validateUpdateCoupon,
  validateIdParam,
} = require("../validators/coupon-validator");
const { runValidation } = require("../middleware/validate");

router.post(
  "/",
  validateCreateCoupon,
  runValidation,
  couponController.createCoupon
);

router.get("/", couponController.getCoupons);

router.get(
  "/:id",
  validateIdParam,
  runValidation,
  couponController.getCouponById
);

router.patch(
  "/:id",
  validateIdParam,
  validateUpdateCoupon,
  runValidation,
  couponController.updateCoupon
);

router.delete(
  "/:id",
  validateIdParam,
  runValidation,
  couponController.deleteCoupon
);

module.exports = router;
