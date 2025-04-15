import { envLogger as logger, verifyJwt } from "@lib";
import { UserDataInCookie, AuthenticatedRequest } from "@type/request/body";
import { NextFunction, Response } from "express";

/**
 * Middleware to authenticate users by verifying their session JWT.
 * Attaches user data to the request object if authentication is successful.
 * @param req - The Express request object.
 * @param res - The Express response object.
 * @param next - The next middleware function.
 */
export default async function authenticateUser(req:AuthenticatedRequest,res:Response,next:NextFunction){
    try {
       const {auth_token} = req.cookies
       const data = verifyJwt("SESSION",auth_token) as UserDataInCookie
       req.userData = data;
       next()
    } catch (error) { 
        res.status(401).send({code:401,message:"Unauthorized",res:null})
    }
}