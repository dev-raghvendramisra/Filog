import conf from "../conf/conf.js";
import dbServices from "../Services/dbService.js";

export default async function updateFollowers({ targetUserId, userId, type, log }) {
  try {
    const targetUserProfile = await dbServices.getTargteProfile(targetUserId);
    log("Target User Profile:", targetUserProfile);

    if (targetUserProfile.$id) {
      const existingFollowers = targetUserProfile.followers || [];
      let updatedFollowers;

      if (type === "following") {
        updatedFollowers = [...existingFollowers, userId];
      } else if (type === "unfollowing") {
        updatedFollowers = existingFollowers.filter(user => user !== userId);
      } else {
        throw new Error("Invalid type");
      }

      log("Updated Followers:", updatedFollowers);

      const res = await dbServices.updateProfileDocument({
        profileId: targetUserProfile.$id,
        updatedFollowers,
        log
      });

      log("Profile Update Response:", res);

      return res.$id ? { ok: true, res } : { ok: false, res };
    } else {
      throw new Error("Target user profile not found");
    }
  } catch (error) {
    log("Error in updateFollowers:", error.message);
    return { ok: false, error: error.message };
  }
}
