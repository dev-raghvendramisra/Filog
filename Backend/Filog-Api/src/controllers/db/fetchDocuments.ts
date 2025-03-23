import dbService from "@services/dbService";
import { DBQuery, QueryRequest } from "@type/request/query";
import {Response} from 'express'

/**
 * Fetches user profiles based on the provided query.
 * @param req - The request containing the parsed query object.
 * @param res - The response object to send the result.
 */
export async function getUsers(req:QueryRequest, res:Response){
  const queryObj = req.dbQuery as DBQuery
  const users = await dbService.getUserProfiles(queryObj)
  res.status(users.code).send(users)
}

/**
 * Fetches blogs based on the provided query.
 * Filters out unpublished blogs before sending the response.
 * @param req - The request containing the parsed query object.
 * @param res - The response object to send the result.
 */
export async function getBlogs(req:QueryRequest, res:Response){
  const queryObj = req.dbQuery as DBQuery
  const blogs = await dbService.getBlogs(queryObj)
  if(blogs.res!==null && blogs.res.length){blogs.res=blogs.res.filter(blog=>blog.status==true)}
  res.status(blogs.code).send(blogs)
}