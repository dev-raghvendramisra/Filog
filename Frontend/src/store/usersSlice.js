import { createSlice } from "@reduxjs/toolkit";

const initialState =[ {
    profileId:"",
    userId:"",
    userName:"",
    fullName:"",
    userAvatar:"",
    userAvatarId:"",
    blogs:[],
    isFilogVerified:null,
}]


const usersSlice = createSlice({
    name:"users",
    initialState,
    reducers:{
        setUsers:(state,{payload})=>{
            payload.forEach(user => {
               const newUser = {}
               newUser.userId = user.userId;
               newUser.userName = user.userName;
                newUser.fullName = user.fullName;
               newUser.userAvatar = user.userAvatar;
               newUser.profileId = user.$id;
               newUser.userAvatar = user.userAvatar;
               newUser.isFilogVerified = user.isFilogVerified;
               state.push(newUser)
           });
        },

        clearUsers:(state,action)=>{
             return []
        }
    }
})

export default usersSlice.reducer

export const{setUsers, clearUsers} = usersSlice.actions