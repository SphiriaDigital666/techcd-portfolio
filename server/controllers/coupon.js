const Coupon = require("../models/coupon");

exports.createCoupon = async (req, res) => {
  try {
    const { title, couponType, code, value, startDate, endDate } = req.body;
    const coupon = new Coupon({
      title,
      couponType,
      code,
      value,
      startDate,
      endDate,
    });
    await coupon.save();

    res.status(201).json(coupon);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating coupon", error: error.message });
  }
};

exports.getCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.find().sort({ createdAt: -1 });
    res.status(200).json(coupons);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching coupons", error: error.message });
  }
};

exports.getCouponById = async (req, res) => {
  try {
    const { id } = req.params;
    const coupon = await Coupon.findById(id);

    if (!coupon) return res.status(404).json({ message: "Coupon not found" });

    res.status(200).json(coupon);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching coupon", error: error.message });
  }
};

exports.updateCoupon = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, couponType, code, value, startDate, endDate } = req.body;

    const coupon = await Coupon.findByIdAndUpdate(
      id,
      { title, couponType, code, value, startDate, endDate },
      { new: true, runValidators: true }
    );

    if (!coupon) return res.status(404).json({ message: "Coupon not found" });

    res.status(200).json(coupon);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating coupon", error: error.message });
  }
};

exports.deleteCoupon = async (req, res) => {
  try {
    const { id } = req.params;
    const coupon = await Coupon.findByIdAndDelete(id);

    if (!coupon) return res.status(404).json({ message: "Coupon not found" });

    res.status(200).json({ message: "Coupon deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting coupon", error: error.message });
  }
};
