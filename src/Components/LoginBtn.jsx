import React from 'react'

function LoginBtn({className="",type="",children}) {
  return (
    <button type={type} className={`border-black border-1 ${className}`} >
     {children}
    </button>
  )
}

export default LoginBtn