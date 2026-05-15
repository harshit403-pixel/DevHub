const User = require("../models/user.model");

const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    user.bio = req.body.bio || user.bio;

    user.skills = req.body.skills || user.skills;

    user.socialLinks = {
      github:
        req.body.socialLinks?.github ||
        user.socialLinks.github,

      linkedin:
        req.body.socialLinks?.linkedin ||
        user.socialLinks.linkedin,

      twitter:
        req.body.socialLinks?.twitter ||
        user.socialLinks.twitter,
    };

    const updatedUser = await user.save();

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  updateProfile,
};