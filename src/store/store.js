import { configureStore } from "@reduxjs/toolkit";
import authReducers from './authSlice'
import formReducers from "./formSlice";
import blogsReducers from "./blogsSlice";
import alertSlice from "./alertSlice";

const store = configureStore({
    reducer:{
           auth:authReducers,
           formData:formReducers,
           blogPosts:blogsReducers,
           alerts:alertSlice
    }
})
export default store