import React from 'react'

function FeedbackMessage({children,className='pl-0.5vw',err=true,iconType="regular",...props}) {
  const icon = iconType==="regular"?"fa-regular":"fa-solid"
  return (
    <div id="errMsg" className={`text-0.9vw font-medium flex justify-start items-center gap-1  ${err?"text-red-500":" text-green-500"} mt-0.4vw ${className}`}{...props}>
          {children?
           <>
           <span className={`${err?`${icon} fa-circle-xmark`:`${icon} fa-circle-check`}`}>
           </span>
           <span className='leading-none'>
            {children}
           </span>
           </>:""}</div>
  )
}

export default FeedbackMessage