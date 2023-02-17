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
//logout
router.get("/logout", logout);
//update pass
router.put("/password", authMiddleware, updatePassword);
//forgotpass
router.post("/forgot-password-token", forgotPasswordToken);
//reset password
router.put("/reset-password/:token", resetPassword);

//dashboard
router.get("/all-users", getallUser);

//refreshtoken
router.get("/refresh", handleRefreshToken);

//wishlist
router.get("/wishlist", authMiddleware, getWishlist);
//address
router.put("/address", authMiddleware, isAdmin, saveAddress);

//crud
router.post("/register", createUser);
router.get("/:id", authMiddleware, isAdmin, getaUser);
router.delete("/:id", authMiddleware, isAdmin, deleteaUser);
router.put("/:id", authMiddleware, isAdmin, updatedUser);

//block, unblock
router.put("/block-user/:id", authMiddleware, isAdmin, blockUser);
router.put("/unblock-user/:id", authMiddleware, isAdmin, unblockUser);

module.exports = router;
