import { createSlice } from "@reduxjs/toolkit";

const initialState={
    name:"",
    userName:"",
    email:"",
    password:"",
    isValidated:false
}


const formSlice = createSlice({
    name:"formData",
    initialState:initialState,
    reducers:{
        setName:(state,action)=>{
            state.name = action.payload
        },
        setUserName:(state,action)=>{
            state.userName = action.payload
        },
        setEmail:(state,action)=>{
            state.email = action.payload
        } ,
        setPassword:(state,action)=>{
            state.password = action.payload
        },
        setIsValidate:(state,action)=>{
             state.isValidated=action.payload;
        }
    }
})
export const {setName, setEmail, setPassword, setIsValidate, setUserName} = formSlice.actions;

export default formSlice.reducer

