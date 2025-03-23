import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isUserLoggedIn:false,
    userData:null,
    isLoginInitiated:false,
    fetching:true,
    silentFetching:false,
    isUserAdmin:null
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
            
        },
        setFetching:(state,action)=>{
                state.fetching=action.payload;
        },
        setSlientFetching:(state,action)=>{
            state.silentFetching=action.payload;
        },
        setIsAdmin:(state,{payload})=>{
            state.isUserAdmin = payload
        }

    }
})

export const {login, logout, iniateLoginSequence, setFetching, setIsAdmin} = authSlice.actions;

export default authSlice.reducer