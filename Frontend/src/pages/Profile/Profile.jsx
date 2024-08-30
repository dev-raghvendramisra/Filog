import React from 'react';
import { useDispatch } from 'react-redux';
import { setModal } from '../../store/alertModalSlice';
import useAlertModalActionsContext from '../../context/alertModalActionsContext'
import { ID } from 'appwrite';

function Profile() {
  const dispatch = useDispatch();
  const {addModalActionHandlers, clearModalActionHandlers}  = useAlertModalActionsContext();
  const actionId = ID.unique();
  const actionId2 = ID.unique();
  const newAction = {[actionId] : {
    primaryOnClick: () => {
      console.log("Primary Clicked");
    },
    secondaryOnClick: () => {
      console.log("Secondary Clicked");
    }
  }};
  const newAction2 = {[actionId2] : {
    primaryOnClick: () => {
      console.log("Primary Clicked");
    },
    secondaryOnClick: () => {
      console.log("Secondary Clicked");
    }
  }};
  return (
    <div className='pt-20p'>UserProfile

  <button onClick={()=>{
    addModalActionHandlers(newAction2)
    dispatch(setModal({
      heading: 'Success',
      message: 'Your operation was successful!',
      feedbackMessage: {type:"success",message:'Everything went smoothly.'},
      ctaDisabled: false,
      ctaDanger: false,
      primaryBtnText: 'OK',
      secondaryBtnText: 'Cancel',
      id:actionId
    }))
    addModalActionHandlers(newAction)
    dispatch(setModal({
      heading: 'Success',
      message: 'Your operation was successful!',
      feedbackMessage: {type:"err",message:'Everything fucked up'},
      ctaDisabled: false,
      ctaDanger: false,
      primaryBtnText: 'OK',
      secondaryBtnText: 'Cancel',
      id:actionId2
    }))
  }
}>Open model</button>
    </div>
  )
}

export default Profile



