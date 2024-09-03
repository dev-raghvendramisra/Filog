import dbServices from "../Services/dbService.js";

export default async function updateFollowers({ targetUserId, userId, type, log, currentUserProfile, version }) {
    log("Fetching target user profile...");
    const targetUserProfile = await dbServices.getUserProfile(targetUserId,log);


    // Proceed if the target user's profile exists
    if (targetUserProfile.$id) {
        log("Target User Profile found successfully :",targetUserProfile);

        const existingFollowers = targetUserProfile.followers || [];
        const existingFollowing = currentUserProfile.following || [];
        let updatedFollowers;
        let updatedFollowing;
        // Update the followers list based on the action type
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
        log("Fetching initiating user profile...");
        
        const initiatingUserProfile = await dbServices.getUserProfile(userId, log);

        if (initiatingUserProfile.$id) {
        log("Initiating User Profile found successfully :", initiatingUserProfile);

            if(version !== initiatingUserProfile.version) {
                log("Profile version mismatch- recreating following array");
                log("Previous version:", version);
                log("Current version:", initiatingUserProfile.version);

                updatedFollowing = [...initiatingUserProfile.following, targetUserId];
                log("Recreated Following array:", updatedFollowing);
            }
            log("Updating initiating user profile with stagedAction as null and  new following list...");
            const updateStagedActionRes = await dbServices.updateProfileDocument({
                profileId: initiatingUserProfile.$id,
                stagedAction: null,
                updatedFollowing,
                version: version + 1,
                log
            });
            
            if (updateStagedActionRes.$id) {
                log("Marked stagedAction as null and updated initiating user profile following list successfully:", updateStagedActionRes);
                log("Updating target user profile with new followers list...");

                const updateRes = await dbServices.updateProfileDocument({
                    profileId: targetUserProfile.$id,
                    updatedFollowers,
                    log
                });
                if (updateRes.$id) {
                    log("Target user profile updated successfully:", updateRes);
                    return { ok: true, res: updateRes };
                }
                else {
                    log("Failed to update target user profile");
                    return { ok: false, res: updateRes };
                }
            }
            else {
                log("Failed to update initiating user profile");
                return { ok: false, res: updateRes };
            }
        } else {
            log("Initiating user profile not found");
            return { ok: false, res: initiatingUserProfile };
        }
    } else {
        log("Target Profile not found:", targetUserProfile);
        log("Fetching initiating user profile to reset stagedAction...");
        const res = await dbServices.getUserProfile(userId, log);
        if(res.$id){
           log("Initiating user profile found successfully:",res);
           log("Reseting stagedAction of initiating user profile...");
           const currentUserInitialProfile = await dbServices.updateProfileDocument({profileId:res.$id,log,stagedAction:null})
           if(currentUserInitialProfile.$id){
               log("Initiating user profile staged action marked as null successfully:",currentUserInitailProfile)
               return { ok: false, res: targetUserId };
           }else{
            log("Failed to reset stagedAction of initiating user profile")
            return { ok: false, res: targetUserId };
           }
        }
        else log("Failed to fetch initiating user profile")
        return { ok: false, res: targetUserId };
    }
}
