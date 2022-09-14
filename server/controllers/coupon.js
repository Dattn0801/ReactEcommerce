const Coupon = require("../models/coupon");
const Product = require("../models/product");
const slugify = require("slugify");

exports.create = async (req, res) => {
  try {
    const { name, expiry, discount } = req.body;
    res.json(await new Coupon({ name, expiry, discount }).save());
  } catch (err) {
    res.status(400).send("Tạo coupon thất bại");
  }
};

exports.list = async (req, res) =>
  res.json(await Coupon.find({}).sort({ createdAt: -1 }).exec());

exports.remove = async (req, res) => {
  try {
    const deleted = await Coupon.findOneAndDelete({ slug: req.params.slug });
    res.json(deleted);
  } catch (err) {
    res.status(400).send("Remove coupon failed");
  }
};
