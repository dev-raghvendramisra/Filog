import { configureStore } from "@reduxjs/toolkit";
import authReducers from './authSlice'
import formReducers from "./formSlice";
import blogsReducers from "./blogsSlice";
import usersSliceReducers from "./usersSlice";
import userProfileSliceReducers from "./userProfileSlice";

const store = configureStore({
    reducer:{
           auth:authReducers,
           formData:formReducers,
           blogs:blogsReducers,
           users:usersSliceReducers,
           userProfile:userProfileSliceReducers
    }
})
export default store