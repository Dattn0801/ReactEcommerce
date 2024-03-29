const express = require("express");
const router = express.Router();

// middlewares
const { authCheck, adminCheck } = require("../middlewares/auth");

// controller
const {
  create,
  read,
  update,
  remove,
  listAll,
  list,
  productsCount,
  productStart,
  listRelated,
  searchFilters,
} = require("../controllers/product");

// routes
router.post("/product", authCheck, adminCheck, create);
router.get("/products/total", productsCount);
router.get("/products/:count", listAll); //100 product
router.get("/product/:slug", read);
router.put("/product/:slug", authCheck, adminCheck, update);
router.delete("/product/:slug", authCheck, adminCheck, remove);
router.post("/products", list);
//rating
router.put("/product/star/:productId", authCheck, productStart);
//related product
router.get("/product/related/:productId", listRelated);
//search
router.post("/search/filters", searchFilters);
module.exports = router;
