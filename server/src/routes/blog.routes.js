const express = require("express");

const router = express.Router();

const protect = require("../middleware/auth.middleware");


const {
  createBlog,
   getBlogs,
} = require("../controllers/blog.controller");

router.post("/", protect, createBlog);
router.get("/", getBlogs);

module.exports = router;