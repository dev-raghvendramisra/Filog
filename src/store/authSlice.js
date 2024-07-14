import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isUserLoggedIn:false,
    userData:null,
    isLoginInitiated:false
}

const authSlice = createSlice({
    name:"auth",
    initialState,
  
    reducers:{
        login:(state,action)=>{
            state.isUserLoggedIn = true;
            state.userData = action.payload;
        },

        logout:(state)=>{
             state.isUserLoggedIn = false;
             state.userData = null
        },
        iniateLoginSequence:(state)=>{
            state.isLoginInitiated=!state.isLoginInitiated
            console.log(state.isLoginInitiated)
        }
    }
})

export const {login, logout, iniateLoginSequence} = authSlice.actions;

export default authSlice.reducer