const express=require("express");
const { test } = require("../Controllers/userController");

let userRoutes=express.Router();

userRoutes.get("/server",test);

module.exports={userRoutes}