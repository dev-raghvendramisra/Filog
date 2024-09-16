import dbServices from "../Services/dbService.js";
import { handleBlogNotFound } from "../utils/index.js";

export default async function handleBlogComments({blogId,currentUserProfile,userId,type,log,currentUserProfileVersion}){
   log("Fetching target blog...");
   let targetBlog =  await dbServices.getBlog(blogId,log);
   if(!targetBlog.$id){
     return handleBlogNotFound(blogId,userId,log);
   }
   let targetBlogVersion = targetBlog.version==null ? 1 : targetBlog.version==0 ? 1 : targetBlog.version; 
   log("Target Blog found successfully:",targetBlog);
   
   const existingCommentCount = targetBlog.commentCount || 0;
   let updatedCommentCount;
   
   if(type === "addComment"){
     updatedCommentCount = existingCommentCount + 1;
   } else if(type === "deleteComment"){
     updatedCommentCount = existingCommentCount - 1;
   } else {
     throw new Error("Invalid type");
   }

   log("Updated Comment Count:",updatedCommentCount);
   log("Fetching initiating user profile again to check version...");
   const initiatingUserProfile = await dbServices.getUserProfile(userId,log);
    if(!initiatingUserProfile.$id){
      log("Initiating user profile not found");
      return {ok:false,res:initiatingUserProfile};
    }
    log("Initiating User Profile found successfully:",initiatingUserProfile);
    log("Previous User Profile Version:",currentUserProfileVersion);
    log("Current User Profile Version:",initiatingUserProfile.version);

    if(initiatingUserProfile.version !== currentUserProfileVersion){
        log("Profile version mismatch, aborting current operation...");
        log("Proceeding to update blog...")
    } else {
        log("Updating initiating user profile...");
        log("Marking staged action as null...");
        const updateProfileRes = await dbServices.updateProfileDocument({
            profileId:currentUserProfile.$id,
            version: initiatingUserProfile.version + 1,
            stagedAction:null,
            log
        });
        log("Update Profile Response:",updateProfileRes);
        if(!updateProfileRes.ok){
            log("Failed to update profile");
            return {ok:false,res:updateProfileRes};
        }
    }

    log("Fetching targetBlog again to check version...");
    targetBlog = await dbServices.getBlog(blogId,log);

    if (!targetBlog.$id) {
        log("Target blog not found");
        return { ok: false, res: targetBlog };
    }
    log("Target Blog found successfully:", targetBlog);
    log("Previous Blog Version:", targetBlogVersion);
    log("Current Blog Version:", targetBlog.version);

    if(targetBlog.version !== targetBlogVersion){
    log("Blog version mismatch, aborting current operation...");
    return {ok:false,res:targetBlog};
    }
    log("Updating target blog...");
    const updateBlogRes = await dbServices.updateBlogDocument({
        blogId: blogId,
        updatedCommentCount,
        version: targetBlog.version + 1,
        log
    });
    if (updateBlogRes.$id) {
        log("Target blog comment count updated successfully:", updateBlogRes);
        return { ok: true, res: updateBlogRes };
    }
    else {
        log("Failed to update target blog comment count");
        return { ok: false, res: updateBlogRes };
    }
}


