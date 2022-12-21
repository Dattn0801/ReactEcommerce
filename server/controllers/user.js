const User = require("../models/user");
const Product = require("../models/product");
const Cart = require("../models/cart");
const Coupon = require("../models/coupon");
const Order = require("../models/order");

exports.userCart = async (req, res) => {
  console.log(req.body);
  const { cart } = req.body;

  let products = [];
  const user = await User.findOne({ email: req.user.email }).exec();

  //check cart of user loggin is already exist
  let cartExistByThisUser = await Cart.findOne({ orderBy: user._id }).exec();

  if (cartExistByThisUser) {
    cartExistByThisUser.remove();
    console.log("remove old cart");
  }

  for (let i = 0; i < cart.length; i++) {
    let object = {};
    object.product = cart[i]._id;
    object.count = cart[i].count;
    object.color = cart[i].color;

    //get price for creating total
    let productFromDb = await Product.findById(cart[i]._id)
      .select("price")
      .exec();
    object.price = productFromDb.price;
    products.push(object);
  }
  //console.log("products",products)
  let cartTotal = 0;
  for (let i = 0; i < products.length; i++) {
    cartTotal = cartTotal + products[i].price * products[i].count;
  }

  //console.log("cartTotal",cartTotal)

  let newCart = await new Cart({
    products,
    cartTotal,
    orderBy: user._id,
  }).save();
  console.log("new cart ----->", newCart);
  res.json({ ok: true });
};

exports.getuserCart = async (req, res) => {
  const user = await User.findOne({ email: req.user.email }).exec();

  let cart = await Cart.findOne({ orderBy: user._id })
    .populate("products.product", "_id title price totalAfterDiscounts")
    .exec();

  const { products, cartTotal, totalAfterDiscounts } = cart;

  res.json({ products, cartTotal, totalAfterDiscounts });
};

exports.emptyCart = async (req, res) => {
  const user = await User.findOne({ email: req.user.email }).exec();
  let cart = await Cart.findOneAndRemove({ orderBy: user._id }).exec();
  res.json(cart);
};

exports.saveAddress = async (req, res) => {
  const userAddress = await User.findOneAndUpdate(
    { email: req.user.email },
    {
      address: req.body.address,
    }
  ).exec();
  res.json({ ok: true });
};

exports.applyCouponToUserCart = async (req, res) => {
  const { coupon } = req.body;
  //console.log("COUPON", coupon);

  const validCoupon = await Coupon.findOne({ name: coupon }).exec();
  console.log(validCoupon);
  if (validCoupon === null) {
    return res.json({
      err: "Invalid coupon",
    });
  }
  //console.log("valid coupon", validCoupon);
  //console.log("valid coupon", validCoupon.expiry);
  const user = await User.findOne({ email: req.user.email }).exec();

  let { products, cartTotal } = await Cart.findOne({ orderBy: user._id })
    .populate("products.product", "_id title price")
    .exec();

  console.log("cartTotal", cartTotal, "discount %", validCoupon.discount);

  // calculate total after discount
  let totalAfterDiscount = (
    cartTotal -
    (cartTotal * validCoupon.discount) / 100
  ).toFixed(2); // 999.99231 => 99.99
  console.log("----------> ", totalAfterDiscount);

  Cart.findOneAndUpdate(
    { orderBy: user._id },
    { totalAfterDiscount },
    { new: true }
  ).exec();
  res.json(totalAfterDiscount);
};

exports.createOrder = async (req, res) => {
  // console.log(req.body);
  // return;
  const { paymentIntent } = req.body.stripeResponse;

  const user = await User.findOne({ email: req.user.email }).exec();

  let { products } = await Cart.findOne({ orderdBy: user._id }).exec();

  let newOrder = await new Order({
    products,
    paymentIntent,
    orderdBy: user._id,
  }).save();

  //decrement quantity, increment sold
  let bulkOption = products.map((item) => {
    return {
      updateOne: {
        filter: { _id: item.product._id },
        update: { $inc: { quantity: -item.count } },
      },
    };
  });
  let updated = await Product.bulkWrite(bulkOption, {});
  console.log("product quan--  &&  sold++", updated);

  console.log("NEW ORDER SAVED", newOrder);
  res.json({ ok: true });
};
