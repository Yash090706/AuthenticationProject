const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../utils/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "mern_profile_photos",
    resource_type: "image",
  },
});

const upload = multer({ storage });

module.exports = upload;
