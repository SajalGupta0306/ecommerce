const express = require("express");
const { registerUser, loginUser } = require("../controllers/userController");

const router = express.Router();

// routes for the users
router.route("/createUser").post(registerUser);
router.route("/loginUser").post(loginUser);

module.exports = router;
