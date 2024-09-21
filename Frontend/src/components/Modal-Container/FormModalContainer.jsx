import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import useModalActionsContext from '../../context/modalActionsContext';
import {setInputFeild_1Error, setInputFeild_1Value, setInputFeild_2Value, setInputFeild_2Error, setInputFeild_3Value, setInputFeild_3Error, setFeedbackMessage } from '../../store/formModalSlice'
import {FormModal} from '../../components'
import useFileObjectContext from '../../context/fileObjectContext';


function FormModalContainer() {
  const modals = useSelector((state)=>state.formModals);
  const {modalActions} = useModalActionsContext();
  const {setFileObject} = useFileObjectContext()
  const dispatch = useDispatch()
  
  const onChange = [
    (id,val)=>{
      dispatch(setInputFeild_1Error({id,val:null}))
      dispatch(setInputFeild_1Value({id,val}))
      dispatch(setFeedbackMessage({id,type:null,message:null}))
    },
    (id,val)=>{
      dispatch(setInputFeild_2Error({id,val:null}))
      dispatch(setInputFeild_2Value({id,val}))
      dispatch(setFeedbackMessage({id,type:null,message:null}))
    },
    (id,val)=>{
      dispatch(setInputFeild_3Error({id,val:null}))
      dispatch(setInputFeild_3Value({id,val}))
      dispatch(setFeedbackMessage({id,type:null,message:null}))
    }
  ]

   const setFile = (id,val)=>{
    setFileObject(val)
    dispatch(setFeedbackMessage({id,type:null,message:null}))
   }
   

    if(modals.length <= 1) return null; 


  return (
    <div className=' flex items-center justify-center h-full w-full bg-black bg-opacity-70 dark:bg-opacity-80 fixed' style={{ zIndex: "60" }}>
        {modals.map((modal, idx) => {
          if (!modalActions[modal.id]?.primaryOnClick) return null;
            return (
                <FormModal modalId={modal.id} 
                key={modal.id}
                inputFeildSpecs={modal.inputFeildSpecs}
                primaryBtnText={modal.primaryBtnText}
                iconClass={modal.iconClass}
                secondaryBtnText={modal.secondaryBtnText} 
                heading={modal.heading} 
                inputFeild_1Value={modal.inputFeild_1Value} 
                inputFeild_2Value={modal.inputFeild_2Value} 
                inputFeild_3Value={modal.inputFeild_3Value} 
                feedbackMessage={modal.feedbackMessage}
                ctaLoading={modal.ctaLoading}
                imputFeild_1Error={modal.inputFeild_1Error}
                imputFeild_2Error={modal.inputFeild_2Error}
                imputFeild_3Error={modal.inputFeild_3Error}
                ctaDanger={modal.ctaDanger}
                message={modal.message}
                ctaDisabled={modal.ctaDisabled}
                charLimitForTextArea={modal.charLimitForTextArea}
                onChange={onChange} 
                primaryHandler={modalActions[modal.id].primaryOnClick}
                secondaryHandler={modalActions[modal.id].secondaryOnClick}
                setFile={setFile}
                />
            )})}
                
    </div>
  )
}

export default FormModalContainer
