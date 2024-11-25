const { jwtBlacklistingService } = require("./jwtBlacklistingService")
const { appwriteDBService, appwriteAuthService } = require("../appwrite-services")
const { verifyJwt } = require("../libs/jwt")

module.exports.jwtVerificationService = async function(token,userId,statusOnly=false) {
    try {

        const { isDocumentPresent, isBlackListed, tokenDocument } = await jwtBlacklistingService(token, userId)
        if(isBlackListed){
            return {ok:false,res:"Token blacklisted",code:401}
        }
        if(isDocumentPresent){
            console.log("Blacklisting token...")
            const blackListTokenRes = await appwriteDBService.blackListToken(false,userId,token,tokenDocument.tokens)
            if(blackListTokenRes.$id){
                console.log("Token blacklisted successfully")
            }
        }
        else {
            console.log("Token document is not present, creating it and blacklisting token...")
            const blackListTokenRes = await appwriteDBService.blackListToken(true,userId,token)
            if(blackListTokenRes.$id){
                console.log("Token blacklisted successfully")
            }
        }
        console.log("proceeding with token verification...");
        
        const decoded = verifyJwt(token)
        if (decoded.userId != userId) {
            console.log("Invalid token")
            return {ok:false,res:"Invalid token",code:400}
        }
        
        console.log("Token verified successfully")
        if(statusOnly){
            return {ok:true,res:"Token Verified Successfully", code:200}
        }

        const verifyEmail = await appwriteAuthService.verifyEmail(userId)
        if (verifyEmail.ok) {
            console.log("Email verified successfully")
            return {ok:true,res:verifyEmail.res,code:200}
        } 
        console.log("Failed to verify email", verifyEmail.res)
        return {ok:false,res:verifyEmail.res,code:500}
        
    } catch (error) {
        if (error.name == "TokenExpiredError") {
            console.log("Token expired");
            return {ok:false,res:"Token expired",code:401}
        }
        console.log("Error verifying token:", error.message)
        return {ok:false,res:error.message,code:400}
    }
}