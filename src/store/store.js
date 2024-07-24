import { configureStore } from "@reduxjs/toolkit";
import authReducers from './authSlice'
import formReducers from "./formSlice";

const store = configureStore({
    reducer:{
           auth:authReducers,
           formData:formReducers
    }
})
export default store