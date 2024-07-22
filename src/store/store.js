import { configureStore } from "@reduxjs/toolkit";
import authReducers from './authSlice'
import formReducers from "./formSlice";
import blogsReducers from "./blogsSlice";

const store = configureStore({
    reducer:{
           auth:authReducers,
           formData:formReducers,
           blogPosts:blogsReducers
    }
})
export default store