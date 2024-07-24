import { createSlice } from "@reduxjs/toolkit";

const initialState={
    name:"",
    email:"",
    password:"",
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
        }
    }
})
const {setName, setEmail, setPassword} = formSlice.actions;

export {setName, setEmail, setPassword} 
export default formSlice.reducer

