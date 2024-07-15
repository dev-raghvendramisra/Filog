import React from 'react'

function Logo({height='h-12' ,width='w-16'}) {
  return (
   <div className={`relative ${height} ${width} `}>
         <div className='brandP-Color h-full w-full maskLogo'>
         </div>
   </div>
  )
}

export default Logo