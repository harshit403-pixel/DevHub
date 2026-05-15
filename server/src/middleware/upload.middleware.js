const multer = require("multer");

const {
  CloudinaryStorage,
} = require(
  "multer-storage-cloudinary"
);

const cloudinary = require(
  "../config/cloudinary"
);

const storage =
  new CloudinaryStorage({
    cloudinary,

    params: async (
      req,
      file
    ) => ({
      folder: "devhub",

      allowed_formats: [
        "jpg",
        "png",
        "jpeg",
        "webp",
      ],
    }),
  });

const upload = multer({
  storage,
});

module.exports = upload;