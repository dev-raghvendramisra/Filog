import conf from "./conf/conf.js";
import updateFollowers from './Update-Followers/updateFollowers.js';

export default async function handler({ req, res, log }) {
    // Log the request body for debugging
    log(req.body);

    // Check if the request is triggered by an event
    const trigger = req.headers["x-appwrite-trigger"];
    if (trigger === "event") {
        const evtType = req.headers["x-appwrite-event"];
        
        // Check if the event type includes user profile updates
        if (evtType.includes(conf.userProfilesCollectionID) && evtType.includes("update")) {
            // Parse the updated attribute from the request body
            const stagedActionJson = req.body.stagedAction ? req.body.stagedAction : null;
            if (!stagedActionJson) {
                log("This is not the event to perform operations");
                return res.empty();
            }

            // Convert updated attribute JSON to an object
            const stagedAction = JSON.parse(stagedActionJson);
            log("Updated Attribute:", stagedAction);

            // Process the update if it's a follow or unfollow event
            if (stagedAction.type === "following" || stagedAction.type === "unfollowing") {
                log("Processing update for:", stagedAction);

                // Call the function to update followers
                const updationRes = await updateFollowers({
                    targetUserId: stagedAction.value,
                    currentUserId: req.body.userId,
                    type: stagedAction.type,
                    log: log
                });

                log("Update Followers Response:", updationRes);

                // Log the result of the update operation
                if (updationRes.ok) {
                    log(`${req.body.userName} (${req.body.userId}) ${stagedAction.type} ${stagedAction.value}`);
                } else {
                    log("Failed to update followers");
                }
              
                // else if(){
                //will add other type of stagedActions in payload in order to perform more operations 
                // }
            } else {
                log("Invalid update type:", stagedAction.type);
            }
        } else {
            log("Event not related to user profile updates");
        }
    } else {
        log("Trigger not recognized");
    }

    return res.empty();
}
