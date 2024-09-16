import { setModal } from "../store/formModalSlice";

export default function getFormModal({
    modalId,
    heading,
    message,
    primaryBtnText,
    secondaryBtnText,
    ctaDanger,
    iconClass,
    charLimitForTextArea,
    inputFeildSpecs,
    addModalActionHandlers,
    primaryOnClick,
    secondaryOnClick,
    dispatch,
}){
    const actionHandlers = {
        [modalId]: {
            primaryOnClick,
            secondaryOnClick
        }
    }
    
    addModalActionHandlers(actionHandlers)
    dispatch(setModal({
        id:modalId,
        heading,
        message,
        primaryBtnText,
        secondaryBtnText,
        ctaDisabled:false,   
        ctaLoading:false,
        ctaDanger,
        isValidated:false,
        iconClass,
        charLimitForTextArea,
        inputFeildSpecs,
        feedbackMessage:{type:null,message:null},
        inputFeild_1Value:"",
        inputFeild_2Value:"",
        inputFeild_3Value:"",
        inputFeild_1Error:null,
        inputFeild_2Error:null,
        inputFeild_3Error:null,
    }))

}