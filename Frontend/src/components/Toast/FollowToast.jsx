import React from 'react'
import ProfilePic from '../ProfilePic/ProfilePic'
import { ID } from 'appwrite'

function FollowToast({following, avatar, children, imgH='h-2.7vw' ,imgW='w-2.7vw', classNamePic = '', classNameContainer = '', classNameTextWrapper=''}) {
  return (
    <div id={`toast-${ID.unique()}`} 
    className={`flex gap-4 p-0.5vw pl-1vw pr-1vw rounded-xl bg-white dark:bg-toastDarkModeBg  drop-shadow-xl w-fit items-center justify-center alertAnim ${classNameContainer}`}>

      <ProfilePic src={avatar} height={imgH} width={imgW} className={`ml-0 ${classNamePic}`} id={`userAvatar-${children}-${ID.unique()}`}/>
      <div id="text-wrapper" className={`leading-1.6vw ${classNameTextWrapper}`}>
        <p id="user-name" className='text-1.1vw'>{children}</p>
        <p id="toast-message" className='text-1vw text-footer_text_light dark:text-footer_text'>
          {following?"You started following":"You just unfollowed"}
        </p>
      </div>
    </div>
  )
}

export default FollowToast