import dbService from "@services/dbService";
import { AuthenticatedRequest, BlogBody } from "@type/request/body";
import { Response } from "express";

export async function createBlog(req:AuthenticatedRequest<{},{},BlogBody>,res:Response){
    const blog = await dbService.createBlog(req.body);
    res.status(blog.code).send(blog)
}