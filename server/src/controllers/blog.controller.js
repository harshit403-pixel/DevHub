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
const deleteBlog =
  async (req, res) => {
    try {
      const blog =
        await Blog.findById(
          req.params.id
        );

      if (!blog) {
        return res
          .status(404)
          .json({
            message:
              "Blog not found",
          });
      }

      if (
        blog.author.toString() !==
        req.user.id
      ) {
        return res
          .status(401)
          .json({
            message:
              "Not authorized",
          });
      }

      await blog.deleteOne();

      res.json({
        message:
          "Blog deleted",
      });
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };
module.exports = {
  createBlog,
  getBlogs,
    deleteBlog,
};