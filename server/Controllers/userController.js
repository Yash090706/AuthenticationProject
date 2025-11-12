const { userModel } = require("../Models/userModel");

const imageupdate=async(req,res)=>{
    try{
         if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
        const imageurl=req.file.path;
        await userModel.findByIdAndUpdate(req.body.userId,{
            profilephoto:imageurl
        });
        res.json({
             success: true,
      message: "Profile updated successfully",
      imageurl
        })
    }
    catch (error) {
    res.status(500).json({ error: error.message });
  }

}
module.exports=imageupdate;