import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isUserLoggedIn:false,
    userData:null,
    isLoginInitiated:false,
    fetching:false
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
        },
        setFetching:(state,action)=>{
                state.fetching=action.payload;
        }
    }
})

export const {login, logout, iniateLoginSequence, setFetching} = authSlice.actions;

export default authSlice.reducer