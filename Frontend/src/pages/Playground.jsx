import React from 'react'
import { authServices } from '../services'
function Playground() {


  return (
    <div className='h-100vh w-100vw flex flex-col justify-start items-center'>
        <h1 className='text-3xl mt-20vh'>Playground</h1>
        <p className='text-1xl'>This is a test route</p>
        <button onClick={()=>{
        authServices.logout()
     }}>Logout</button>
    </div>
  )
}

export default Playground