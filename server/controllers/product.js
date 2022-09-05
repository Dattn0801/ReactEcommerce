const Product = require("../models/product");
const User = require("../models/user");
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

// without pagination
// exports.list = async (req, res) => {
//   try {
//     // createdAt/updateAt, desc/asc, 3
//     const { sort, order, limit } = req.body;
//     const products = await Product.find({})
//       .populate("category")
//       .populate("subs")
//       .sort([[sort, order]])
//       .limit(limit)
//       .exec();
//     res.json(products);
//   } catch (err) {
//     console.log(err);
//   }
// };

// with pagination
exports.list = async (req, res) => {
  //console.table(req.body);
  try {
    // createdAt/updateAt, desc/asc, 3
    const { sort, order, page } = req.body;
    const currentPage = page || 1;
    const perPage = 4;

    const products = await Product.find({})
      .skip((currentPage - 1) * perPage)
      .populate("category")
      .populate("subs")
      .sort([[sort, order]])
      .limit(perPage)
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

// Đánh giá sản phẩm
exports.productStart = async (req, res) => {
  const product = await Product.findById(req.params.productId).exec();
  const user = await User.findOne({ email: req.user.email }).exec();
  const { star } = req.body;

  // kiểm tra xem user có rating chưa
  let existingRatingObject = product.ratings.find(
    (userRating) => userRating.postedBy.toString() === user._id.toString()
  );
  //Nếu user chưa rating, rating
  if (existingRatingObject === undefined) {
    let ratingAdded = await Product.findByIdAndUpdate(
      product._id,
      {
        $push: { ratings: { star, postedBy: user._id } },
      },
      { new: true }
    ).exec();
    console.log("ratingaded", ratingAdded);
    res.json(ratingAdded);
  } else {
    // nếu user rating rồi, update rating
    const ratingUpdated = await Product.updateOne(
      {
        ratings: { $elemMatch: existingRatingObject },
      },
      { $set: { "ratings.$.star": star } },
      { new: true }
    ).exec();
    console.log("updated", ratingUpdated);
    res.json(ratingUpdated);
  }
};

exports.listRelated = async (req, res) => {
  const product = await Product.findById(req.params.productId).exec();

  const related = await Product.find({
    _id: { $ne: product._id },
    category: product.category,
  })
    .limit(4)
    .populate("category")
    .populate("subs")
    .populate("ratings.postedBy")
    .exec();

  res.json(related);
};

const handleQuery = async (req, res, query) => {
  const products = await Product.find({ $text: { $search: query } })
    .populate("category", "_id name")
    .populate("subs", "_id name")
    .populate("ratings.postedBy", "_id name")
    .exec();
  res.json(products);
};
const handlePrice = async (req, res, price) => {
  try {
    let products = await Product.find({
      price: {
        $gte: price[0],
        $lte: price[1],
      },
    })
      .populate("category", "_id name")
      .populate("subs", "_id name")
      .populate("ratings.postedBy", "_id name")
      .exec();
    res.json(products);
  } catch (err) {
    console.log(err);
  }
};
const handleCategory = async (req, res, category) => {
  try {
    let products = await Product.find({ category })
      .populate("category", "_id name")
      .populate("subs", "_id name")
      .populate("ratings.postedBy", "_id name")
      .exec();
    res.json(products);
  } catch (err) {
    console.log(err);
  }
};
const handleStar = (req, res, stars) => {
  Product.aggregate([
    {
      $project: {
        document: "$$ROOT",
        //title: "$title",
        floorAverage: {
          $floor: { $avg: "$ratings.star" }, // floor value of 3.33 will be 3
        },
      },
    },
    { $match: { floorAverage: stars } },
  ])
    .limit(12)
    .exec((err, aggregates) => {
      if (err) console.log("AGGREGATE ERROR", err);
      Product.find({ _id: aggregates })
        .populate("category", "_id name")
        .populate("subs", "_id name")
        .exec((err, products) => {
          if (err) console.log("PRODUCT AGGREGATE ERROR", err);
          res.json(products);
        });
    });
};
const handleSub = async (req, res, sub) => {
  const products = await Product.find({ subs: sub })
    .populate("category", "_id name")
    .populate("subs", "_id name")
    .populate("ratings.postedBy", "_id name")
    .exec();

  res.json(products);
};

const handleShipping = async (req, res, shipping) => {
  const products = await Product.find({ shipping })
    .populate("category", "_id name")
    .populate("subs", "_id name")
    .populate("ratings.postedBy", "_id name")
    .exec();

  res.json(products);
};

const handleColor = async (req, res, color) => {
  const products = await Product.find({ color })
    .populate("category", "_id name")
    .populate("subs", "_id name")
    .populate("ratings.postedBy", "_id name")
    .exec();

  res.json(products);
};

const handleBrand = async (req, res, brand) => {
  const products = await Product.find({ brand })
    .populate("category", "_id name")
    .populate("subs", "_id name")
    .populate("postedBy", "_id name")
    .exec();

  res.json(products);
};
exports.searchFilters = async (req, res) => {
  const { query, price, category, stars, sub } = req.body;
  if (query) {
    console.log("query-->", query);
    await handleQuery(req, res, query);
  }
  if (price !== undefined) {
    console.log("price--->", price);
    await handlePrice(req, res, price);
  }
  if (category !== undefined) {
    console.log("category--->", category);
    await handleCategory(req, res, category);
  }
  if (stars) {
    console.log("stars ---> ", stars);
    await handleStar(req, res, stars);
  }
  if (sub) {
    console.log("subs ---> ", sub);
    await handleSub(req, res, sub);
  }
};
