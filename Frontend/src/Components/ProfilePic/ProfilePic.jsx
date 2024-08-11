import React from 'react'

function ProfilePic({height='h-2.5vw' ,width='w-2.5vw', src="", className = 'ml-1',...props}) {
  const fallbackRef = React.useRef(null)
  return (
    <div className={`overflow-hidden rounded-full relative ${height} ${width} ${className}`}{...props}>
       <img onLoad={({target})=>{
        fallbackRef.current.classList.add("hidden");
        target.classList.remove("opacity-0","hidden")}} 
        className="h-full opacity-0 hidden  w-full object-cover avatarInAnim rounded-full" src={src} alt="profile-pic" 
        />
       <img ref={fallbackRef} className='h-full w-full absolute object-cover top-0' src="/fallback img/userPfpFallback.webp" />
    </div>
  )
}

export default ProfilePic

