import React from 'react'

function ErrorMessage({children,className=''}) {
  return (
    <div id="errMsg" className={`text-0.9vw flex justify-start items-center gap-1 pl-0.5vw text-red-500 mt-0.4vw ${className}`}>
          {children?
           <>
           <span className='fa-regular fa-circle-xmark'>
           </span>
           <span className='leading-none'>
            {children}
           </span>
           </>:""}</div>
  )
}

export default ErrorMessage