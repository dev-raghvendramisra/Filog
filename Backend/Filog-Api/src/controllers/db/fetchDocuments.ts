import dbService from "@services/dbService";
import { DBQuery, QueryRequest } from "@type/request/query";
import {Response} from 'express'

export async function getUsers(req:QueryRequest, res:Response){
  const queryObj = req.dbQuery as DBQuery
  const users = await dbService.getUserProfiles(queryObj)
  res.status(users.code).send(users)
}

export async function getBlogs(req:QueryRequest, res:Response){
  const queryObj = req.dbQuery as DBQuery
  const blogs = await dbService.getBlogs(queryObj)
  console.log(blogs)
  if(blogs.res!==null && blogs.res.length){blogs.res=blogs.res.filter(blog=>blog.status==true)}
  res.status(blogs.code).send(blogs)
}