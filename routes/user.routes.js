const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const router = express.Router();

// Signup
router.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = new User({ username, email, password });
    await user.save();
    res.status(201).json({
      message: "User created successfully.",
      user_id: user._id
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: error.message
    });
  }
});

// Login with username or email
router.post("/login", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await User.findOne({
      $or: [
        { email },
        { username }
      ]
    });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({
        status: false,
        message: "Invalid Username and password"
      });
    }
    res.status(200).json({
      message: "Login successful.",
      jwt_token: "Optional implementation" // Add real JWT later if needed
    });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
});

module.exports = router;
