import { Request,Response } from "express";
import { AuthenticatedRequest, LoginBody, SignupBody, UserDataInCookie } from "@type/request/body";
import dbService from "@services/dbService";
import { sendSessionCookie } from "@utils/authUtils";
import { envLogger as logger } from "@lib";
import authService from "@services/authService";

export async function signup(req:Request<{},{},SignupBody>,res:Response){
    const user = await authService.createUser(req.body);
    res.status(user.code).send(user)
}

export async function login(req:Request<{},{},LoginBody>,res:Response){
    const areCredsValid = await authService.verifyCreds(req.body)
    if(areCredsValid.code!==200) {res.status(areCredsValid.code).send(areCredsValid);return}
    const user = await dbService.getUserData({email:req.body.email});
    if(user.code!==200){ res.status(user.code).send(user) ;return}

    sendSessionCookie(res,user)
    res.status(200).send({res:null,message:"Session creation successfull",code:200})
}

export async function getUserDetails(req:AuthenticatedRequest,res:Response){
    const userData = await dbService.getUserData({_id:req.userData?._id as string})
    if(userData.code!==200){res.status(userData.code).send(userData);return}
    const userProfile = await dbService.getUserProfile(req.userData?._id as string);
    if(userProfile.code!==200) {res.status(userProfile.code).send(userProfile);return}
    const userDetails = {
        userData:userData.res,
        userProfile:userProfile.res
    }
    res.status(200).send({code:200,res:userDetails,message:"User Data Found"})
}

export async function logout(req:AuthenticatedRequest,res:Response){
    res.clearCookie('auth_token')
    res.status(200).send({code:200,message:"Logged out successfully",res:null})    
}

export   async function resetPassword(req:AuthenticatedRequest, res:Response) {
    try {

        const { password } = req.body
        const {_id:userId} = req.userData as UserDataInCookie
        const passRes = await authService.resetPass(userId, password);
        res.status(passRes.code).send(passRes)
        return

    } catch (error) {
        logger.error(`ERR_RESETTING_PASSWORD_IN_RESET_PASSWORD_CONTROLLER ${error}`);
        res.status(500).send({ ok: false, res: "Internal server error", code: 500 })
        return
    }
}