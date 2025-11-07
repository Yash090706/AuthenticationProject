const express=require("express");
const { signup, signin, google_signin } = require("../Controllers/authController");

const authRoute=express.Router();

authRoute.post("/signup",signup);
authRoute.post("/signin",signin);
authRoute.post("/google",google_signin)

module.exports={authRoute}

