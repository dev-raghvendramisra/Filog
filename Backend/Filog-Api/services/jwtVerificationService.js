const { jwtBlacklistingService } = require("./jwtBlacklistingService")
const { appwriteDBService, appwriteAuthService } = require("../appwrite-services")
const { verifyJwt, handleJwtError, envLogger:logger } = require("../libs")

module.exports.jwtVerificationService = async function(token,userId,statusOnly=false) {
    try {

        const { isDocumentPresent, isBlackListed, tokenDocument } = await jwtBlacklistingService(token, userId)
        if(isBlackListed){
            return {ok:false,res:"Token blacklisted",code:401}
        }
        if(isDocumentPresent){
            logger.warn("Blacklisting token...")
            const blackListTokenRes = await appwriteDBService.blackListToken(false,userId,token,tokenDocument.tokens)
            if(blackListTokenRes.$id){
                logger.info("Token blacklisted successfully")
            }
        }
        else {
            logger.warn("Token document is not present, creating it and blacklisting token...")
            const blackListTokenRes = await appwriteDBService.blackListToken(true,userId,token)
            if(blackListTokenRes.$id){
                logger.info("Token blacklisted successfully")
            }
        }
        logger.warn("proceeding with token verification...");
        
        const decoded = verifyJwt(token)
        if (decoded.userId != userId) {
            logger.error("Invalid token")
            return {ok:false,res:"Invalid token",code:400}
        }
        
        logger.info("Token verified successfully")
        if(statusOnly){
            return {ok:true,res:"Token Verified Successfully", code:200}
        }

        const verifyEmail = await appwriteAuthService.verifyEmail(userId)
        if (verifyEmail.ok) {
            logger.info("Email verified successfully")
            return {ok:true,res:verifyEmail.res,code:200}
        } 
        logger.error("Failed to verify email", verifyEmail.res)
        return {ok:false,res:verifyEmail.res,code:500}
        
    } catch (error) {
        const isJwtErr = handleJwtError(error.name);
        if(isJwtErr){
            logger.error("Error verifying token:", isJwtErr.res)
            return {ok:false,res:isJwtErr.res,code:isJwtErr.code}
        }
        logger.error("Error verifying token:", error.message)
        return {ok:false,res:error.message,code:400}
    }
}