import { Request,Response } from "express";
import authServerice from "@services/authService"
import { AuthenticatedRequest, LoginBody, SignupBody } from "@type/request/body";
import dbService from "@services/dbService";
import { createJwt } from "@lib";

export async function signup(req:Request<{},{},SignupBody>,res:Response){
    const user = await authServerice.createUser(req.body);
    res.status(user.code).send(user)
}

export async function login(req:Request<{},{},LoginBody>,res:Response){
    const areCredsValid = await authServerice.verifyCreds(req.body)
    if(areCredsValid.code!==200) {res.status(areCredsValid.code).send(areCredsValid);return}
    const user = await dbService.getUser({email:req.body.email});
    if(user==null){ res.status(500).send({res:null,message:"Internal Server Error",code:500}) ;return}
    if(!user) { res.status(404).send({res:null,message:"No account found",code:404}); return}
    
    const cookie = createJwt(user);
    res.cookie("auth_token",cookie,{
        httpOnly:true,
        maxAge:Date.now()+1000*60*60*24*15,
        secure:true
    })
    res.status(200).send({res:null,message:"Session creation successfull",code:200})
}

export async function getUserDetails(req:AuthenticatedRequest,res:Response){
    const userProfile = await authServerice.getUserProfile(req.userData?._id as string);
    if(userProfile.code!==200) {res.status(userProfile.code).send(userProfile);return}
    const userDetails = {
        userData:req.userData,
        userProfile:userProfile.res
    }
    res.status(200).send({code:200,res:userDetails,message:"User Data Found"})
}