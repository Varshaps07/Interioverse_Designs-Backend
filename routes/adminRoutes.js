const express = require("express");
const router = express.Router();

const verifyAdmin = require("../middleware/verifyAdmin");
const { verifyUser, deleteUser } = require("../controllers/adminController");
const User = require("../models/Profile");

// Get all users (excluding admin if needed)
router.get("/users", verifyAdmin, async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// Verify user API
router.patch("/users/:id/verify", verifyAdmin, verifyUser);

// Delete user API
router.delete("/users/:id", verifyAdmin, deleteUser);

module.exports = router;
