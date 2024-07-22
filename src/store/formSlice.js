import { createSlice } from "@reduxjs/toolkit";

const initialState={
    name:"",
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
const {setName, setEmail, setPassword, setIsValidate} = formSlice.actions;

export {setName, setEmail, setPassword, setIsValidate} 
export default formSlice.reducer

