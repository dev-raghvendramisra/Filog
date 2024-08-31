import React from 'react';
import { authServices } from '../../services';

function Profile() {

  return (
    <div className='pt-20p' >
     UserProfile
     <button onClick={authServices.logout}>Logout</button>
    </div>
  )
}

export default Profile



