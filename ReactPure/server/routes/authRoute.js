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
  getUserProfile,
} = require("../controller/userCTL");

const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");

router.get("/getallorders", authMiddleware, isAdmin, getAllOrders);
router.get("/profile", authMiddleware, getUserProfile);
router.get("/all-users", getallUser);
router.post("/login", loginUser);
router.get("/logout", logout);
router.put("/password", authMiddleware, updatePassword);
router.post("/forgot-password-token", forgotPasswordToken);
router.put("/reset-password/:token", resetPassword);
router.get("/refresh", handleRefreshToken);
router.get("/wishlist", authMiddleware, getWishlist);
router.put("/address", authMiddleware, isAdmin, saveAddress);
router.post("/cart", authMiddleware, userCart);
router.get("/cart/:id", getUserCart);
router.delete("/cart/:id", authMiddleware, emptyCart);
router.post("/cart/applycoupon", authMiddleware, applyCoupon);
router.post("/cart/cash-order", authMiddleware, createOrder);
router.get("/orders", authMiddleware, getOrders);
router.post("/register", createUser);
router.get("/:id", authMiddleware, isAdmin, getaUser);
router.delete("/:id", authMiddleware, isAdmin, deleteaUser);
router.put("/:id", authMiddleware, isAdmin, updatedUser);
router.post("/admin-login", loginAdmin);
router.put("/block-user/:id", authMiddleware, isAdmin, blockUser);
router.put("/unblock-user/:id", authMiddleware, isAdmin, unblockUser);

router.put(
  "/order/update-order/:id",
  authMiddleware,
  isAdmin,
  updateOrderStatus
);
module.exports = router;
