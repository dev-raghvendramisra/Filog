import dbService from "@services/dbService";
import { DBQuery, QueryRequest } from "@type/request/query";
import {Response} from 'express'

export async function getUsers(req:QueryRequest, res:Response){
  const queryObj = req.dbQuery as DBQuery
  console.log(queryObj)
  const users = await dbService.getUserProfiles(queryObj)
  res.status(users.code).send(users)
}