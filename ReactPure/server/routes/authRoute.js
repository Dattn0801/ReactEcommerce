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

//user
router.post("/login", loginUser);
router.get("/logout", logout);
router.put("/password", authMiddleware, updatePassword);
router.post("/forgot-password-token", forgotPasswordToken);
router.put("/reset-password/:token", resetPassword);

//refreshtoken
router.get("/refresh", handleRefreshToken);

//wishlist
router.get("/wishlist", authMiddleware, getWishlist);
//address
router.put("/address", authMiddleware, isAdmin, saveAddress);

//cart
router.post("/cart", authMiddleware, userCart);
router.get("/cart/:id", getUserCart);
router.delete("/cart/:id", authMiddleware, emptyCart);
router.post("/cart/applycoupon", authMiddleware, applyCoupon);
router.post("/cart/cash-order", authMiddleware, createOrder);
router.get("/orders", authMiddleware, getOrders);

//crud
router.post("/register", createUser);
router.get("/:id", authMiddleware, isAdmin, getaUser);
router.delete("/:id", authMiddleware, isAdmin, deleteaUser);
router.put("/:id", authMiddleware, isAdmin, updatedUser);

//admin
router.get("/all-users", authMiddleware, isAdmin, getallUser);
router.put("/block-user/:id", authMiddleware, isAdmin, blockUser);
router.put("/unblock-user/:id", authMiddleware, isAdmin, unblockUser);
router.get("/getallorders", authMiddleware, isAdmin, getAllOrders);
router.put(
  "/order/update-order/:id",
  authMiddleware,
  isAdmin,
  updateOrderStatus
);
module.exports = router;
