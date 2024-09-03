import dbServices from "../Services/dbService.js";

export default async function updateFollowers({ targetUserId, userId, type, log, currentUserProfile, version }) {
    log("Fetching target user profile...");
    const targetUserProfile = await dbServices.getUserProfile(targetUserId, log);

    if (!targetUserProfile.$id) {
        return handleProfileNotFound(userId, targetUserId, log);
    }

    log("Target User Profile found successfully:", targetUserProfile);

    const existingFollowers = targetUserProfile.followers || [];
    const existingFollowing = currentUserProfile.following || [];
    let updatedFollowers, updatedFollowing;

    // Update the followers and following lists
    if (type === "following") {
        updatedFollowers = [...existingFollowers, userId];
        updatedFollowing = [...existingFollowing, targetUserId];
    } else if (type === "unfollowing") {
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
    if (version !== initiatingUserProfile.version) {
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

async function handleProfileNotFound(userId, targetUserId, log) {
    log("Target Profile not found:", targetUserId);
    log("Fetching initiating user profile to reset stagedAction...");
    const res = await dbServices.getUserProfile(userId, log);
    
    if (res.$id) {
        log("Initiating user profile found successfully:", res);
        log("Resetting stagedAction of initiating user profile...");
        const currentUserInitialProfile = await dbServices.updateProfileDocument({
            profileId: res.$id,
            log,
            stagedAction: null
        });

        if (currentUserInitialProfile.$id) {
            log("Initiating user profile staged action marked as null successfully:", currentUserInitialProfile);
        } else {
            log("Failed to reset stagedAction of initiating user profile");
        }
    } else {
        log("Failed to fetch initiating user profile");
    }

    return { ok: false, res: targetUserId };
}

async function abortDuplicateAction(initiatingUserProfile, log) {
    const res = await dbServices.updateProfileDocument({
        profileId: initiatingUserProfile.$id,
        stagedAction: null,
        log
    });

    if (res.$id) {
        log("Aborted duplicate stagedAction request successfully:", res);
        return { ok: false, res };
    } else {
        log("Failed to abort duplicate request");
        return { ok: false, res };
    }
}
