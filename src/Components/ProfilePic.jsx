import React from 'react'

function ProfilePic({height='h-10' ,width='w-10', className = ''}) {
  return (
    <div className={`ml-3 overflow-hidden rounded-full ${height} ${width} ${className}`}>
        <img className="h-full  w-full object-cover" src="/meta/android-chrome-192x192.png" alt="profile-pic" />
    </div>
  )
}

export default ProfilePic