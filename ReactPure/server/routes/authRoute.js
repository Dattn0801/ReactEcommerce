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
  myOrders,
  getMonthlyOrderData,
  getYearlyTotalOrders,
  getAllOrdersDashboard,
  getSingleOrder,
  updateOrder,
} = require("../controller/userCTL");

const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const { paymentVerification, checkout } = require("../controller/paymentCTL");
router.get("/get-myorders", authMiddleware, myOrders);
router.get("/getallorders", authMiddleware, isAdmin, getAllOrdersDashboard);
router.get("/getoneorder/:id", authMiddleware, isAdmin, getSingleOrder);
router.put("/updateOrder/:id", authMiddleware, isAdmin, updateOrder);

router.get("/profile", authMiddleware, getUserProfile);
router.get("/all-users", getallUser);
router.post("/login", loginUser);
router.get("/logout", logout);
router.put("/edit-user", authMiddleware, updatedUser);
router.put("/password", authMiddleware, updatePassword);
router.post("/forgot-password-token", forgotPasswordToken);
router.put("/reset-password/:token", resetPassword);
router.get("/refresh", handleRefreshToken);
router.put("/wishlist", authMiddleware, addToWishList);
router.get("/wishlist", authMiddleware, getWishlist);
router.put("/address", authMiddleware, isAdmin, saveAddress);

// router.delete("/cart/:id", authMiddleware, emptyCart);
router.delete("/empty-cart", authMiddleware, emptyCart);
router.get("/cart/", authMiddleware, getUserCart);
router.post("/cart", authMiddleware, userCart);

router.post("/cart/applycoupon", authMiddleware, applyCoupon);
router.post("/cart/create-order", authMiddleware, createOrder);

router.post("/order/checkout", authMiddleware, checkout);
router.post("/order/paymentVerification", authMiddleware, paymentVerification);
router.put("/order/update-order/:id", authMiddleware, isAdmin, updateOrderStatus);

router.delete("/delete-product-cart/:cartItemId", authMiddleware, removeProductFromCart);
router.delete("/update-product-cart/:cartItemId/:newQuantity", authMiddleware, updateProductQuantityFromCart);

router.get("/getmonthlyorders", authMiddleware, getMonthlyOrderData);
router.get("/getyearlyorders", authMiddleware, getYearlyTotalOrders);

// router.get("/orders", authMiddleware, getOrders);
router.post("/register", createUser);
router.get("/:id", authMiddleware, isAdmin, getaUser);
router.delete("/:id", authMiddleware, isAdmin, deleteaUser);
router.post("/admin-login", loginAdmin);

router.put("/block-user/:id", authMiddleware, isAdmin, blockUser);
router.put("/unblock-user/:id", authMiddleware, isAdmin, unblockUser);

module.exports = router;
