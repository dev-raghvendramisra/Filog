import conf from "./conf/conf.js";
import handleFollow_Unfollow from './Handle-Follow-Unfollow/handleFollow_Unfollow.js';
import handleLike_Unlike from './Handle-Like-Unlike/handleLike_Unlike.js';
import handleBlogComments from "./Handle-Blog-Comments/handleBlogComments.js";
import handleBucketCleanup from "./Handle-Bucket-Cleanup/handleBucketCleanup.js";
import handleReadGenNotification from "./Handle-Notifications/handleReadGenNotification.js";
import handleRemoveGenNotification from "./Handle-Notifications/handleRemoveNotifiication.js"

export default async function handler({ req, res, log }) {
     const stagableActions = ["follow", "unfollow", "like","unlike","addComment","deleteComment","bucketCleanup","readGenNotification","removeGenNotification"];


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
            const version = req.body.version ? req.body.version : null; // Version of the document
            log("Version:", version);

            if (!stagedActionJson) {
                log("This is not the event to perform operations");
                return res.empty();
            }

            // Convert updated attribute JSON to an object
            const stagedAction = JSON.parse(stagedActionJson);
            log("Updated Attribute:", stagedAction);

            // Process the update if it's a follow or unfollow event
            if(stagableActions.includes(stagedAction.type)){
                log("Processing update for:", stagedAction);

                if(stagedAction.type === "like" || stagedAction.type === "unlike"){
                    const updationRes = await handleLike_Unlike({
                        blogId: stagedAction.value,
                        userId: req.body.userId,
                        type: stagedAction.type,
                        log,
                        currentUserProfile: req.body,
                        currentUserProfileVersion:req.body.version==null ? 1 : req.body.version ==0 ? 1 : req.body.version,
                    });

                    log("Update Likes Response:", updationRes);
                    if (updationRes.ok) {
                        log(`${req.body.userName} (${req.body.userId}) ${stagedAction.type}d ${stagedAction.value}`);
                    } else {
                        log("Failed to update likes");
                    }
                }
                else if(stagedAction.type === "follow" || stagedAction.type === "unfollow"){
                    const updationRes = await handleFollow_Unfollow({
                        targetUserId: stagedAction.value,
                        userId: req.body.userId,
                        type: stagedAction.type,
                        log: log,
                        currentUserProfile: req.body,
                        currentUserProfileVersion:req.body.version==null ? 1 : req.body.version ==0 ? 1 : req.body.version,
                    });
    
                    log("Update Followers Response:", updationRes);
                    if (updationRes.ok) {
                        log(`${req.body.userName} (${req.body.userId}) ${stagedAction.type}ed ${stagedAction.value}`);
                    } else {
                        log("Failed to update followers");
                    }
                }
                else if(stagedAction.type === "addComment" || stagedAction.type === "deleteComment"){
                    const updationRes = await handleBlogComments({
                        blogId: stagedAction.value,
                        userId: req.body.userId,
                        type: stagedAction.type,
                        log,
                        currentUserProfile: req.body,
                        currentUserProfileVersion:req.body.version==null ? 1 : req.body.version ==0 ? 1 : req.body.version,
                    });

                    log("Update Comments Response:", updationRes);
                    if(updationRes.ok){
                        log(`${req.body.userName} (${req.body.userId}) ${stagedAction.type}ed ${stagedAction.value}`);
                    } else {
                        log("Failed to update comments");
                    }
                } 
                else if(stagedAction.type === "bucketCleanup"){
                    const bucketCleanupRes = await handleBucketCleanup({
                        userId: req.body.userId,
                        log,
                        assetId: stagedAction.value,
                        currentUserProfile: req.body,
                    });
                    log("Bucket Cleanup Response:", bucketCleanupRes);
                    if(bucketCleanupRes.ok){
                        log(`${req.body.userName} (${req.body.userId}) cleaned up the bucket from asset(${stagedAction.value}) `);
                    } else {
                        log("Failed to clean up the bucket");
                    }
                }
                else if(stagedAction.type=="readGenNotification"){
                    const readGenNotificationRes = await handleReadGenNotification({
                        userId: req.body.userId,
                        log,
                        userProfileVersion: req.body.version==null ? 1 : req.body.version ==0 ? 1 : req.body.version,
                        notificationId: stagedAction.value,
                    });
                    log("Read Gen Notification Response:", readGenNotificationRes);
                    if(readGenNotificationRes.ok){
                        log(`${req.body.userName} (${req.body.userId}) read the general notification`);
                    } else {
                        log("Failed to read the general notification");
                }}
                else if(stagedAction.type=="removeGenNotification"){
                    const removeGenNotificationRes = await handleRemoveGenNotification({
                        userId: req.body.userId,
                        log,
                        userProfileVersion: req.body.version==null ? 1 : req.body.version ==0 ? 1 : req.body.version,
                        notificationId: stagedAction.value,
                    });
                    log("Remove Gen Notification Response:", removeGenNotificationRes);
                    if(removeGenNotificationRes.ok){
                        log(`${req.body.userName} (${req.body.userId}) removed the general notification`);
                    } else {
                        log("Failed to remove the general notification");
               }
            }
        }
              
            else {
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
