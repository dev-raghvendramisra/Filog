import React from 'react'
import { Input } from '../../Components'

function Login() {

  const [value, setValue] = React.useState("")
  
  function onValChange({target}){
    setValue(target.value)
  }

  return (
    <div className='flex justify-center flex-col items-center mt-10vh'>
      Login
      <Input fill={true} className_container='mt-1vw' type="password" value={value} placeholder='Enter your password' onChange={onValChange} errMsg='enter correct password' />
    </div>

  )
}

export default Login