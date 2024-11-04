import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    $id:"",
    userId:"",
    userName:"",
    fullName:"",
    userAvatar:"",
    following:null,
    followers:[],
    notifications:[],
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
        },
        updateAvatar:(state,{payload:{url,id}})=>{
            state.userAvatar = url
            state.userAvatarId = id
        },
        readNotification:(state,{payload:{type,notificationId,userId}})=>{
            if(type==="gen"){
                state.notifications = state.notifications.map(notification=>notification.$id===notificationId?{...notification,readBy:[...notification.readBy,userId]}:notification)
                const idx = state.notifications.findIndex(notification=>notification.$id===notificationId)
                const [readNotification] = state.notifications.splice(idx,1)
                state.notifications = [...state.notifications,readNotification]
            }
            if(type==="user"){
                state.notifications = state.notifications.map(notification=>notification.$id===notificationId?{...notification,readAt:new Date().getTime()}:notification)
                const idx = state.notifications.findIndex(notification=>notification.$id===notificationId)
                const [readNotification] = state.notifications.splice(idx,1)
                state.notifications = [...state.notifications,readNotification]
            }
        },
        removeNotification:(state,{payload})=>{
            state.notifications = state.notifications.filter(notification=>notification.$id!==payload)
        }

    }
})

export default userProfileSlice.reducer
export const{clearProfile, setProfile, updateFollowing, updateLikes,updateAvatar, readNotification, removeNotification } = userProfileSlice.actions