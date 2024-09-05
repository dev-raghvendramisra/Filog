import dbServices from "../Services/dbService.js";
import { abortDuplicateAction, handleProfileNotFound } from "../utils/index.js";

export default async function handleFollow_Unfollow({ targetUserId, userId, type, log, currentUserProfile,currentUserProfileVersion }) {
    log("Fetching target user profile...");
    let targetUserProfile = await dbServices.getUserProfile(targetUserId, log);

    if (!targetUserProfile.$id) {
        return handleProfileNotFound(userId, targetUserId, log);
    }
    let targetUserProfileVersion;
    targetUserProfileVersion = targetUserProfile.version==null?1:targetUserProfile.version;
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
        version: version + 1,
        log
    });

    if (!updateStagedActionRes.$id) {
        log("Failed to update initiating user profile");
        return { ok: false, res: updateStagedActionRes };
    }

    log("Marked stagedAction as null and updated initiating user profile following list successfully:", updateStagedActionRes);
    
    targetUserProfile = await dbServices.getUserProfile(targetUserId, log);
    if (!targetUserProfile.$id) {
        log("Target user profile not found");
        return { ok: false, res: targetUserProfile };
    }
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
    // Update the target user profile
    const updateRes = await dbServices.updateProfileDocument({
        profileId: targetUserProfile.$id,
        updatedFollowers,
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



