import dbService from "@services/dbService";
import { AuthenticatedRequest, UpdateBlogBody, UpdateProfileBody } from "@type/request/body";
import { Response } from "express";

export async function updateBlog(req:AuthenticatedRequest<{},{},UpdateBlogBody>,res:Response){
    const updatedBlog = await dbService.updateBlog(req.body);
    res.status(updatedBlog.code).send(updatedBlog)
}


export async function updateProfile(req:AuthenticatedRequest<{},{},UpdateProfileBody>,res:Response){
    const updatedProfile = await dbService.updateProfile(req.body);
    res.status(updatedProfile.code).send(updatedProfile)
}