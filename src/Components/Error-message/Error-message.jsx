import React from 'react'

function ErrorMessage({errMsg}) {
  return (
    <div id="errMsg" className="text-0.9vw flex justify-start items-center gap-1 pl-0.5vw text-red-500 mt-0.4vw">
          {errMsg?
           <>
           <span className='fa-regular fa-circle-xmark'>
           </span>
           <span>
            {errMsg}
           </span>
           </>:""}</div>
  )
}

export default ErrorMessage