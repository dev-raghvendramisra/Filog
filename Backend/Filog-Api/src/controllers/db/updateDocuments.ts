import dbService from "@services/dbService";
import { AuthenticatedRequest, UpdateBlogBody, UpdateProfileBody } from "@type/request/body";
import { Response } from "express";

/**
 * Updates a blog document in the database.
 * @param req - The authenticated request containing the blog ID and updated fields.
 * @param res - The response object to send the result.
 */
export async function updateBlog(req:AuthenticatedRequest<{_blogId:string},{},UpdateBlogBody>,res:Response){
    const updatedBlog = await dbService.updateBlog(req.body);
    res.status(updatedBlog.code).send(updatedBlog)
}

/**
 * Updates a user profile in the database.
 * @param req - The authenticated request containing the user profile ID and updated fields.
 * @param res - The response object to send the result.
 */
export async function updateProfile(req:AuthenticatedRequest<{},{},UpdateProfileBody>,res:Response){
    const updatedProfile = await dbService.updateProfile(req.body);
    res.status(updatedProfile.code).send(updatedProfile)
}

/**
 * Likes a blog and updates the user's liked blogs list.
 * @param req - The authenticated request containing the blog ID.
 * @param res - The response object to send the result.
 */
export async function likeBlog(req:AuthenticatedRequest,res:Response){
  const {_blogId} = req.params
  const userProfile = await dbService.getUserProfile(req.userData?._id as string);
  if(userProfile.code!==200){res.status(userProfile.code).send(userProfile);return}
  if(userProfile.res?.blogsLiked.includes(_blogId)){res.status(409).send({code:409,message:"User already likes this blog",res:null});return}
  const likeBlog = await dbService.likeBlog(_blogId,req.userData?._id as string)
  res.status(likeBlog.code).send(likeBlog)
}

/**
 * Unlikes a blog and updates the user's liked blogs list.
 * @param req - The authenticated request containing the blog ID.
 * @param res - The response object to send the result.
 */
export async function unlikeBlog(req:AuthenticatedRequest,res:Response){
  const {_blogId} = req.params
  const userProfile = await dbService.getUserProfile(req.userData?._id as string);
  if(userProfile.code!==200){res.status(userProfile.code).send(userProfile);return}
  if(!userProfile.res?.blogsLiked.includes(_blogId)){res.status(409).send({code:409,message:"User does not likes this blog",res:null});return}
  const unlike = await dbService.unlike(_blogId,req.userData?._id as string)
  res.status(unlike.code).send(unlike)
}

/**
 * Deletes a blog from the database.
 * @param req - The authenticated request containing the blog ID.
 * @param res - The response object to send the result.
 */
export async function deleteBlog(req:AuthenticatedRequest,res:Response){
    const {_blogId} = req.params
    const deleteBlog = await dbService.deleteBlog(_blogId);
    res.status(deleteBlog.code).send(deleteBlog)
}

/**
 * Follows a user by updating the followers and following lists.
 * @param req - The authenticated request containing the target user ID.
 * @param res - The response object to send the result.
 */
export async function followUser(req:AuthenticatedRequest, res:Response){
    const {_userId} = req.params
    const userProfile = await dbService.getUserProfile(req.userData?._id as string);
  if(userProfile.code!==200){res.status(userProfile.code).send(userProfile);return}
  if(userProfile.res?.following.includes(_userId)){res.status(409).send({code:409,message:"User already follows the request user",res:null});return}
  const followUser = await dbService.followUser(_userId,req.userData?._id as string)
  res.status(followUser.code).send(followUser)
}

/**
 * Unfollows a user by updating the followers and following lists.
 * @param req - The authenticated request containing the target user ID.
 * @param res - The response object to send the result.
 */
export async function unfollowUser(req:AuthenticatedRequest, res:Response){
    const {_userId} = req.params
    const userProfile = await dbService.getUserProfile(req.userData?._id as string);
  if(userProfile.code!==200){res.status(userProfile.code).send(userProfile);return}
  if(!userProfile.res?.following.includes(_userId)){res.status(409).send({code:409,message:"User does'nt follows the requested user",res:null});return}
  const unfollowUser = await dbService.unfollowUser(_userId,req.userData?._id as string)
  res.status(unfollowUser.code).send(unfollowUser)
}

/**
 * Marks a general notification as read for a user.
 * @param req - The authenticated request containing the notification ID.
 * @param res - The response object to send the result.
 */
export async function readGenNotfication(req:AuthenticatedRequest<{_notificationId:string}>, res:Response){
  const read = await dbService.readGeneralNotfication(req.params._notificationId,req.userData?._id as string)
  res.status(read.code).send(read)
}

/**
 * Marks a custom notification as read for a user.
 * @param req - The authenticated request containing the notification ID.
 * @param res - The response object to send the result.
 */
export async function readCustomNotfication(req:AuthenticatedRequest<{_notificationId:string}>, res:Response){
  const read = await dbService.readCustomNotfication(req.params._notificationId,req.userData?._id as string)
  res.status(read.code).send(read)
}

/**
 * Clears a general notification for a user.
 * @param req - The authenticated request containing the notification ID.
 * @param res - The response object to send the result.
 */
export async function clearGeneralNotification(req:AuthenticatedRequest<{_notificationId:string}>,res:Response){
  const clear = await dbService.clearGeneralNotification(req.params._notificationId,req.userData?._id as string)
  res.status(clear.code).send(clear)
}

/**
 * Clears a custom notification for a user.
 * @param req - The authenticated request containing the notification ID.
 * @param res - The response object to send the result.
 */
export async function clearCustomNotification(req:AuthenticatedRequest<{_notificationId:string}>,res:Response){
  const clear = await dbService.clearCustomNotification(req.params._notificationId,req.userData?._id as string)
  res.status(clear.code).send(clear)
}
