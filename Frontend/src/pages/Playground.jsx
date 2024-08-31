import React from 'react'
import { useNavigate } from 'react-router-dom'

function Playground() {
    
  const navigate=useNavigate()

  return (
    <div className='h-100vh w-100vw flex flex-col justify-start items-center'>
        <h1 className='text-3xl mt-20vh'>Playground</h1>
        <p className='text-1xl'>This is a test route</p>
        {/* <button onClick={()=>navigate("/home")}>navigate</button> */}
    </div>
  )
}

export default Playground