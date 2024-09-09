import { createSlice } from "@reduxjs/toolkit";

const initialState = [
    {
        id:null,
        heading:null,
        message:null,
        primaryBtnText:null,
        secondaryBtnText:null,
        ctaDisabled:false,   
        ctaLoading:false,
        ctaDanger:false,
        isValidated:false,
        feedbackMessage:{type:null,message:null},
        inputFeildSpecs:[],
        inputFeild_1Value:null,
        inputFeild_2Value:null,
        inputFeild_3Value:null,
        imputFeild_1Error:null,
        imputFeild_2Error:null,
        imputFeild_3Error:null,
    }
]

const formModalSlice = createSlice({
    name:"formModal",
    initialState,
    reducers:{
        setModal:(state,{payload})=>{
            const newModal = {
                id:payload.id,
                heading:payload.heading,
                message:payload.message,
                primaryBtnText:payload.primaryBtnText,
                secondaryBtnText:payload.secondaryBtnText,
                ctaDisabled:payload.ctaDisabled,
                ctaLoading:payload.ctaLoading,
                ctaDanger:payload.ctaDanger,
            }
            state.push(newModal);
        },
        clearModal:(state,{payload})=>{
            return state.filter((modal)=>modal.id !== payload)
        },
        setFeedbackMessage:(state,{payload:{id,feedbackMessage}})=>{
            state.forEach((modal)=>modal.id == id?modal.feedbackMessage = feedbackMessage:null)
        },
        setCtaLoading:(state,{payload:{id,val}})=>{
            state.forEach((modal)=>modal.id == id?modal.ctaLoading = val:null)
        },
        setCtaDisabled:(state,{payload:{id,val}})=>{
            state.forEach((modal)=>modal.id == id?modal.ctaDisabled = val:null)
        },
        setInputFeildSpecs:(state,{payload:{id,inputFeildSpecs}})=>{
            state.forEach((modal)=>modal.id == id?modal.inputFeildSpecs = inputFeildSpecs:null)
        },
        setInputFeild_1Value:(state,{payload:{id,inputFeild_1Value}})=>{
            state.forEach((modal)=>modal.id == id?modal.inputFeild_1Value = inputFeild_1Value:null)
        },
        setInputFeild_2Value:(state,{payload:{id,inputFeild_2Value}})=>{
            state.forEach((modal)=>modal.id == id?modal.inputFeild_2Value = inputFeild_2Value:null)
        },
        setInputFeild_3Value:(state,{payload:{id,inputFeild_3Value}})=>{
            state.forEach((modal)=>modal.id == id?modal.inputFeild_3Value = inputFeild_3Value:null)
        },
        setIsValidate:(state,{payload:{id}})=>{
           state.forEach((modal)=>modal.id == id?modal.isValidated = true:null)
        } 
    }
})


export default formModalSlice.reducer;
export const { 
    setModal, 
    clearModal,
    setCtaLoading, 
    setCtaDisabled,
    setIsValidate,
    setInputFeildSpecs,
    setFeedbackMessage,
    setInputFeild_1Value,
    setInputFeild_2Value,
    setInputFeild_3Value, 
    setInputFeild_1Error, 
    setInputFeild_2Error, 
    setInputFeild_3Error } = formModalSlice.actions;