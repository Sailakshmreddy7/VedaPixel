const express = require("express");
const router = express.Router();
const { getCurrentUser, getUserBookings } = require("../controllers/user");
const { verifyToken } = require("../middlewares/auth");

// Register
router.get("/profile", verifyToken, getCurrentUser);

module.exports = router;
