const express = require(
  "express"
);

const router =
  express.Router();

const upload = require(
  "../middleware/upload.middleware"
);

const authMiddleware = require(
  "../middleware/auth.middleware"
);

const User = require(
  "../models/user.model"
);

/* Upload Profile Picture */
router.post(
  "/profile-picture",
  authMiddleware,
  upload.single("image"),

  async (req, res) => {
    try {
      const user =
        await User.findByIdAndUpdate(
          req.user.id,
          {
            profilePicture:
              req.file.path,
          },
          {
            new: true,
          }
        );

      res.json(user);
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  }
);

/* Upload Cover Image */
router.post(
  "/cover-image",
  authMiddleware,
  upload.single("image"),

  async (req, res) => {
    try {
      const user =
        await User.findByIdAndUpdate(
          req.user.id,
          {
            coverImage:
              req.file.path,
          },
          {
            new: true,
          }
        );

      res.json(user);
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  }
);

module.exports = router;