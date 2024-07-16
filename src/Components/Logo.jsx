import React from 'react'

function Logo({className='h-100p w-100p'}) {
  return (
   <div className={`relative ${className} `}>
         <div className='brandP-Color dark:brandS-Color h-full w-full maskLogo'>
         </div>
   </div>
  )
}

export default Logo