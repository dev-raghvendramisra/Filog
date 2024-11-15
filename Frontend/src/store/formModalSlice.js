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
        iconClass:null,
        charLimitForTextArea:null,
        inputFeildSpecs:[],
        feedbackMessage:{type:null,message:null},
        inputFeild_1Value:"",
        inputFeild_2Value:"",
        inputFeild_3Value:"",
        inputFeild_FileValue:null,
        inputFeild_1Error:null,
        inputFeild_2Error:null,
        inputFeild_3Error:null,
    }
]

const formModalSlice = createSlice({
    name:"formModal",
    initialState,
    reducers:{
        setModal:(state,{payload})=>{
           state.push(payload)
        },
        clearModal:(state,{payload})=>{
            return state.filter((modal)=>modal.id !== payload)
        },
        setPrimaryBtnText:(state,{payload:{id,text}})=>{
            state.forEach((modal)=>modal.id == id?modal.primaryBtnText = text:null)
        },
        setFeedbackMessage:(state,{payload:{id,feedbackMessage,type}})=>{
            state.forEach((modal)=>{
                if(modal.id == id){
                    modal.feedbackMessage.message = feedbackMessage
                    modal.feedbackMessage.type = type
                }
            })
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
        setInputFeild_1Value:(state,{payload:{id,val}})=>{
            state.forEach((modal)=>modal.id == id?modal.inputFeild_1Value = val:null)
        },
        setInputFeild_2Value:(state,{payload:{id,val}})=>{
            state.forEach((modal)=>modal.id == id?modal.inputFeild_2Value = val:null)
        },
        setInputFeild_3Value:(state,{payload:{id,val}})=>{
            state.forEach((modal)=>modal.id == id?modal.inputFeild_3Value = val:null)
        },
        setInputFeild_FileValue:(state,{payload:{id,val}})=>{
            state.forEach((modal)=>modal.id == id?modal.inputFeild_FileValue = val:null)
        },
        setInputFeild_1Error:(state,{payload:{id,val}})=>{
            state.forEach((modal)=>modal.id == id?modal.inputFeild_1Error = val:null)
        },
        setInputFeild_2Error:(state,{payload:{id,val}})=>{
            state.forEach((modal)=>modal.id == id?modal.inputFeild_2Error = val:null)
        },
        setInputFeild_3Error:(state,{payload:{id,val}})=>{
            state.forEach((modal)=>modal.id == id?modal.inputFeild_3Error = val:null)
        },
        setIsValidate:(state,{payload:{id}})=>{
           state.forEach((modal)=>modal.id == id?modal.isValidated = true:null)
        },
        setProcessingFile:(state,{payload:{id,val,text}})=>{
            state.forEach((modal)=>modal.id == id?modal.ctaDisabled = val:null)
            state.forEach((modal)=>modal.id == id?modal.ctaLoading = val:null)
            state.forEach((modal)=>modal.id == id?modal.primaryBtnText = text:"Upload Image")
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
    setInputFeild_FileValue, 
    setInputFeild_1Error, 
    setInputFeild_2Error, 
    setInputFeild_3Error,
    setPrimaryBtnText,
    setProcessingFile } = formModalSlice.actions;