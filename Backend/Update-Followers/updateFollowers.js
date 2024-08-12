import dbServices from "../Services/dbService.js";

export default async function updateFollowers({ targetUserId, userId, type, log }) {
    // Fetch the target user's profile
    const targetUserProfile = await dbServices.getTargetProfile(targetUserId);
    log("Target User Profile:");
    log(targetUserProfile);

    // Proceed if the target user's profile exists
    if (targetUserProfile.$id) {
        const existingFollowers = targetUserProfile.followers || [];
        let updatedFollowers;

        // Update the followers list based on the action type
        if (type === "following") {
            updatedFollowers = [...existingFollowers, userId];
        } else if (type === "unfollowing") {
            updatedFollowers = existingFollowers.filter(user => user !== userId);
        } else {
            throw new Error("Invalid type");
        }

        log("Updated Followers:", updatedFollowers);

        // Update the target user's profile with the new followers list
        const updateRes = await dbServices.updateProfileDocument({
            profileId: targetUserProfile.$id,
            updatedFollowers,
            log
        });

        log("Profile Update Response:", updateRes);

        // If the profile update is successful, update the initiating user's profile
        if (updateRes.$id) {
            // Fetch the initiating user's profile
            const initiatingUserProfile = await dbServices.getTargetProfile(userId, log);
            log("Initiating User Profile:", initiatingUserProfile);

            // Proceed if the initiating user's profile exists
            if (initiatingUserProfile.$id) {
                // Mark the `updatedAttribute` as `null`
                const updateStagedActionRes = await dbServices.updateProfileDocument({
                    profileId: initiatingUserProfile.$id,
                    stagedAction: null,
                    log
                });

                log("Marked stagedAction as null:", updateStagedActionRes);
                return { ok: true, res: updateStagedActionRes };
            } else {
                log("Initiating user profile not found");
                return { ok: false, res: initiatingUserProfile };
            }
        } else {
            log("Failed to update target user profile");
            return { ok: false, res: updateRes };
        }
    } else {
        log("Target Profile not found:");
        return { ok: false, res: targetUserId };
    }
}
