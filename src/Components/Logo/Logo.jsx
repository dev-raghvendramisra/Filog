import React from 'react'

function Logo({className='h-2vw w-6vw',navLogoStyling='',logoClass='maskLogoNav',footerLogoStylings=false}) {
  return (
   <div className={`relative ${className} `}>
         <div className={` transition-all h-full w-full ${navLogoStyling} ${logoClass} ${footerLogoStylings}`}>
         </div>
   </div>
  )
}

export default Logo