const { json } = require("express");
const errorhandler = require("../MiddleWare/errors");
const jwt=require("jsonwebtoken")
const { userModel } = require("../Models/userModel");
const bcryptjs = require("bcryptjs");
// const cookieParser = require("cookie-parser");
const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  // Hashing the password for safety purpose using bcryptjs here 10 is saltround
  const saltrounds = 10;
  const hashpassword = bcryptjs.hashSync(password, saltrounds);
  const auth_info = new userModel({
    username: username,
    email: email,
    password: hashpassword,
  });
  await auth_info
    .save()
    .then(() => {
      res.send({
        status: 1,
        msg: "Signed Up SuccessFully",
      });
    })
    .catch((err) => {
      next(err);
    });
};
const signin = async (req, res, next) => {
    try{
  const { email, password } = req.body;
  const validateUser = await userModel.findOne({ email: email });
  if (!validateUser) {
    return next(errorhandler(404, "User Not Found"));
  }
  if (!bcryptjs.compareSync(password, validateUser.password)) {
    return next(errorhandler(401, "Invalid Credentials."));
  }
  const {password:hashpassword,...other}=validateUser._doc;
  const token=jwt.sign({id:validateUser._id},process.env.JWT_SECRET_KEY);
  res.cookie("AuthToken",token,{httpOnly:true,secure:false,sameSite:"strict",expires:new Date(Date.now()+60*60*1000)}).status(200).json(other);
    }
    catch(err){
        next(err);
    }
};
const google_signin=async(req,res,next)=>{
  try{
    const user= await userModel.findOne({email:req.body.email});
    if(user){
      const{password:hashpassword,...others}=user._doc;
      const token=jwt.sign({id:user._id},process.env.JWT_SECRET_KEY)
      res.cookie("AuthToken",token,{httpOnly:true,expires:new Date(Date.now()+60*60*1000)}).status(200).json(others);

    }
    else{
      const generatedpassword=Math.random().toString().slice(-8)+Math.random().toString().slice(-8);
      const saltrounds=10;
      const hashedgenpassword=bcryptjs.hashSync(generatedpassword,saltrounds);
      const newuser= new userModel({
        username:req.body.name.split("").join("").toLowerCase()+Math.floor(Math.random()*10000).toString(),
        email:req.body.email,
        password:hashedgenpassword,
       profilephoto:req.body.photoURL
         });
        await newuser.save();
         const{password,...rest}=newuser._doc;
         const token=jwt.sign({id:newuser._id},process.env.JWT_SECRET_KEY)
         res.cookie("AuthToken",token,{httpOnly:true,expires:new Date(Date.now()+60*60*1000)}).status(200).json(rest);




    }
  }catch(err){
    next(err);
  }
}
module.exports = { signup ,signin,google_signin};
