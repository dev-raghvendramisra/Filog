import React from 'react'
import { useSelector } from 'react-redux'

function ProfilePic({height='h-2.5vw' ,width='w-2.5vw', className = ''}) {
  const {userAvatar} = useSelector((state)=>state.userProfile)

  return (
    <div className={`ml-1 overflow-hidden rounded-full ${height} ${width} ${className}`}>
      { userAvatar? <img className="h-full  w-full object-cover avatarInAnim rounded-full" src={userAvatar} alt="profile-pic" />:null}
    </div>
  )
}

export default ProfilePic

// "https://api.dicebear.com/9.x/micah/svg?scale=100&flip=true&baseColor=f9c9b6&seed=raghav&backgroundColor=194FE6"