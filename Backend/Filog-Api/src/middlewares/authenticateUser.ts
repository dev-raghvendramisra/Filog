import { envLogger as logger, verifyJwt } from "@lib";
import { UserDataInCookie, AuthenticatedRequest } from "@type/request/body";
import { NextFunction, Response } from "express";

export default async function authenticateUser(req:AuthenticatedRequest,res:Response,next:NextFunction){
    try {
       const {auth_token} = req.cookies
       const data = verifyJwt(auth_token) as UserDataInCookie
       req.userData = data;
       next()
    } catch (error) { 
        logger.error(`AUTHENTICATION_ERROR: ${error}`)
        res.status(401).send({res:null,code:401,message:"Unauthorized"})
    }
}