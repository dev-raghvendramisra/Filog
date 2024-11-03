import dbServices from "../Services/dbService.js";
import { abortDuplicateAction, handleBlogNotFound, handleNotificationCreation_Deletion } from "../utils/index.js";

export default async function handleLike_Unlike({ blogId, userId, type, log, currentUserProfileVersion, currentUserProfile }) {
    log("Fetching target blog...");
    let targetBlog = await dbServices.getBlog(blogId, log);
    const notification = {
        type: "custom",
        userId: targetBlog.userId,
        message: `${currentUserProfile.userName} has liked your blog`,
        icon: currentUserProfile.userAvatar
    }
    if (!targetBlog.$id) {
        return handleBlogNotFound(blogId, userId, log);
    }
    let targetBlogVersion = targetBlog.version==null ? 1 : targetBlog.version==0 ? 1 : targetBlog.version; 
    
    log("Target Blog found successfully:", targetBlog);

    const existingLikeArray = currentUserProfile.blogsLiked || [];
    const existingLikeCount = targetBlog.likeCount || 0;
    let updatedLikeArray;
    let updatedLikeCount;

    // Update the likes list
    if (type === "like") {
        updatedLikeArray = [...existingLikeArray, blogId];
        updatedLikeCount = existingLikeCount + 1;
    } else if (type === "unlike") {
        updatedLikeArray = existingLikeArray.filter(blogID => blogID !== blogId);
        updatedLikeCount = existingLikeCount - 1;
    } else {
        throw new Error("Invalid type");
    }

    log("Updated Likes:", updatedLikeArray);
    // Fetch initiating user profile again to check version
    log("Fetching initiating user profile again to check version...");
    const initiatingUserProfile = await dbServices.getUserProfile(userId, log);
    if (!initiatingUserProfile.$id) {
        log("Initiating user profile not found");
        return { ok: false, res: initiatingUserProfile };
    }

    log("Initiating User Profile found successfully:", initiatingUserProfile);

    // Handle profile version mismatch
    if (currentUserProfileVersion !== initiatingUserProfile.version) {
        log("Profile version mismatch - recreating likes array");
        log("Previous version:", currentUserProfileVersion);
        log("Current version:", initiatingUserProfile.version);

        if (JSON.stringify(initiatingUserProfile.blogsLiked) === JSON.stringify(updatedLikeArray)) {
            log("Duplicate stagedAction detected, aborting current operation...");
            return await abortDuplicateAction(initiatingUserProfile, log);
        }

        updatedLikeArray = [...initiatingUserProfile.blogsLiked, ...updatedLikeArray];
        log("Recreated Likes array:", updatedLikeArray);
    }

    // Update the initiating user profile
    const updateStagedActionRes = await dbServices.updateProfileDocument({
        profileId: initiatingUserProfile.$id,
        stagedAction: null,
        blogsLiked: updatedLikeArray,
        version: initiatingUserProfile.version + 1,
        log
    });

    if (!updateStagedActionRes.$id) {
        log("Failed to update initiating user profile");
        return { ok: false, res: updateStagedActionRes };
    }
    log("Marked staged Action as null and initiating user profile likes list updated successfully:", updateStagedActionRes);
    log("Fetching target blog again to check version...");
    targetBlog = await dbServices.getBlog(blogId, log);
    if (!targetBlog.$id) {
        log("Target blog not found");
        return { ok: false, res: targetBlog };
    }
    log("Target Blog found successfully:", targetBlog);

    if (targetBlog.version !== targetBlogVersion) {
        log("Blog version mismatch - aborting current operation...");
        log("Previous Blog version:", targetBlogVersion);
        log("Current Blog version:", targetBlog.version);

        if (targetBlog.likeCount === updatedLikeCount) {
            log("Duplicate stagedAction detected, aborting current operation...");
            return await abortDuplicateAction(targetBlog, log);
        }
        updatedLikeCount = targetBlog.likeCount + 1;
        log("Recreated like count :", updatedLikeCount);

    }
    if (type === "like") {
        const notificationRes = await handleNotificationCreation_Deletion({ log, notification });
        if(notificationRes.ok){
            log("Notification created successfully");
        }
        else log("Failed to create notification");
    }
    if(type === "unlike"){
        const notification = await dbServices.getNotification("custom",targetBlog.userId,log);
        if(!notification.$id){
            log("Notification not found");
        }else {
        const notificationRes = await handleNotificationCreation_Deletion({log,notificationId:notification.$id});
        if(notificationRes.ok){
            log("Notification deleted successfully");
        }
        else log("Failed to delete notification");
        }
    }
    const updateBlogRes = await dbServices.updateBlogDocument({
        blogId: targetBlog.$id,
        likes: updatedLikeArray,
        version: targetBlog.version + 1,
        updatedLikeCount: updatedLikeCount,
        log
    });
    if (updateBlogRes.$id) {
        log("Target blog likes count updated successfully:", updateBlogRes);
        return { ok: true, res: updateBlogRes };
    }
    else {
        log("Failed to update target blog likes count");
        return { ok: false, res: updateBlogRes };
    }
}