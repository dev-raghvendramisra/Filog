import { createSlice } from "@reduxjs/toolkit";

const initialState = [
    {
       id:null,
       message:null,
       heading:null,
       feedbackMessage:{type:null,message:null},
       ctaDisabled:false,
       ctaDanger:false,
       primaryBtnText:null,
       secondaryBtnText:null
    }
];

const alertModalSlice = createSlice({
    initialState,
    name:"alertModals",
    reducers:{
        setModal:(state,action)=>{
          const newModal = {
            id:action.payload.id,
            message:action.payload.message,
            heading:action.payload.heading,
            ctaDisabled:action.payload.ctaDisabled,
            ctaDanger:action.payload.ctaDanger,
            feedbackMessage:action.payload.feedbackMessage,
            primaryBtnText:action.payload.primaryBtnText,
            secondaryBtnText:action.payload.secondaryBtnText

          }
          state.push(newModal)
        },
        clearModal:(state,action)=>{
          state.pop()
        }
    }
})

export default alertModalSlice.reducer
export const {setModal,clearModal} = alertModalSlice.actions 