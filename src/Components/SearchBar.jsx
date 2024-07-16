import React from 'react'

function Search({placeholder="Tell me what's in your mind ?",className='',handleChange=()=>{},...props}) {
  return (
    <div id='searcbar_wrapper' className='flex justify-center items-center'>
      <input type="text"  className={` bg-gray-100 text-0.5vw p-0.5vw rounded-xl pr-0 rounded-tr-none rounded-br-none outline-none  placeholder:text-1vw  ${className} `} {...props} onChange={handleChange} placeholder={placeholder}/>
      <i style={{fontWeight:"regular", padding:"0.7vw",}} className="fa-solid fa-magnifying-glass rounded-xl text-gray-400 rounded-bl-none rounded-tl-none  bg-gray-100"></i>
      </div>
  )
}

export default Search