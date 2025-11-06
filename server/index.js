const express=require("express");
const app=express();
app.use(express.json());
require("dotenv").config({path:"../.env"});
const { userRoutes } = require("./Routes/userRoutes");
// Connecting to Database
const mongoose=require("mongoose");
const { authRoute } = require("./Routes/authRoutes");
const cors=require("cors")
app.use(cors());

mongoose.connect(process.env.MONGODB).then(()=>{
    console.log("Connected To MongoDB")
}).catch((err)=>{
    console.log(err)

})
// Static URL/Route
app.use("/api/user",userRoutes)
app.use("/api/auth",authRoute)

// Handling Middlewares
app.use((err,req,res,next)=>{
    const statuscode=err.statuscode || 500
    const message=err.message || "Internal Server Error."
    return res.status(statuscode).json({
        success:false,
        statuscode,
        message
    });

})
app.listen(process.env.SERVER_PORT,()=>{
    console.log("Server Running on Port "+process.env.SERVER_PORT)
})

