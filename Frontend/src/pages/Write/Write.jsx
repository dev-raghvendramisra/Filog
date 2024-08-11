import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

function Write() {
  const { isUserLoggedIn } = useSelector((state) => state.auth);

  if (!isUserLoggedIn) {
    return <Navigate to="/login" />;
  }

  return (
    <div>Write</div>
  )
}

export default Write