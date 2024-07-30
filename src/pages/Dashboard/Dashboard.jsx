import React from 'react';
import { Navigate } from 'react-router-dom';
import { authServices } from '../../backend-services';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';

function Dashboard() {
  const { isUserLoggedIn, userData } = useSelector((state) => state.auth);

  if (!isUserLoggedIn) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      Dashboard
      <button
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
  );
}

export default Dashboard;
