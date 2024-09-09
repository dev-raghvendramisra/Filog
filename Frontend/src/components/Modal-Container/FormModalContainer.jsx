import React from 'react'
import { useSelector } from 'react-redux';
import useModalActionsContext from '../../context/modalActionsContext';


function FormModalContainer() {
  const modals = useSelector((state)=>state.formModals);
    const {modalActions, addModalActionHandlers, removeModalActionHandlers} = useModalActionsContext();

    if(modals.length <= 1) return null; 

  return (
    <div>

    </div>
  )
}

export default FormModalContainer