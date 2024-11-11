import { configureStore } from "@reduxjs/toolkit";
import authReducers from './authSlice'
import formReducers from "./formSlice";
import blogsReducers from "./blogsSlice";
import usersSliceReducers from "./usersSlice";
import userProfileSliceReducers from "./userProfileSlice";
import alertModalSliceReducers from "./alertModalSlice";
import formModalSliceReducers from "./formModalSlice";
import editorSliceReducers from "./editorSlice";

const store = configureStore({
    reducer:{
           auth:authReducers,
           formData:formReducers,
           blogs:blogsReducers,
           users:usersSliceReducers,
           userProfile:userProfileSliceReducers,
           alertModals:alertModalSliceReducers,
           formModals:formModalSliceReducers,
           editor:editorSliceReducers
    }
})
export default store