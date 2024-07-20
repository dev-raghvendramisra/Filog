import React from 'react'

function ProfilePic({height='h-2vw' ,width='w-2vw', className = ''}) {
  return (
    <div className={`ml-3 overflow-hidden rounded-full ${height} ${width} ${className}`}>
        <img className="h-full  w-full object-cover" src="/meta/android-chrome-192x192.png" alt="profile-pic" />
    </div>
  )
}

export default ProfilePic