import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useRef } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { toast,ToastContainer } from 'react-toastify'
import { SignInSuccess } from '../Redux/User/UserSlice'

const Profile = () => {
  const photoref=useRef(null);
  const dispatch=useDispatch();
  const {user}=useSelector((state)=>state.user)
  const [image,setImage]=useState(user.profilephoto);
  const handleFileUpload=async(e)=>{
    const file=e.target.files[0];
    if(!file) return;
    const formData=new FormData();
    formData.append("profile",file);
    formData.append("userId",user._id)
    try{
      const res=await axios.post("http://localhost:8000/api/user/updateimage",formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })
     toast.success("Profile Photo Updated SucccessFully.")
      const imageURL = res.data.imageurl;
      setImage(imageURL);
      dispatch(SignInSuccess({...user,profilephoto:imageURL}))
    }
    catch (err) {
      console.log(err);
      toast.error("Failed To Update Profile Photo.")
    }
   

  }
  return (
    <div className='bg-blue-200 h-[500px] w-[500px] m-auto rounded-3xl shadow-xl mt-9'>
      <ToastContainer/>
      <h1 className='font-bold text-3xl text-center pt-7'>Profile</h1>
      <form className="flex flex-col gap-4" >
        <input type="file" hidden ref={photoref} accept={'image/*'} onChange={handleFileUpload}></input>
        <img src={image} alt="profilephoto" className="rounded-full mt-6 w-20 h-20 mx-auto object-cover" 
        onClick={()=>{
          photoref.current.click();
        }}/>
        <input type="text" defaultValue={user.username} disabled className='rounded-3xl text-center p-3 bg-slate-200 font-semibold'></input>
        <input type="email" defaultValue={user.email} disabled  className='bg-slate-200 rounded-3xl text-center font-semibold p-3'></input>
        <input type="password" placeholder="Password" disabled className='bg-slate-200 rounded-3xl text-center font-semibold p-3'></input>
        <button className="bg-green-400 rounded-3xl text-center uppercase p-3 hover:cursor-pointer hover:opacity-70">Update</button>
        <div className="flex justify-between p-2">
          <span className="text-red-600 hover:cursor-pointer">Delete Account</span>
          <span className="text-red-600 hover:cursor-pointer">Sign Out</span>
        </div>
        
      </form>
    
    </div>
  )
}

export default Profile
