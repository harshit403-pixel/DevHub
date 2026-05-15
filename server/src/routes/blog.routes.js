const express = require("express");

const router = express.Router();

const protect = require("../middleware/auth.middleware");
const authMiddleware = require("../middleware/auth.middleware");

const {
  deleteBlog,
} = require("../controllers/blog.controller");


const {
  createBlog,
   getBlogs,
} = require("../controllers/blog.controller");
router.delete(
  "/:id",
  authMiddleware,
  deleteBlog
);
router.post("/", protect, createBlog);
router.get("/", getBlogs);

module.exports = router;