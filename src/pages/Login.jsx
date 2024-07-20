import React from 'react'
import { Input } from '../Components'

function Login() {

  const [value, setValue] = React.useState("")
  
  function onValChange({target}){
    setValue(target.value)
  }

  return (
    <div className='flex justify-center flex-col items-center mt-10vh'>
      Login
      <Input  className_container='mt-1vw' type="password" value={value} placeholder='Enter your password' onChange={onValChange} />
      <Input  className_container='mt-1vw' type="name" value={value} placeholder='John Doe' onChange={onValChange} />
      <Input className_container='mt-1vw'  type="email" value={value} placeholder='xyz@example.com' onChange={onValChange} />
      <Input className_container='mt-1vw'  type="email" value={value} placeholder='xyz@example.com' onChange={onValChange} />
      <Input className_container='mt-1vw'  type="email" value={value} placeholder='xyz@example.com' onChange={onValChange} />
      <Input className_container='mt-1vw'  type="email" value={value} placeholder='xyz@example.com' onChange={onValChange} />
      <Input  className_container='mt-1vw' type="name" value={value} placeholder='John Doe' onChange={onValChange} />
      <Input className_container='mt-1vw'  type="email" value={value} placeholder='xyz@example.com' onChange={onValChange} />
      <Input className_container='mt-1vw'  type="email" value={value} placeholder='xyz@example.com' onChange={onValChange} />
      <Input className_container='mt-1vw'  type="email" value={value} placeholder='xyz@example.com' onChange={onValChange} />
      <Input className_container='mt-1vw'  type="email" value={value} placeholder='xyz@example.com' onChange={onValChange} />
      <Input  className_container='mt-1vw' type="name" value={value} placeholder='John Doe' onChange={onValChange} />
      <Input className_container='mt-1vw'  type="email" value={value} placeholder='xyz@example.com' onChange={onValChange} />
      <Input className_container='mt-1vw'  type="email" value={value} placeholder='xyz@example.com' onChange={onValChange} />
      <Input className_container='mt-1vw'  type="email" value={value} placeholder='xyz@example.com' onChange={onValChange} />
      <Input className_container='mt-1vw'  type="email" value={value} placeholder='xyz@example.com' onChange={onValChange} />
    </div>

  )
}

export default Login