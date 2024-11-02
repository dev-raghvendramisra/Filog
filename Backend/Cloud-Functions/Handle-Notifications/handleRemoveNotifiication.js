import dbServices from "../Services/dbService.js";

export default async function handleRemoveNotification({log,notificationId,userId,userProfileVersion}){
    log("Fetching target notification...");
    let targetNotification = await dbServices.getNotification(notificationId, log);
    if(!targetNotification.$id){
        log("Notification not found");
        return {ok:false};
    }
    log("Removing notification...");
    targetNotification.exceptionUserId.push(userId);
    const removeNotificationRes = await dbServices.updateNotificationDocument({
        log,
        notificationId,
        updatedAttribute:{
           exceptionUserId:targetNotification.exceptionUserId
        }
    });
    if(!removeNotificationRes.$id){
        log("Failed to remove notification");
        return {ok:false};
    }
    log("Notification removed successfully");
    log("Fetching user profile to check version...");
    let userProfile = await dbServices.getUserProfile(userId, log);
    if(!userProfile.$id){
        log("User profile not found");
        return {ok:false};
    }
    if(userProfile.version != userProfileVersion){
        log("User profile version mismatch");
        return {ok:false};
    }
    userProfile.version++;
    log("Marking staged action as null...");
    const updateProfileRes = await dbServices.updateProfileDocument({
        profileId:userProfile.$id,
        stagedAction:null,
        version:userProfile.version,
        log,
    });
    if(!updateProfileRes.$id){
        log("Failed to update user profile");
        return {ok:false};
    }
    log("User profile updated successfully");
    return {ok:true};
}