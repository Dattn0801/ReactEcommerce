const express = require("express");
const router = express.Router();
const {
  createUser,
  loginUserCtrl,
  getallUser,
  getaUser,
  deleteaUser,
  updatedUser,
  blockUser,
  unblockUser,
  handleRefreshToken,
  logout,
  updatePassword,
  forgotPasswordToken,
  resetPassword,
  loginAdmin,
  getWishlist,
  saveAddress,
  userCart,
  getUserCart,
  emptyCart,
  applyCoupon,
  createOrder,
  getOrders,
  updateOrderStatus,
  getAllOrders,
  loginUser,
} = require("../controller/userCTL");

const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");

//login
router.post("/login", loginUser);
router.get("/logout", logout);
router.put("/password", authMiddleware, updatePassword);
//dashboard
router.get("/all-users", getallUser);

//refreshtoken
router.get("/refresh", handleRefreshToken);

//crud
router.post("/register", createUser);
router.get("/:id", authMiddleware, isAdmin, getaUser);
router.delete("/:id", deleteaUser);
router.put("/:id", authMiddleware, updatedUser);

//block, unblock
router.put("/block-user/:id", authMiddleware, isAdmin, blockUser);
router.put("/unblock-user/:id", authMiddleware, isAdmin, unblockUser);

module.exports = router;
