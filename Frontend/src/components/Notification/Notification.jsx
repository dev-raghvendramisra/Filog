import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {GenToast, NotificationCard} from '../../components'
import { dbServices } from '../../services'
import { readNotification } from '../../store/userProfileSlice'
import toast from 'react-hot-toast'

function Notification() {
   const [openNotificationCont, setOpenNotificationCont] = React.useState(false)
   const [displayChevron, setDisplayChevron] = React.useState(false)
   const [notificationCount, setNotificationCount] = React.useState(null)
   const container = React.useRef()
   
   const notifications = useSelector(state=>state.userProfile.notifications)
   const {userId,$id} = useSelector(state=>state.userProfile)
   const dispatch  =  useDispatch()
 
   React.useEffect(() => {
     const currentContainer = container.current
 
     const handleContainerScroll = () => {
       if (currentContainer.scrollTop + currentContainer.clientHeight + 1 >= currentContainer.scrollHeight) {
         return setDisplayChevron(false)
       }
       setDisplayChevron(true)
     }
 
     if (currentContainer) {
       document.addEventListener('click',(e)=>{
         if(e.target.id !== "notification-cont" && e.target.id !== "notification-icon-wrapper" && e.target.id !== "notification-icon-cont" && e.target.id !== "notification-icon" && e.target.id !== "notification-count"){
           setOpenNotificationCont(false)
         }
       })
       if (currentContainer.scrollHeight <= currentContainer.clientHeight) {
         setDisplayChevron(false)
       } else {
         setDisplayChevron(true)
         currentContainer.addEventListener('scroll', handleContainerScroll)
       }
     }
 
     return () => {
       if (currentContainer) {
         currentContainer.removeEventListener('scroll', handleContainerScroll)
       }
     }
   }, [container.current])
 

   const readAllNotifications = () => {}
   const readNotifications = async({target},type,notificationId) => {
    console.log(target);
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
   const removeNotifications = (type) => {}

 
   React.useEffect(()=>{
     console.log(notifications);
     
   })

  return (
    <div id="notification-cont" className='cursor-pointer relative'>
        <div id="notification-icon-wrapper" className='h-fit w-fit relative hover:bg-gray-100 transition-all p-0.7vw rounded-md dark:hover:bg-toastDarkModeBg'  onClick={
        ()=>{
            setOpenNotificationCont(prev=>!prev)
            setNotificationCount(null)
        }
    }>
          <div id="notification-icon-cont" className='h-fit w-fit relative' >
            <span id="notification-icon" className='fa-regular fa-bell text-1.2vw text-darkPrimary dark:text-gray-100' style=  {{fontWeight:"200"}}></span>
           { notificationCount && <span id="notification-count" className='absolute left-40p -top-50p bg-red-600 flex justify-center items-center p-0.4vw  pb-0.1vw pt-0.1vw text-0.5vw h-fit text-white w-fit rounded-sm'>
            {notificationCount}
           </span>}
          </div>
        </div>
        <div id="notifications-wrapper" className='h-14vw absolute mt-38p right-0'>

                        
        <div
        ref={container}
         id="notifications-cont" className={` flex flex-col bg-white p-0.5vw w-max gap-1 transition-allright-0 z-20 drop-shadow-2xl border-2 dark:border-footer_text rounded-2xl rounded-tr-none rounded-tl-none dark:border-t-0 dark:border-opacity-0 overflow-hidden dark:bg-darkPrimary_grays opacity-0 pointer-events-none  ${openNotificationCont ? "pointer-events-auto opacity-100":"pointer-events-none opacity-0"}`}>
          <div className='mb-0.2vw ml-1vw mt-1vw mr-1vw'>
          <p className='text-1.5vw  leading-1.1vw font-medium text-darkPrimary dark:text-gray-200'>Notifications</p>
          {notifications.length > 0 && <button className=' text-0.6vw  text-footer_text_light dark:text-footer_text  underline-offset-4 hover:underline hover:text-primary dark:hover:text-primary_darkMode' >Mark all as read</button>}
          </div>
            {notifications.length === 0 && <p className='text-0.9vw text-darkPrimary dark:text-gray-200'>No new notifications</p>}
            {
                notifications.map((notification)=>{
                    return (
                       <NotificationCard key={notification.$id} notification={notification} userId={userId} readNotifications={readNotifications} removeNotifications={removeNotifications} />
                        
                    )
                })
            }
        </div>
        {displayChevron && (
        <div className='text-0.5vw text-darkPrimary w-100p text-center py-0.2vw bg-white dark:text-gray-200 px-1vw dark:bg-toastDarkModeBg absolute bottom-0'>
          <span className='fa solid fa-chevron-down animate-bounce'></span>
        </div>
      )}
        </div>
      
    </div>
  )
}

export default Notification