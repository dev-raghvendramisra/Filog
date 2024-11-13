import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {GenToast, NotificationCard} from '../../components'
import { dbServices } from '../../services'
import { readNotification, removeNotification } from '../../store/userProfileSlice'
import toast from 'react-hot-toast'
import useTheme from '../../context/themeContext'

function Notification() {
   const [openNotificationCont, setOpenNotificationCont] = React.useState(false)
   const [notificationAvailable, setNotificationAvailable] = React.useState(null)
   const {isDark} = useTheme()
 
   
   const notifications = useSelector(state=>state.userProfile.notifications)
   const {userId,$id} = useSelector(state=>state.userProfile)
   const dispatch  =  useDispatch()
 
   React.useEffect(()=>{
    const handleClose= (e)=>{
      if(e.target.id !== "notification-cont" && e.target.id !== "notification-icon-wrapper" && e.target.id !== "notification-icon-cont" && e.target.id !== "notification-icon" && e.target.id !== "notification-count" && !e.target.id.includes("notification-remove") && !e.target.id.includes("notification-read")){
        setOpenNotificationCont(false)
      }
    }
    document.addEventListener('click',handleClose)
    return ()=>{
      document.removeEventListener('click',handleClose)
    }
   },[])

   React.useEffect(() => {
      if (notifications.length > 0) {
        const unreadNotifications = notifications.filter(notification => !notification.readAt && !notification.readBy?.includes(userId))
        setNotificationAvailable(unreadNotifications.length)
      }
   },[notifications])

   const readAllNotifications = () => {}
   const readNotifications = async({target},type,notificationId) => {
    target.classList.add("hidden")
    if(type=="gen"){
      const res  = await dbServices.readGenNotification(notificationId,$id)
      if(res.$id){
        toast.custom(<GenToast type='success'>Notification read</GenToast>)
        return dispatch(readNotification({type:type,notificationId:notificationId,userId:userId}))
      }
      return toast.custom(<GenToast type='err'>Failed to read notification</GenToast>)
    }
    if(type=="user"){
      const res  = await dbServices.readUserNotification(notificationId,$id)
      if(res.$id){
        return dispatch(readNotification({type:type,notificationId:notificationId,userId:userId}))
      }
      return toast.custom(<GenToast type='err'>Failed to read notification</GenToast>)
    }
   }
   const removeNotifications = async(e,type,notificationId) => {
    if(type=="gen"){
      console.log("removing gen notification...");
      const res =  await dbServices.removeGenNotification(notificationId,$id);
      if(res.$id){
        toast.custom(<GenToast type='success'>Notification removed</GenToast>)
        return dispatch(removeNotification(notificationId))
      }
      return toast.custom(<GenToast type='err'>Failed to remove notification</GenToast>)
    }
    if(type=="user"){
      console.log("removing user notification...");
      const res =  await dbServices.removeUserNotification(notificationId);
      if(res.$id){
        toast.custom(<GenToast type='success'>Notification removed</GenToast>)
        return dispatch(removeNotification(notificationId))
      }
      return toast.custom(<GenToast type='err'>Failed to remove notification</GenToast>)
    }
   }


  return (
    <div id="notification-cont" className='cursor-pointer relative'>
        <div id="notification-icon-wrapper" className={`h-fit w-fit relative hover:bg-gray-100 transition-all p-0.7vw rounded-md dark:hover:bg-toastDarkModeBg `}  onClick={
        ()=>{
            setOpenNotificationCont(prev=>!prev)
            setNotificationAvailable(null)
        }
    }>
          <div id="notification-icon-cont" className={`h-fit w-fit relative ${notificationAvailable ? `notificationAvailable ` : null}`} >
            <span id="notification-icon" className='fa-regular fa-bell text-1.2vw text-darkPrimary dark:text-gray-100' style=  {{fontWeight:"200"}}></span>
          </div>
        </div>
        <div id="notifications-wrapper" 
         className={`${openNotificationCont ? "max-h-90vh" : "h-0"} drop-shadow-lg absolute mt-38p right-0 w-fit rounded-br-2xl rounded-bl-2xl overflow-scroll hideScrollbar `}>

                        
        <div
         id="notifications-cont" className={` flex flex-col bg-white p-0.5vw w-max gap-2 transition-allright-0 z-20 drop-shadow-2xl border-2 dark:border-footer_text rounded-2xl rounded-tr-none rounded-tl-none dark:border-t-0 dark:border-opacity-0 overflow-hidden dark:bg-darkPrimary_grays opacity-0 pointer-events-none  ${openNotificationCont ? "pointer-events-auto opacity-100":"pointer-events-none opacity-0"}`}>
          <div className='mb-0.2vw ml-1vw mt-1vw mr-1vw'>
          {notifications.length > 0 &&  <p className='text-1.5vw  leading-1.1vw font-medium text-darkPrimary dark:text-gray-200'>Notifications</p>}
          {notifications.length > 0 && <button className=' text-0.6vw  text-footer_text_light dark:text-footer_text  underline-offset-4 hover:underline hover:text-primary dark:hover:text-primary_darkMode' >Mark all as read</button>}
          </div>
            {notifications.length === 0 &&
            <img  src={`${isDark ? "/error-placeholders/noNewNotificationPlaceholder-dark.webp":"/error-placeholders/noNewNotificationPlaceholder-light.webp"}`} className='h-14vw p-1vw '/>
            }
            {
                notifications.map((notification)=>{
                    return (
                       <NotificationCard  key={notification.$id} notification={notification} userId={userId} readNotifications={readNotifications} removeNotifications={removeNotifications} />
                        
                    )
                })
            }
        </div>
        
        </div>      
      
    </div>
  )
}

export default Notification

