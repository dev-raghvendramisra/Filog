import { AuthenticatedRequest } from "@type/request/body";
import { Response } from "express";

export async function logoutUser(req:AuthenticatedRequest,res:Response){
    res.clearCookie('auth_token')
    res.status(200).send({code:200,message:"Logged out successfully",res:null})    
}