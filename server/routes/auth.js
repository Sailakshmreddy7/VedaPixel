const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  updateUserProfile,
} = require("../controllers/auth");
const { verifyToken } = require("../middlewares/auth");

// Register
router.post("/register", registerUser);

// Login
router.post("/login", loginUser);

router.put("/profile", verifyToken, updateUserProfile);
module.exports = router;
