import React from 'react'

function Search({placeholder="Tell me what's in your mind ?",className='',handleChange}) {
  return (
    <div>
      <input type="text" className={` bg-gray-100  p-3 rounded-xl outline-none ${className}`} onChange={handleChange} placeholder={placeholder}/>
    </div>
  )
}

export default Search