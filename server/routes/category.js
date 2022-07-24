const express = require("express");
const router = express.Router();

//middlewares
const { authCheck, adminCheck } = require("../middlewares/auth");

//controllers
const {
  create,
  read,
  update,
  list,
  remove,
} = require("../controllers/category");

router.post("/category", authCheck, adminCheck, create);
router.get("/categories", list);
router.get("/category/:slug", authCheck, adminCheck, read);
router.put("/category/:slug", authCheck, adminCheck, update);
// router.delete("/category/:slug", authCheck, adminCheck, remove);

module.exports = router;
