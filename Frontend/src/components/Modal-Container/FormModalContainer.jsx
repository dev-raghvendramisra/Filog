import React from 'react'
import { useSelector } from 'react-redux';
import useModalActionsContext from '../../context/modalActionsContext';
import { ID } from 'appwrite';
import {FormModal} from '../../components'


function FormModalContainer() {
  const modals = useSelector((state)=>state.formModals);
    const {modalActions, addModalActionHandlers, removeModalActionHandlers} = useModalActionsContext();
    const [val1, setVal1] = React.useState("")
 const [val2, setVal2] = React.useState("")
 const [val3, setVal3] = React.useState("")



 const inputFeildSpecs=[
  {
    type:"Add your comment",
    text_area:true,
  }]

    // if(modals.length <= 1) return null; 

  return (
    <div className=' flex items-center justify-center h-100vh w-full bg-black bg-opacity-70 dark:bg-opacity-80 fixed' style={{ zIndex: "60" }}>
        {modals.map((modal, index) => {
            return (
                <FormModal modalId={ID.unique()} 
                inputFeildSpecs={inputFeildSpecs}
                primaryBtnText="Comment" 
                iconClass='fa regular fa-comments' 
                secondaryBtnText="Cancel" heading="Comment on " 
                inputFeild_1Value={val1} 
                inputFeild_2Value={val2} 
                inputFeild_3Value={val3} 
                ctaDanger={false}
                message="Be clear, kind, and stay on topic with your feedback."
                ctaDisabled={false}
                charLimit={500}
                onChange_1={({target})=>setVal1(target.value)}
                onChange_2={({target})=>setVal2(target.value)}
                onChange_3={({target})=>setVal3(target.value)} />
            )})}
                
    </div>
  )
}

export default FormModalContainer