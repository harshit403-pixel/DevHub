const express = require("express");
const protect = require("../middleware/auth.middleware");

const {
  registerUser,
  loginUser,
  getMe,
} = require("../controllers/auth.controller");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getMe);

module.exports = router;