import {jwtBlacklistingService} from "@services"
import { handleJwtError,verifyJwt,envLogger as logger } from "@lib";
import { appwriteAuthService, appwriteDBService } from "@appwrite";
import { JwtPayload } from "jsonwebtoken";

export default async function jwtVerificationService(token:string,userId:string,statusOnly=false) {
    try {

        const status  = await jwtBlacklistingService(token, userId)
        if(!status){
            return {ok:false,res:"Internal server error",code:500}
        }
        const {isBlackListed, isDocumentPresent,tokenDocument} = status;
        if(isBlackListed){
            return {ok:false,res:"Invalid Token",code:400}
        }
        if(isDocumentPresent){
            const blackListTokenRes = await appwriteDBService.blackListToken(false,userId,token,tokenDocument.tokens)
            if(!blackListTokenRes?.$id) return {ok:false,res:"Internal server error",code:500}
        }
        else {
            const blackListTokenRes = await appwriteDBService.blackListToken(true,userId,token)
            if(blackListTokenRes?.$id)return {ok:false,res:"Internal server error",code:500}
        }
        
        const decoded = verifyJwt(token) as JwtPayload;
        if (decoded.userId != userId) {
            logger.error(`Invalid token`)
            return {ok:false,res:"Invalid token",code:400}
        }
        
        if(statusOnly){
            return {ok:true,res:"Token Verified Successfully", code:200}
        }

        const verifyEmail = await appwriteAuthService.verifyEmail(userId)
        if (verifyEmail.ok) {
            return {ok:true,res:verifyEmail.res,code:200}
        } 
        logger.error(`Failed to verify email: ${verifyEmail.res}`)
        return {ok:false,res:verifyEmail.res,code:500}
        
    } catch (error : any) {
        const isJwtErr = handleJwtError(error.name);
        if(isJwtErr){
            logger.error(`Error verifying token: ${isJwtErr.res}`)
            return {ok:false,res:isJwtErr.res,code:isJwtErr.code}
        }
        logger.error(`Error verifying token: ${error.message}`)
        return {ok:false,res:error.message,code:400}
    }
}