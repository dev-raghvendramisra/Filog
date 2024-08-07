import React from 'react'

function ProfilePic({height='h-2.5vw' ,width='w-2.5vw', src="", className = ''}) {
  const fallbackRef = React.useRef(null)
  return (
    <div className={`ml-1 overflow-hidden rounded-full relative ${height} ${width} ${className}`}>
       <img onLoad={({target})=>{
        fallbackRef.current.classList.add("hidden");
        target.classList.remove("opacity-0","hidden")}} 
        className="h-full opacity-0 hidden  w-full object-cover avatarInAnim rounded-full" src={src} alt="profile-pic" 
        />
       <img ref={fallbackRef} className='h-full w-full absolute object-cover top-0' src="/userPfpFallback.webp" />
    </div>
  )
}

export default ProfilePic

// "https://api.dicebear.com/9.x/micah/svg?scale=100&flip=true&baseColor=f9c9b6&seed=raghav&backgroundColor=194FE6"