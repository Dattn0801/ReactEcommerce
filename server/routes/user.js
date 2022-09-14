const express = require("express");
const router = express.Router();

// middlewares
const { authCheck } = require("../middlewares/auth");
// controller
const { userCart, getuserCart,emptyCart } = require("../controllers/user");

router.post("/user/cart", authCheck, userCart);
router.get("/user/cart", authCheck, getuserCart);
router.put("/user/cart", authCheck, emptyCart);
module.exports = router;
