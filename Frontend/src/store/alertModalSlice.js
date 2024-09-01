import { createSlice } from "@reduxjs/toolkit";

const initialState = [
    {
       id: null,
       message: null,
       heading: null,
       feedbackMessage: { type: null, message: null },
       ctaDisabled: false,
       ctaDanger: false,
       ctaLoading: false,
       primaryBtnText: null,
       secondaryBtnText: null,
    }
];

const alertModalSlice = createSlice({
    name: "alertModals",
    initialState,
    reducers: {
        setModal: (state, {payload}) => {
            // Create a new modal with the provided payload
            const newModal = {
                id: payload.id,
                message: payload.message,
                heading: payload.heading,
                ctaDisabled: payload.ctaDisabled,
                ctaDanger: payload.ctaDanger,
                feedbackMessage: payload.feedbackMessage,
                primaryBtnText: payload.primaryBtnText,
                secondaryBtnText: payload.secondaryBtnText,
                ctaLoading: payload.ctaLoading,
            };
            // Add the new modal to the state
            state.push(newModal);
        },
        clearModal: (state, { payload }) =>{
            // Remove the modal with the specified id
            return state.filter((modal) => modal.id !== payload);
        },
        setFeedbackMessage:(state,{payload:{id,feedbackMessage}}) =>{
          state.forEach((modal) => modal.id == id?modal.feedbackMessage = feedbackMessage:null)
        },
        setCtaLoading:(state,{payload:{id,val}}) =>{
          state.forEach((modal) => modal.id == id?modal.ctaLoading = val:null)
        },
        setCtaDisabled:(state,{payload:{id,val}}) =>{
          state.forEach((modal) => modal.id == id?modal.ctaDisabled = val:null)
        }
   }});

export default alertModalSlice.reducer;
export const { setModal, clearModal,setCtaDisabled,setCtaLoading,setFeedbackMessage } = alertModalSlice.actions;
