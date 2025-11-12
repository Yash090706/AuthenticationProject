import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { SignInFailure, SignInSuccess } from "../Redux/User/UserSlice";
import axios from "axios";
import { ToastContainer,toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
function OAuth() {
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const google_auth=async()=>{
        try{
            const provider=new GoogleAuthProvider();
            const auth=getAuth(app);
            const result= await signInWithPopup(auth,provider);
            console.log(result)
            const name=result.user.displayName;
            const email=result.user.email;
            const photo=result.user.photoURL;
            axios.post("http://localhost:8000/api/auth/google",{name,email,photo}).then((res)=>{
                console.log(res.data)
                dispatch(SignInSuccess(res.data))
                toast.success("Signed In SuccessFully Via Google.")
                setTimeout(() => {
                    
                    navigate("/")
                }, 1500);
            }).catch((err)=>{
                if(!err.response){
                    dispatch(SignInFailure({message:"Network Error,Try Again Later."}))
                    toast.error("Sign In Failed Via Google")

                }
                else{
                    dispatch(SignInFailure(err.response.data))
                    toast.error("Sign In Failed Via Google")
                }
                
            })
           
        }
        catch(error){
            dispatch(SignInFailure({ message: "Google Authentication Failed" }));
            toast.error("Sign In Failed Via Google.")
            console.log("Google Sign In Failed",error);
        }

    }
  return (
    <button onClick={google_auth}type="button"className="bg-sky-50 rounded-lg p-3 text-red-400 font-medium uppercase flex items-center  justify-center gap-4 hover:opacity-80 hover:cursor-pointer ">
      <FontAwesomeIcon icon={faGoogle} />
      Sign In With Google
    </button>
  );
}

export default OAuth;
