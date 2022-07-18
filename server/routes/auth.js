const express = require("express");
const router = express.Router();
const auth = require()
//import
const createOrUpdateUser = require("../controllers/auth");
//route
router.get("/create-or-update-user", auth.createOrUpdateUser);

module.exports = router;
