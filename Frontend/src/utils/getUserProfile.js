import { Query } from "appwrite";
import { dbServices } from "../services";

export default async function getUserProfile({userId="#",setProfile,clearProfile,dispatch}){
    let genNotifications = []
    let userNotifications = []
    const res = await dbServices.getUsers([Query.equal("userId",[userId])])
    const genNotificationAllRes = await dbServices.getGeneralNotifications([Query.equal("allUsers",true)])
    const genNotificationsRes = await dbServices.getGeneralNotifications([Query.contains("selectedUserId",[userId])])
    const userNotificationsRes = await dbServices.getUserNotifications(userId)
    if(genNotificationsRes.length>0){
       genNotifications = genNotificationsRes.filter((notification)=>!notification.exceptionUserId.includes(userId))
    }
    if(genNotificationAllRes.length>0){
        const moreGenNotifications = genNotificationAllRes.filter((notification)=>!notification.exceptionUserId.includes(userId))
        genNotifications = [...genNotifications,...moreGenNotifications]
    }
    if(userNotificationsRes.length>0){
        userNotifications = userNotificationsRes
    }
    if(res.documents.length>0){
        res.documents[0].notifications = [...genNotifications,...userNotifications]
        const idxs =  []
        res.documents[0].notifications.forEach((notification,idx) => {
            if(notification.readBy?.includes(userId) || notification.readAt){
                idxs.push(idx)
            }
        });
        idxs.forEach(notificationReadIdx=>{
            const [readNotification] = res.documents[0].notifications.splice(notificationReadIdx,1)
            res.documents[0].notifications = [...res.documents[0].notifications,readNotification]
        })

        dispatch(clearProfile())
        dispatch(setProfile(res.documents[0]))
        return {ok:true,res:res}
    }
    else{
        dispatch(clearProfile())
        return {ok:false,res:res,message:"Nothing to show here !"}
    } 
}