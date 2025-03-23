import dbService from "@services/dbService";
import { AuthenticatedRequest, UpdateBlogBody, UpdateProfileBody, UserDataInCookie } from "@type/request/body";
import { NextFunction, Response } from "express";



/**
 * Middleware to validate ownership of a blog before allowing updates.
 * Ensures that the user making the request is the owner of the blog being updated.
 * 
 * @param req - The authenticated request object containing user data and parameters.
 * @param res - The response object to send responses to the client.
 * @param next - The next middleware function in the stack.
 */
export async function blogOwnershipValidator(req:AuthenticatedRequest<{_blogId:string},{},UpdateBlogBody>,res:Response,next:NextFunction){
    const {_id:userId} = req.userData as UserDataInCookie
    const blog = await dbService.getBlogs({filters:{userId,_id:req.params._blogId}})

    if(blog.code==500){res.status(blog.code).send(blog);return}

    // 0 document means that userId in the document does'nt matches the user's  _id in the cookie
    if(!blog.res?.length){res.status(403).send({code:403,message:"Request to update the document is forbidden",res:null});return}
    next()   
}