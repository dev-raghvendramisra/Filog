import dbServices from "../Services/dbService";
import { abortDuplicateAction,handleBlogNotFound } from "../utils";

export default async function handleLike_Unlike({ blogId, userId, type, log, currentUserProfile, userProfileVersion }) {
    log("Fetching target blog...");
    let targetBlog = await dbServices.getBlog(blogId, log);
    let targetBlogVersion;
    if (!targetBlog.$id) {
        return handleBlogNotFound(userId, blogId, log);
    }
    targetBlogVersion = targetBlog.version==null?1:targetBlog.version;

    log("Target Blog found successfully:", targetBlog);

    const existingLikes = targetBlog.likes || [];
    let updatedLikeArray;
    let updatedLikeCount;

    // Update the likes list
    if (type === "like") {
        updatedLikeArray = [...existingLikes, userId];
        updatedLikeCount = targetBlog.likeCount + 1;
    } else if (type === "unlike") {
        updatedLikeArray = existingLikes.filter(user => user !== userId);
        updatedLikeCount = targetBlog.likeCount - 1;
    } else {
        throw new Error("Invalid type");
    }

    log("Updated Likes:", updatedLikeArray);
    // Fetch initiating user profile again to check version
    const initiatingUserProfile = await dbServices.getUserProfile(userId, log);
    if (!initiatingUserProfile.$id) {
        log("Initiating user profile not found");
        return { ok: false, res: initiatingUserProfile };
    }

    log("Initiating User Profile found successfully:", initiatingUserProfile);

    // Handle profile version mismatch
    if (userProfileVersion !== initiatingUserProfile.version) {
        log("Profile version mismatch - recreating likes array");
        log("Previous version:", version);
        log("Current version:", initiatingUserProfile.version);

        if (JSON.stringify(initiatingUserProfile.likes) === JSON.stringify(updatedLikeArray)) {
            log("Duplicate stagedAction detected, aborting current operation...");
            return await abortDuplicateAction(initiatingUserProfile, log);
        }

        updatedLikeArray = [...initiatingUserProfile.likes, ...updatedLikeArray];
        log("Recreated Likes array:", updatedLikeArray);
    }

    // Update the initiating user profile
    const updateStagedActionRes = await dbServices.updateProfileDocument({
        profileId: initiatingUserProfile.$id,
        stagedAction: null,
        likes:updatedLikeArray,
        version: version + 1,
        log
    });

    if (!updateStagedActionRes.$id) {
        log("Failed to update initiating user profile");
        return { ok: false, res: updateStagedActionRes };
    } 
    log("Marked staged Action as null and initiating user profile likes list updated successfully:", updateStagedActionRes);
    log("Fetching target blog again to check version...");

        // Fetch target blog again to check version
        targetBlog = await dbServices.getBlog(blogId, log);
        if (!targetBlog.$id) {
            log("Target blog not found");
            return { ok: false, res: targetBlog };
        }
        if(targetBlog.version !== targetBlogVersion){
            log("Blog version mismatch - aborting current operation...");
            log("Previous Blog version:", targetBlogVersion);
            log("Current Blog version:", targetBlog.version);

          if(JSON.stringify(targetBlog.likes) === JSON.stringify(updatedLikeArray)){
            log("Duplicate stagedAction detected, aborting current operation...");
            return await abortDuplicateAction(targetBlog, log);
          }
          updatedLikeCount = targetBlog.likeCount+1;
          log("Recreated like count :", updatedLikeCount);

        }
        const updateBlogRes = await dbServices.updateBlogDocument({
            blogId: targetBlog.$id,
            likes: updatedLikeArray,
            likesCount: updatedLikeCount,
            log
        });
        if (updateBlogRes.$id) {
            log("Target blog likes count updated successfully:", updateBlogRes);
            return { ok: true, res: updateBlogRes };
        }
        else{
            log("Failed to update target blog likes count");
            return { ok: false, res: updateBlogRes };
        }
}