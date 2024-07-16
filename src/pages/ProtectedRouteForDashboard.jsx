import React from 'react'
import { Outlet } from 'react-router-dom'

function ProtectedRouteForDashboard() {
  return (
    <div>ProtectedRouteForDashboard
        <Outlet />
    </div>
  )
}

export default ProtectedRouteForDashboard