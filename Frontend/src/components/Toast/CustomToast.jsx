import React from 'react'
import ProfilePic from '../ProfilePic/ProfilePic'
import { ID } from 'appwrite'

function CustomToast({secondaryText, img, children, imgH='h-2.7vw' ,imgW='w-2.7vw',roundedPic, classNamePic = '', classNameContainer = '', classNameTextWrapper=''}) {
   const uniqueId = ID.unique()
  return (
    <div id={`toast-${uniqueId}`} 
    className={`flex gap-4 p-0.5vw pl-1vw pr-1vw rounded-xl bg-white dark:bg-toastDarkModeBg  drop-shadow-xl w-fit items-center justify-center alertAnim ${classNameContainer}`}>

      <ProfilePic src={img} height={imgH} width={imgW} className={`ml-0 ${classNamePic}`} rounded={roundedPic} id={`userAvatar-${children}-${uniqueId}`}/>
      <div id="text-wrapper" className={`leading-1.6vw ${classNameTextWrapper}`}>
        <p id="user-name" className='text-1.1vw'>{children}</p>
        <p id="toast-message" className='text-1vw text-footer_text_light dark:text-footer_text'>
          {secondaryText}
        </p>
      </div>
    </div>
  )
}

export default CustomToast