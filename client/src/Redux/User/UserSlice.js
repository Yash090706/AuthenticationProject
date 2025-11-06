import {createSlice} from "@reduxjs/toolkit";

const initialState={
    user:null,
    loading:false,
    error:false
}

const UserSlice=createSlice({
    name:"user",
    initialState,
    reducers:{
        SignInStart:(state)=>{
            state.loading=true;
        },
        SignInSuccess:(state,action)=>{
            state.loading=false;
            state.user=action.payload;
            state.error=false;

        },
        SignInFailure:(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        }
    }
})

export const {SignInStart,SignInSuccess,SignInFailure}=UserSlice.actions;

export default UserSlice.reducer;