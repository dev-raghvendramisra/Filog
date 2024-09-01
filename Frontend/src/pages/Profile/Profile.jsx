import React from 'react';
import { authServices } from '../../services';
import { useDispatch } from 'react-redux';


function Profile() {
  const dispatch = useDispatch()

  return (
    <div className='pt-20p flex gap-20' >
     UserProfile
     <button onClick={()=>{
        authServices.logout()
     }}>Logout</button>
    </div>
  )
}

export default Profile



