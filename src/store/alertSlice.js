import { createSlice } from "@reduxjs/toolkit";
import { ID } from "appwrite";

const intialState = [
  { 
   message : "",
   type : "",
   id:null
  }
]


const alertSlice = createSlice({
    name:"alerts",
    initialState:intialState,
    reducers:{
       clearAlerts:(state,action)=>{
            const defaultState = {
                message:"",
                type:"",
                id:null
            }
            state.forEach((alert)=>state.pop())
       },
        setAlert:(state,action)=>{
          const newAlert = {
              message : action.payload.message,
              type : action.payload.type,
              id : ID.unique()
            }
            state.push(newAlert)
        },
    }
})

export default alertSlice.reducer;

export const{setAlert,clearAlerts} = alertSlice.actions;