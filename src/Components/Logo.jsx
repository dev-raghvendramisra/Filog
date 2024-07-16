import React from 'react'

function Logo({className='h-16 w-20'}) {
  return (
   <div className={`relative ${className} `}>
         <div className='brandP-Color dark:brandS-Color h-full w-full maskLogo'>
         </div>
   </div>
  )
}

export default Logo