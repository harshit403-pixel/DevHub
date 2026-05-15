const express = require("express");

const router = express.Router();


const protect = require("../middleware/auth.middleware");
const upload = require(
  "../middleware/upload.middleware"
);
const authMiddleware = require(
  "../middleware/auth.middleware"
);



const {
  createProject,
    getUserProjects,
    getAllProjects,
    getSingleProject,
    toggleLikeProject,
    deleteProject
} = require("../controllers/project.controller");

router.post(
  "/", 
  authMiddleware,
  upload.single("thumbnail"),

  createProject
);
router.get(
  "/all",
  authMiddleware,
  getAllProjects
);
router.get(
  "/:id",
  authMiddleware,
  getSingleProject
);
router.put(
  "/like/:id",
  authMiddleware,
  toggleLikeProject
);
router.delete(
  "/:id",
  authMiddleware,
  deleteProject
);
router.get("/", protect, getUserProjects);

module.exports = router;