import conf from "../conf/conf.js";
import dbServices from "../Services/dbService.js";

export default async function updateFollowers({ targetUserId, userId, type, log }) {
  try {
    // Fetch the target user profile
    const targetUserProfile = await dbServices.getTargteProfile(targetUserId);
    log("Target User Profile:", targetUserProfile);

    if (targetUserProfile.$id) {
      const existingFollowers = targetUserProfile.followers || [];
      let updatedFollowers;

      // Update the followers list based on the type of action
      if (type === "following") {
        updatedFollowers = [...existingFollowers, userId];
      } else if (type === "unfollowing") {
        updatedFollowers = existingFollowers.filter(user => user !== userId);
      } else {
        throw new Error("Invalid type");
      }

      log("Updated Followers:", updatedFollowers);

      // Update the target user's profile document with the new followers list
      const updateRes = await dbServices.updateProfileDocument({
        profileId: targetUserProfile.$id,
        updatedFollowers,
        log
      });

      log("Profile Update Response:", updateRes);

      // If the update is successful, update the initiating user's profile document
      if (updateRes.$id) {
        // Mark the `updatedAttribute` of the initiating user’s profile as `null`
        const initiatingUserProfile = await dbServices.getTargteProfile(userId);
        log("Initiating User Profile:", initiatingUserProfile);

        if (initiatingUserProfile.$id) {
          const updateAttrRes = await dbServices.updateProfileDocument({
            profileId: initiatingUserProfile.$id,
            updatedAttribute: null,  // Set updatedAttribute to null
            log
          });

          log("Marked updatedAttribute as null:", updateAttrRes);

          return { ok: true, res: updateRes };
        } else {
          throw new Error("Initiating user profile not found");
        }
      } else {
        throw new Error("Failed to update target user profile");
      }
    } else {
      throw new Error("Target user profile not found");
    }
  } catch (error) {
    log("Error in updateFollowers:", error.message);
    return { ok: false, error: error.message };
  }
}
