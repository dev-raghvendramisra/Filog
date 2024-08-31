import React from 'react';
import { useDispatch } from 'react-redux';
import { setModal } from '../../store/alertModalSlice';
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
   
  }
}>Open model</button>
    </div>
  )
}

export default Profile



