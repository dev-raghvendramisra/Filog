//description: getJWTVerificationStatus function is used to verify the jwt token and check if the token is blacklisted or not
//It uses getJWTBlackListingStatus function to check if the token is blacklisted or not
//It also uses verifyEmail function from authServices to verify the email of the user
//It returns an object with ok, res and code properties

import {getJWTBlackListingStatus} from "../utils/index.js"
import jwt from 'jsonwebtoken';
import conf from '../conf/conf.js';
import {dbServices} from "../services/index.js";
import {authServices} from "../services/index.js";


export default async function getJWTVerificationStatus(token,userId) {
    try {

        const { isDocumentPresent, isBlackListed, tokenDocument } = await getJWTBlackListingStatus(token, userId)
        if(isBlackListed){
            return {ok:false,res:"Token blacklisted",code:401}
        }
        if(isDocumentPresent){
            console.log("Blacklisting token...")
            const blackListTokenRes = await dbServices.blackListToken(false,userId,token,tokenDocument.tokens)
            if(blackListTokenRes.$id){
                console.log("Token blacklisted successfully")
            }
        }
        if (!isDocumentPresent) {
            console.log("Token document is not present, creating it and blacklisting token...")
            const blackListTokenRes = await dbServices.blackListToken(true,userId,token)
            if(blackListTokenRes.$id){
                console.log("Token blacklisted successfully")
            }
        }

        const decoded = jwt.verify(token, conf.jwtSecret)
        if (decoded.userId != userId) {
            console.log("Invalid token")
            return {ok:false,res:"Invalid token",code:401}
        }
        console.log("Token verified successfully")
        const verifyEmail = await authServices.verifyEmail(userId)
        if (verifyEmail.ok) {
            console.log("Email verified successfully")
            return {ok:true,res:verifyEmail.res,code:200}
        } 
        console.log("Failed to verify email", verifyEmail.res)
        return {ok:false,res:verifyEmail.res,code:500}
        
    } catch (error) {
        if (error.name == "TokenExpiredError") {
            return {ok:false,res:"Token expired",code:401}
        }
        console.log("Error verifying token:", error.message)
        return {ok:false,res:error.message,code:400}
    }
}