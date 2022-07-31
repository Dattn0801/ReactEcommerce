const express = require("express");
const router = express.Router();

// middlewares
const { authCheck, adminCheck } = require("../middlewares/auth");

// controller
const { upload, remove } = require("../controllers/cloudinary");

// routes
router.post("/uploadImages", authCheck, adminCheck, upload);
router.post("/removeImages", authCheck, adminCheck, remove);
// router.get("/product/:slug", read);
// router.put("/product/:slug", authCheck, adminCheck, update);
// router.delete("/product/:slug", authCheck, adminCheck, remove);

module.exports = router;
