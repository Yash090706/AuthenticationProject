import axios from "axios";
import React from "react";
import { useState } from "react";
import { Link,useNavigate} from "react-router-dom";
import { ToastContainer,toast} from "react-toastify";
import { SignInFailure,SignInStart,SignInSuccess } from "../Redux/User/UserSlice";
import {useDispatch} from "react-redux";
import { useSelector } from "react-redux";
import OAuth from "../Components/OAuth";
// import {user} from "../Redux/User/UserSlice";
const SignIn = () => {
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const{loading,error}=useSelector((state)=>state.user)
  console.log(error);
  // const [loading, setloading] = useState(false);
  // const [error, seterror] = useState(false);
  const [formdata, setformdata] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const oldata = { ...formdata };
    const id = e.target.id;
    const value = e.target.value;
    oldata[id] = value;
    setformdata(oldata);
    console.log(formdata);
  };
  const handleSubmit=(e)=>{
    e.preventDefault();
    dispatch(SignInStart());
    axios.post("http://localhost:8000/api/auth/signin",formdata).then((res)=>{
      toast.success("Signed In SuccessFully.");
      dispatch(SignInSuccess(res.data));
      setformdata({
        email:"",
        password:""
      })
      setTimeout(()=>{
        navigate("/");
      },1500)
    
      console.log(res.data);
    }).catch((err)=>{
      if(!err.response){
        dispatch(SignInFailure({message:"Network Error. Please Try Again Later"}));
        toast.error("Sign In Failed");
      }
      else{
      dispatch(SignInFailure(err.response.data));
      toast.error("Sign In Failed");
      // console.log(error.message);
      }
    })

  }

  return (
    <div className="bg-blue-200 h-[500px] w-[500px] m-auto rounded-3xl shadow-xl mt-20">
      <ToastContainer/>
      <h1 className="font-bold text-center m-7 p-3 text-4xl">Sign In</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          id="email"
          value={formdata.email}
          className="p-3 border-gray-300 rounded-lg bg-slate-200"
          onChange={handleChange}
        ></input>
        <input
          type="password"
          placeholder="Password"
          id="password"
          value={formdata.password}
          className="p-3 border-gray-300 rounded-lg bg-slate-200"
          onChange={handleChange}
        ></input>
        <button disabled={loading} type="submit" className="bg-blue-500 p-3 rounded-lg uppercase text-white hover:opacity-70 hover:cursor-pointer hover:bg-green-400">
          {loading ? "Loading...":"Sign In"}
        </button>
        <OAuth/>
      </form>
      <div className="flex gap-2 p-5 font-medium">
        <p>Dont Have An Account ?</p>
        <Link to="/signup">
          <span className="text-red-500 underline">Sign Up</span>
        </Link>
      </div>
      <p className="text-red-500 ml-3">{error ? error.message || "Something Went Wrong! Please Try Again":""}</p>
    </div>
  );
};

export default SignIn;
