import React from 'react'
import { getTimeAgo } from '../../utils'
import ProfilePic from '../ProfilePic/ProfilePic'

function NotificationCard({removeNotifications,readNotifications,notification,userId}) {
  console.log(notification.readAt);
  
  return (
    <div id={notification.$id+"-notification-content-container"} className={`${notification.readAt?"opacity-70":null}`}  >
    <div  className={`flex justify-start items-start gap-2 hover:bg-blue-100 transition-all hover:dark:bg-darkPrimary_grays_darker p-0.7vw rounded-xl w-100p text-darkPrimary dark:text-gray-200  ${notification.type=="gen"? notification.readBy.includes(userId)  ? "bg-opacity-50" : notification.readAt && "bg-opacity-50":null}`} >
    <ProfilePic className='ml-0 ' src={notification.icon} />
    <div className=' '>
      <p className='text-0.9vw font-medium max-w-18vw'>{notification.message}</p>
      <p className='text-0.5vw text-footer_text_light font-medium dark:text-footer_text'>{getTimeAgo(notification.createdAt)}</p>
    </div>
   </div>
  { notification.type=="gen" ? notification. readBy.includes(userId) ?  null  : <button onClick={(e)=>readNotifications(e,notification.type=="gen" ? "gen" : "user",notification.$id)} className='ml-0.7vw text-0.9vw  text-footer_text_light dark:text-footer_text underline-offset-4 hover:underline  hover:text-primary dark:hover:text-primary_darkMode '>Mark as read</button>:null}
  { notification.type=="custom" ? notification.readAt ? null : <button onClick={(e)=>readNotifications(e,notification.type=="gen" ? "gen" : "user",notification.$id)} className='ml-0.7vw text-0.9vw  text-footer_text_light dark:text-footer_text underline-offset-4 hover:underline  hover:text-primary dark:hover:text-primary_darkMode '>Mark as read</button>:null}

  {<button onClick={(e)=>removeNotifications(e,notification.type=="gen" ? "gen" : "user",notification.$id)} className='ml-1vw text-0.9vw  text-footer_text_light dark:text-footer_text underline-offset-4 hover:underline  hover:text-primary dark:hover:text-primary_darkMode' >Remove</button>}
 </div>
  )
}

export default NotificationCard