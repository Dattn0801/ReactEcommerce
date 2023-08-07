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
  addToWishList,
  removeProductFromCart,
  updateProductQuantityFromCart,
} = require("../controller/userCTL");

const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const { paymentVerification, checkout } = require("../controller/paymentCTL");
router.get("/getallorders", authMiddleware, isAdmin, getAllOrders);
router.get("/profile", authMiddleware, getUserProfile);
router.get("/all-users", getallUser);
router.post("/login", loginUser);
router.get("/logout", logout);
router.put("/password", authMiddleware, updatePassword);
router.post("/forgot-password-token", forgotPasswordToken);
router.put("/reset-password/:token", resetPassword);
router.get("/refresh", handleRefreshToken);
router.put("/wishlist", authMiddleware, addToWishList);
router.get("/wishlist", authMiddleware, getWishlist);
router.put("/address", authMiddleware, isAdmin, saveAddress);

router.get("/cart/", authMiddleware, getUserCart);
router.post("/cart", authMiddleware, userCart);

router.delete("/cart/:id", authMiddleware, emptyCart);

router.post("/order/checkout", authMiddleware, checkout);
router.post("/order/paymentVerification", authMiddleware, paymentVerification);

router.delete(
  "/delete-product-cart/:cartItemId",
  authMiddleware,
  removeProductFromCart
);
router.delete(
  "/update-product-cart/:cartItemId/:newQuantity",
  authMiddleware,
  updateProductQuantityFromCart
);

router.post("/cart/applycoupon", authMiddleware, applyCoupon);
router.post("/cart/create-order", authMiddleware, createOrder);
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
