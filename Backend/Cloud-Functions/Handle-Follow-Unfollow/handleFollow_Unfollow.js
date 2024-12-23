import dbServices from "../Services/dbService.js";
import { abortDuplicateAction, handleNotificationCreation_Deletion, handleProfileNotFound } from "../utils/index.js";

export default async function handleFollow_Unfollow({ targetUserId, userId, type, log, currentUserProfile, currentUserProfileVersion }) {
    log("Fetching target user profile...");
    const notification = {
        type: "custom",
        userId: targetUserId,
        message: `${currentUserProfile.fullName} has started following you`,
        icon: currentUserProfile.userAvatar
    }
    let targetUserProfile = await dbServices.getUserProfile(targetUserId, log);

    if (!targetUserProfile.$id) {
        return handleProfileNotFound(userId, targetUserId, log);
    }
    let targetUserProfileVersion = targetUserProfile.version==null ? 1 : targetUserProfile.version ==0 ? 1 : targetUserProfile.version
    log("Target User Profile found successfully:", targetUserProfile);

    const existingFollowers = targetUserProfile.followers || [];
    const existingFollowing = currentUserProfile.following || [];
    let updatedFollowers, updatedFollowing;

    // Update the followers and following lists
    if (type === "follow") {
        updatedFollowers = [...existingFollowers, userId];
        updatedFollowing = [...existingFollowing, targetUserId];
    } else if (type === "unfollow") {
        updatedFollowers = existingFollowers.filter(user => user !== userId);
        updatedFollowing = existingFollowing.filter(user => user !== targetUserId);
    } else {
        throw new Error("Invalid type");
    }

    log("Updated Followers:", updatedFollowers);
    log("Updated Following:", updatedFollowing);
    log("Fetching initiating user profile again to check version...");
    const initiatingUserProfile = await dbServices.getUserProfile(userId, log);
    if (!initiatingUserProfile.$id) {
        log("Initiating user profile not found");
        return { ok: false, res: initiatingUserProfile };
    }

    log("Initiating User Profile found successfully:", initiatingUserProfile);

    // Handle profile version mismatch
    if (currentUserProfileVersion !== initiatingUserProfile.version) {
        log("Profile version mismatch - recreating following array");
        log("Previous version:", version);
        log("Current version:", initiatingUserProfile.version);

        if (JSON.stringify(initiatingUserProfile.following) === JSON.stringify(updatedFollowing)) {
            log("Duplicate stagedAction detected, aborting current operation...");
            return await abortDuplicateAction(initiatingUserProfile, log);
        }

        updatedFollowing = [...initiatingUserProfile.following, ...updatedFollowing];
        log("Recreated Following array:", updatedFollowing);
    }

    // Update the initiating user profile
    const updateStagedActionRes = await dbServices.updateProfileDocument({
        profileId: initiatingUserProfile.$id,
        stagedAction: null,
        updatedFollowing,
        version: initiatingUserProfile.version + 1,
        log
    });

    if (!updateStagedActionRes.$id) {
        log("Failed to update initiating user profile");
        return { ok: false, res: updateStagedActionRes };
    }

    log("Marked stagedAction as null and updated initiating user profile following list successfully:", updateStagedActionRes);
    log("Fetching target user profile again to check version...");
    targetUserProfile = await dbServices.getUserProfile(targetUserId, log);
    if (!targetUserProfile.$id) {
        log("Target user profile not found");
        return { ok: false, res: targetUserProfile };
    }
    log("Target User Profile found successfully:", targetUserProfile);
    if (targetUserProfileVersion !== targetUserProfileVersion) {
        log("Profile version mismatch - aborting current operation...");
        log("Previous Profile version:", targetUserProfile.version);
        log("Current Profile version:", targetUserProfile.version);

        if (JSON.stringify(targetUserProfile.followers) === JSON.stringify(updatedFollowers)) {
            log("Duplicate stagedAction detected, aborting current operation...");
            return await abortDuplicateAction(targetUserProfile, log);
        }
        updatedFollowers = [...targetUserProfile.followers, ...updatedFollowers];
        log("Recreated Followers array:", updatedFollowers);

    }
    //handle create and delete notification
    if(type === "follow"){
        const notificationRes = await handleNotificationCreation_Deletion({log,notification})
        if(!notificationRes.ok){
            log("Failed to create notification");
        }
        else log("Notification created successfully");
    }
    if(type === "unfollow"){
        log("Removing notification...");
        const notification  = await dbServices.getNotification("custom",targetUserId,log)
        if(!notification.$id){
            log("Notification not found");
        }
        else{
            const removeNotificationRes = await handleNotificationCreation_Deletion({type:"delete",notificationId:notification.$id,log})
            if(!removeNotificationRes.ok){
                log("Failed to remove notification");
            }
            else log("Notification removed successfully");
        }
    }
    // Update the target user profile
    const updateRes = await dbServices.updateProfileDocument({
        profileId: targetUserProfile.$id,
        updatedFollowers,
        version: targetUserProfile.version + 1,
        log
    });

    if (!updateRes.$id) {
        log("Failed to update target user profile");
        return { ok: false, res: updateRes };
    }

    log("Target user profile updated successfully:", updateRes);
    return { ok: true, res: updateRes };
}






//helper functions



