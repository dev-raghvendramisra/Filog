import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    $id:"",
    userId:"",
    userName:"",
    userAvatar:"",
    following:[],
    followers:[],
    blogs:[],
    userAvatarId:"",
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
        },

        updateFollowing:(state,{payload})=>{
            state.following=payload;
        }

    }
})

export default userProfileSlice.reducer
export const{clearProfile, setProfile, updateFollowing} = userProfileSlice.actions