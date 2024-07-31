import React from 'react'
import { authServices } from '../../backend-services';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';

function UserProfile() {
  const{userData } = useSelector((state) => state.auth);
  return (
    <div className='pt-20p'>UserProfile
      // <button
  onClick={async() => {
   await authServices.logout();
    toast(`Bye, ${userData.name}`, {
      icon: '👋',
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      },
    });
    location.reload()}
  }
>
  logout
</button>
    </div>
  )
}

export default UserProfile