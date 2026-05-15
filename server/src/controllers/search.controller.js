const User = require("../models/user.model");
const Project = require("../models/project.model");

const searchAll = async (req, res) => {
  try {
    const query = req.query.q;

    const users = await User.find({
      $or: [
        {
          name: {
            $regex: query,
            $options: "i",
          },
        },

        {
          skills: {
            $regex: query,
            $options: "i",
          },
        },
      ],
    }).select("-password");

    const projects = await Project.find({
      $or: [
        {
          title: {
            $regex: query,
            $options: "i",
          },
        },

        {
          techStack: {
            $regex: query,
            $options: "i",
          },
        },
      ],
    }).populate("createdBy", "name");

    res.status(200).json({
      users,
      projects,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  searchAll,
};