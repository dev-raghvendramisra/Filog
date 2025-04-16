import { createJwt, envLogger as logger, verifyJwt } from "@lib";
import { UserDataInCookie, AuthenticatedRequest } from "@type/request/body";
import { NextFunction, Response } from "express";
import { Types } from "mongoose";

/**
 * Middleware to authenticate users by verifying their session JWT.
 * Attaches user data to the request object if authentication is successful.
 * @param req - The Express request object.
 * @param res - The Express response object.
 * @param next - The next middleware function.
 */
export default async function authenticateUser(req:AuthenticatedRequest,res:Response,next:NextFunction){
    try {
       const token = createJwt("API",{id:new Types.ObjectId().toString("hex")},60*6600)
       res.setHeader("X-CSRF-Token",token)
       const {auth_token} = req.cookies
       const data = verifyJwt("SESSION",auth_token) as UserDataInCookie
       req.userData = data;
       next()
    } catch (error) { 
        res.status(401).send({code:401,message:"Unauthorized",res:null})
    }
}