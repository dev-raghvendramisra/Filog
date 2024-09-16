import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    $id:"",
    userId:"",
    userName:"",
    userAvatar:"",
    following:null,
    followers:[],
    blogs:[],
    userAvatarId:"",
    blogsLiked:[]
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

        updateFollowing:(state,{payload:{type,val}})=>{
             type==="add"?state.following.push(val):state.following=state.following.filter(id=>id!==val)
        },
        updateLikes:(state,{payload:{type,val}})=>{
            type==="like"?state.blogsLiked.push(val):state.blogsLiked=state.blogsLiked.filter(id=>id!==val)
        }

    }
})

export default userProfileSlice.reducer
export const{clearProfile, setProfile, updateFollowing, updateLikes} = userProfileSlice.actions