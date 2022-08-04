const Product = require("../models/product");
const slugify = require("slugify");
exports.create = async (req, res) => {
  try {
    console.log(req.body);
    req.body.slug = slugify(req.body.title);
    const newProduct = await new Product(req.body).save();
    res.json(newProduct);
  } catch (err) {
    console.log(err);
    res.status(400).send("Tạo sản phẩm thất bại");
  }
};
exports.listAll = async (req, res) => {
  let products = await Product.find({})
    .limit(parseInt(req.params.count))
    .populate("category")
    .populate("subs")
    .sort([["createdAt", "desc"]])
    .exec();
  res.json(products);
};
exports.read = async (req, res) => {
  let product = await Product.findOne({ slug: req.params.slug })
    .populate("category")
    .populate("subs")
    .exec();
  res.json(product);
};
exports.update = async (req, res) => {
  try {
    if (req.body.tilte) {
      req.body.slug = slugify(req.body.tilte);
    }
    const updated = await Product.findOneAndUpdate(
      { slug: req.params.slug },
      req.body,
      { new: true }
    ).exec();
    res.json(updated);
  } catch (err) {
    console.log("product update eror", err);
    return res.status(400).send("Cập nhật sản phẩm thất bại");
  }
};

exports.remove = async function (req, res) {
  try {
    const deleted = await Product.findOneAndRemove({
      slug: req.params.slug,
    }).exec();
    res.json(deleted);
  } catch (err) {
    console.log(err);
    res.status(400).send("Xóa thất bại");
  }
};
exports.list = async (req, res) => {
  try {
    // createdAt/updateAt, desc/asc, 3
    const { sort, order, limit } = req.body;
    const products = await Product.find({})
      .populate("category")
      .populate("subs")
      .sort([[sort, order]])
      .limit(limit)
      .exec();
    res.json(products);
  } catch (err) {
    console.log(err);
  }
};
exports.productsCount = async (req, res) => {
  let total = await Product.countDocuments({}).exec();
  res.json(total);
};
