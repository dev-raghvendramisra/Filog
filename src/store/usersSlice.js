import { createSlice } from "@reduxjs/toolkit";

const initialState =[ {
    profileId:"",
    userId:"",
    userName:"",
    userAvatar:"",
    userAvatarId:"",
    blogs:[]
}]


const usersSlice = createSlice({
    name:"users",
    initialState,
    reducers:{
        setUsers:(state,{payload})=>{
            payload.forEach(user => {
               const newUser = {}
               newUser.userId = user.userId;
               newUser.userName = user.userName;console.log("Yhan thi gadbad")
               newUser.userAvatar = user.userAvatar;
               newUser.profileId = user.$id;
               newUser.userAvatar = user.userAvatar;
               state.push(newUser)
           });
        },

        clearUsers:(state,action)=>{
            for(let i = 0;i<=state.length;i++){
                state.pop()
            }
        }
    }
})

export default usersSlice.reducer

export const{setUsers, clearUsers} = usersSlice.actions