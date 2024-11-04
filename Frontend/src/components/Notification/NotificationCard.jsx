import React from 'react'
import { getTimeAgo } from '../../utils'
import ProfilePic from '../ProfilePic/ProfilePic'

function NotificationCard({removeNotifications,readNotifications,notification,userId}) {
  console.log(notification.readAt);
  
  return (
    <div id={notification.$id+"-notification-content-container"} className={`border-2 dark:border-footer_text dark:border-opacity-50 hover:border-primary hover:border-opacity-60 dark:hover:border-opacity-60 dark:hover:border-primary_darkMode rounded-xl ${notification.readAt || notification.readBy?.includes(userId)?"opacity-60 border-opacity-20 dark:border-opacity-20 hover:border-opacity-30 dark:hover:border-opacity-30":null}`}>
    <div  className={`flex justify-start items-start gap-2 hover:bg-blue-100 transition-all hover:dark:bg-darkPrimary_grays_darker p-0.7vw rounded-xl w-100p text-darkPrimary dark:text-gray-200  ${notification.type=="gen"? notification.readBy.includes(userId)  ? "bg-opacity-50" : notification.readAt && "bg-opacity-50":null}`} >
    <ProfilePic className='ml-0 ' src={notification.icon} />
    <div className=' '>
      <p className='text-0.9vw font-medium max-w-18vw'>{notification.message}</p>
      <p className='text-0.5vw text-footer_text_light font-medium dark:text-footer_text'>{getTimeAgo(notification.createdAt)}</p>
    </div>
   </div>
  { notification.type=="gen" ? notification. readBy.includes(userId) ?  null  : <button onClick={(e)=>readNotifications(e,notification.type=="gen" ? "gen" : "user",notification.$id)} className='ml-0.7vw text-0.9vw pb-0.5vw text-footer_text_light dark:text-footer_text underline-offset-4 hover:underline  hover:text-primary dark:hover:text-primary_darkMode ' id={`notification-read-btn-${notification.$id}`}>Mark as read</button>:null}
  { notification.type=="custom" ? notification.readAt ? null : <button onClick={(e)=>readNotifications(e,notification.type=="gen" ? "gen" : "user",notification.$id)} className='ml-0.7vw text-0.9vw  text-footer_text_light dark:text-footer_text underline-offset-4 hover:underline  hover:text-primary dark:hover:text-primary_darkMode ' id={`notification-read-btn-${notification.$id}`}>Mark as read</button>:null}

  {<button onClick={(e)=>removeNotifications(e,notification.type=="gen" ? "gen" : "user",notification.$id)} className='ml-1vw text-0.9vw pb-0.5vw text-footer_text_light dark:text-footer_text underline-offset-4 hover:underline  hover:text-primary dark:hover:text-primary_darkMode' id={`notification-remove-btn-${notification.$id}`}>Remove</button>}
 </div>
  )
}

export default NotificationCard