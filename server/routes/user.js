const express = require("express");
const router = express.Router();

// middlewares
const { authCheck } = require("../middlewares/auth");
// controller
const {
  userCart,
  getuserCart,
  emptyCart,
  saveAddress,
  applyCouponToUserCart,
  createOrder,
  orders,
} = require("../controllers/user");

router.post("/user/cart", authCheck, userCart);
router.get("/user/cart", authCheck, getuserCart);
router.put("/user/cart", authCheck, emptyCart);
router.post("/user/address", authCheck, saveAddress);

//coupon
router.post("/user/cart/coupon", authCheck, applyCouponToUserCart);

//user order
router.post("/user/order", authCheck, createOrder);
router.get("/user/orders", authCheck, orders);
module.exports = router;
