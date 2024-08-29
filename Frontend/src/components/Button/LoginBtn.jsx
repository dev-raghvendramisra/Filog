import React from 'react'

function LoginBtn({className="",type="",children}) {
  return (
    <button type={type} className={`border-black  ${className}`} >
     {children}
    </button>
  )
}

export default LoginBtn