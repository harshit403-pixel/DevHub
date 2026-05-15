const Blog = require("../models/blog.model");

const createBlog = async (req, res) => {
  try {
    const {
      title,
      content,
      tags,
      category,
    } = req.body;

    const blog = await Blog.create({
      title,
      content,
      tags,
      category,

      author: req.user.id,
    });

    res.status(201).json(blog);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find()
      .populate(
  "author",
  "name profilePicture"
)
      .sort({
        createdAt: -1,
      });

    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createBlog,
  getBlogs,
};