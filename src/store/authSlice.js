import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isUserLoggedIn:false,
    userData:null
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
        }
    }
})

export const {login, logout} = authSlice.actions;

export default authSlice.reducer