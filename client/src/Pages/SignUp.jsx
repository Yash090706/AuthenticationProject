import React from 'react'
import { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

const SignUp = () => {
  const [loading,setloading]=useState(false);
  const[error,seterror]=useState(false);
  const [formdata,setformdata]=useState({
    "username":"",
    "email":"",
    "password":""
  });
  const navigate=useNavigate();

  const handleChange=(e)=>{
    const oldata={...formdata};
    const id=e.target.id;
    const value=e.target.value;
    oldata[id]=value;
    setformdata(oldata);
    console.log(formdata);


  }
  const handleSubmit=async(e)=>{
    e.preventDefault();
      seterror(false);
      setloading(true);
        await axios.post("http://localhost:8000/api/auth/signup",formdata).then((res)=>{
          toast.success("Signed up successfully!");
    console.log(res.data);
    setformdata({
      username:"",
      email:"",
      password:""
    })
    setTimeout(()=>{
      navigate("/signin")
    },1500);
    setloading(false)
    seterror(false);
  }).catch((err)=>{
    toast.error("Signup Failed!");

      seterror(true);
      setloading(false);
      console.log(err.response.data);
    });
      




  }
  return (
    <div className='max-w-lg mx-auto bg-blue-200 h-[60vh] shadow-xl rounded-3xl mt-20 '>
      <ToastContainer/>
      <h1 className="font-bold text-4xl text-center m-7 p-3">Sign up</h1>
      <form className='flex flex-col gap-4 'onSubmit={handleSubmit}>
        <input type="text" placeholder="Username" id="username" value={formdata.username} className='bg-slate-200 p-3 rounded-lg'onChange={handleChange} ></input>
        <input type="email" placeholder="Email" id="email" value={formdata.email}className='bg-slate-200 p-3 rounded-lg' onChange={handleChange}></input>
        <input type="password" placeholder="Password" id="password" value={formdata.password} className='bg-slate-200 p-3 rounded-lg' onChange={handleChange}></input>
        <button disabled={loading} type="submit" className='bg-blue-500 rounded-lg p-3 hover:cursor-pointer hover:opacity-70 uppercase text-white'>{loading ? "Loading..." :" Sign up"}</button>
      </form>
      <div className='p-5 flex gap-2 font-medium'>
        <p >Already Have an Account ?</p>
        <Link to="/signin">
        <span className='text-green-500 underline font-semibold'>Sign In</span>
        </Link>
        
      </div>
      <p className='text-red-600 ml-4 '>{error ? "Something Went Wrong! Please Try Again":" "}</p>
    </div>
  )
}

export default SignUp
