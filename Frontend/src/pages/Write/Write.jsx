import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { WorkInProgress } from '../../components';

function Write() {
  const { isUserLoggedIn } = useSelector((state) => state.auth);

  if (!isUserLoggedIn) {
    return <Navigate to="/login" />;
  }

  return (
    <div><WorkInProgress /></div>
  )
}

export default Write