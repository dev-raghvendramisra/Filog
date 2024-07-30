import React from 'react'
import { authServices } from '../../backend-services';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';

function UserProfile() {
  const{userData } = useSelector((state) => state.auth);
  return (
    <div>UserProfile
      // <button
  onClick={() => {
    authServices.logout();
    toast(`Bye, ${userData.name}`, {
      icon: '👋',
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      },
    });
  }}
>
  logout
</button>
    </div>
  )
}

export default UserProfile