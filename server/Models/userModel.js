const mongoose=require("mongoose")

const userSchema=mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
     password:{
     type:String,
     required:true,
 },
 profilephoto:{
    type:String,
    default:"https://tse2.mm.bing.net/th/id/OIP.C9hxrZxGJvRybuqlN29sTgHaEf?pid=Api&P=0&h=220"
 }
},{timestamps:true})

const userModel=mongoose.model("UserAuth",userSchema)

module.exports={userModel}