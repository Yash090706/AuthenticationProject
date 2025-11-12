const express=require("express");
const upload = require("../MiddleWare/multer");
const imageupdate = require("../Controllers/userController");
const userroute=express.Router();

userroute.post("/updateimage",upload.single("profile"),imageupdate);
module.exports = userroute;