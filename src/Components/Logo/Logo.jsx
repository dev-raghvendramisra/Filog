import React from 'react'

function Logo({className='h-2vw w-6vw'}) {
  return (
   <div className={`relative ${className} `}>
         <div className='brandP-Color dark:brandS-Color transition-all h-full w-full maskLogo'>
         </div>
   </div>
  )
}

export default Logo