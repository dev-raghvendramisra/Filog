import React from 'react'
import {Outlet} from 'react-router-dom'
function ProtectedRouteForWrite() {
  return (
    <div>ProtectedRouteForWrite
        <Outlet />
    </div>
  )
}

export default ProtectedRouteForWrite