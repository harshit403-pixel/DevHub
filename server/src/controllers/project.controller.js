const Project = require("../models/project.model");

const createProject = async (req, res) => {
  try {
    const {
  title,
  description,
  githubLink,
  liveLink,
} = req.body;

const techStack = JSON.parse(
  req.body.techStack
);

    const project = await Project.create({
      title,
      description,
      techStack,
      githubLink,
      liveLink,

      thumbnail: req.file?.path || "",

      createdBy: req.user.id,
    });

    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const getUserProjects = async (req, res) => {
  try {
    const projects = await Project.find({
      createdBy: req.user.id,
    }).sort({
      createdAt: -1,
    });

    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const getAllProjects =
  async (req, res) => {
    try {
      const projects =
        await Project.find()
          .populate(
            "createdBy",
            "name profilePicture"
          )
          .sort({
            createdAt: -1,
          });

      res.status(200).json(
        projects
      );
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };

const getSingleProject =  async (req, res) => {
    try {
      const project =
        await Project.findById(
          req.params.id
        ).populate(
          "createdBy",
          "name profilePicture"
        );

      res.json(project);
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };
  const toggleLikeProject =
  async (req, res) => {
    try {
      const project =
        await Project.findById(
          req.params.id
        );

      const alreadyLiked =
        project.likes.includes(
          req.user.id
        );

      if (alreadyLiked) {
        project.likes =
          project.likes.filter(
            (id) =>
              id.toString() !==
              req.user.id
          );
      } else {
        project.likes.push(
          req.user.id
        );
      }

      await project.save();

      res.json(project);
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };
const deleteProject =
  async (req, res) => {
    try {
      const project =
        await Project.findById(
          req.params.id
        );

      if (!project) {
        return res
          .status(404)
          .json({
            message:
              "Project not found",
          });
      }

      if (
        project.createdBy.toString() !==
        req.user.id
      ) {
        return res
          .status(401)
          .json({
            message:
              "Not authorized",
          });
      }

      await project.deleteOne();

      res.json({
        message:
          "Project deleted",
      });
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };
module.exports = {
  createProject,
    getAllProjects,

  getSingleProject,
  getUserProjects,
  toggleLikeProject,
  deleteProject
};
