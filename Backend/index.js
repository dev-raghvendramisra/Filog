import conf from "./conf/conf.js";
import updateFollowers from './Update-Followers/updateFollowers.js'

export default async function handler({ req, res, log }) {
  log(req.body);

  const trigger = req.headers["x-appwrite-trigger"];
  if (trigger === "event") {
    const evtType = req.headers["x-appwrite-event"];
    if (evtType.includes(conf.userProfilesCollectionID) && evtType.includes("update")) {
      const updatedAttrJson = req.body.updatedAttribute ? req.body.updatedAttribute : null;
      if (!updatedAttrJson) {
        log("This is not the event to perform operations");
        return res.empty();
      }

      const updatedAttribute = JSON.parse(updatedAttrJson);
      log("Updated Attribute:", updatedAttribute);

      if (updatedAttribute.type === "following" || updatedAttribute.type === "unfollowing") {
        log("Processing update for:", updatedAttribute);
        const updationRes = await updateFollowers({
          targetUserId: updatedAttribute.value,
          userId: req.body.userId,
          type: updatedAttribute.type,
          log: log
        });

        log("Update Followers Response:", updationRes);
        if (updationRes.ok) {
          log(`${req.body.userName} (${req.body.userId}) ${updatedAttribute.type} ${updatedAttribute.value}`);
        } else {
          log("Failed to update followers");
        }
        return res.empty();
      } else {
        log("Invalid update type:", updatedAttribute.type);
      }
    } else {
      log("Event not related to user profile updates");
    }
  } else {
    log("Trigger not recognized");
  }

  return res.empty();
}
