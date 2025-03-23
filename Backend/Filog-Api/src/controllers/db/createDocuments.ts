import dbService from "@services/dbService";
import { AuthenticatedRequest, BlogBody } from "@type/request/body";
import { Response } from "express";

/**
 * Creates a new blog in the database.
 * @param req - The authenticated request containing the blog data.
 * @param res - The response object to send the result.
 */
export async function createBlog(req:AuthenticatedRequest<{},{},BlogBody>,res:Response){
    const blog = await dbService.createBlog(req.body);
    res.status(blog.code).send(blog)
}