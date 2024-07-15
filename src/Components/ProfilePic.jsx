import React from 'react'

function ProfilePic({height='h-6' ,width='w-6', className = ''}) {
  return (
    <div className={` overflow-hidden rounded-full ${height} ${width} ${className}`}>
        <img className="h-full  w-full object-cover" src="/meta/android-chrome-192x192.png" alt="profile-pic" />
    </div>
  )
}

export default ProfilePic