import { createSlice } from "@reduxjs/toolkit";

const initialState = [
    {
       id:null,
       message:null,
       feedback:null,
       ctaDisabled:false,
       ctaDanger:false,
       secondaryOnClick:()=>{},
       primaryOnClick:()=>{}
    }
];

const modalSlice = createSlice({
    initialState,
    name:"modals",
    reducers:{
        setModal:(state,action)=>{
          const newModal = {
            id:action.payload.id,
            message:action.payload.message,
            feedback:action.payload.feedback,
            secondaryOnClick:action.payload.secondaryOnClick,
            primaryOnClick:action.payload.primaryOnClick
          }
          state.push(newModal)
        },
        clearModal:(state,action)=>{
          state.pop()
        }
    }
})

export default modalSlice.reducer
export const {setModal,clearModal} = modalSlice.actions 