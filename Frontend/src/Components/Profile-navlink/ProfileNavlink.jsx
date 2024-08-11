import React from 'react'
import { useSelector } from 'react-redux'
import ProfilePic from '../ProfilePic/ProfilePic'


function ProfileNavlink() {
  const {userAvatar} = useSelector(state=>state.userProfile)
  return (
    <ProfilePic src={userAvatar} />
  )
}

export default ProfileNavlink