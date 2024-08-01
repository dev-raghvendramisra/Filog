import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userId:"",
    userName:"",
    userAvatar:"",
    following:[],
    followers:[],
}

const userProfileSlice = createSlice({
    name:"userProfile",
    initialState,
    reducers:{
        clearProfile:(state,action)=>{
            for(let key in state){
              Array.isArray(state[key])?state[key]=[]: state[key] = ""
            }
        },
        setProfile:(state,{payload})=>{
            for(let key in state){
                state[key]=payload[key]
            }
        }

    }
})

export default userProfileSlice.reducer
export const{clearProfile, setProfile} = userProfileSlice.actions