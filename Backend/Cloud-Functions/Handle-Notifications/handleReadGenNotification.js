import dbServices from "../Services/dbService.js";

export default async function handleReadGenNotification({log,notificationId,userId,userProfileVersion}){
  log("Fetching target notification...");
  let targetNotification = await dbServices.getNotification("gen",notificationId, log);
    if(!targetNotification.$id){
        log("Failed to fetch target notification");
        return {ok:false};
    }
    log("Target notification fetched");
    log("Checking if the notification is unread...");
    if(targetNotification.readBy.includes(userId)){
        log("Notification already read");
        return {ok:true};
    }
    log("Notification is unread");
    targetNotification.readBy.push(userId);
    targetNotification.version++;
    log("Fetching the notification to check version...");
    const notification = await dbServices.getNotification("gen",notificationId, log);
    if(notification.version+1 !== targetNotification.version){
        log("Version mismatch");
        return {ok:false};
    }
    log("Version matched");
    log("Updating the notification...");
    const updationRes = await dbServices.updateNotificationDocument({log,notificationId:targetNotification.$id,updatedAttribute:{version:targetNotification.version,readBy:targetNotification.readBy}});
    if(!updationRes.$id){
        log("Failed to update notification");
        return {ok:false};
    }
    log("Notification read successfully");
    log("Proceeding to mark stagedAction as null...");
    const profile = await dbServices.getUserProfile(userId, log);
    if(!profile.$id){
        log("Failed to fetch profile");
        return {ok:false};
    }
    if(profile.version !== userProfileVersion){
        log("Version mismatch");
        return {ok:false};
    }
    log("Version matched");
    profile.version++;
    profile.stagedAction = null;
    log("Updating profile...");
    const profileUpdationRes = await dbServices.updateProfileDocument({log,profileId:profile.$id,stagedAction:null,version:profile.version});
    if(!profileUpdationRes.$id){
        log("Failed to update profile");
        return {ok:false};
    }
    log("Profile updated successfully");
    return {ok:true};

}