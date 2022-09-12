const express = require("express");
const router = express.Router();

// middlewares
const { authCheck } = require("../middlewares/auth");
// controller
const { userCart, getuserCart } = require("../controllers/user");

router.post("/user/cart", authCheck, userCart);
router.get("user/cart", authCheck, getuserCart);
module.exports = router;
