import { configureStore } from "@reduxjs/toolkit";
import authReducers from './authSlice'
import formReducers from "./formSlice";
import blogsReducers from "./blogsSlice";
import usersSliceReducers from "./usersSlice";
import userProfileSliceReducers from "./userProfileSlice";
import modalSliceReducers from "./modalSlice";

const store = configureStore({
    reducer:{
           auth:authReducers,
           formData:formReducers,
           blogs:blogsReducers,
           users:usersSliceReducers,
           userProfile:userProfileSliceReducers,
           modals:modalSliceReducers
    }
})
export default store