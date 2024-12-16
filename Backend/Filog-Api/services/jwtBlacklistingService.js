const {appwriteDBService} = require('../appwrite-services/appwrite-dbService');
const logger = require("../libs").envLogger;

module.exports.jwtBlacklistingService = async function (token,userId) {
    try {
    
     
        const tokenDocument = await appwriteDBService.getTokenDocument(userId);
        if(tokenDocument.$id){
          if(tokenDocument.tokens.includes(token)){
            logger.info("Token is blacklisted");
            return { isDocumentPresent:true, isBlackListed:true, tokenDocument};
          } 
          logger.warn("Token is not blacklisted");
          return { isDocumentPresent:true, isBlackListed:false, tokenDocument}
        }
        logger.warn("Token is not blacklisted");
        return { isDocumentPresent:false, isBlackListed:false, tokenDocument:null};
    } catch (error) {
      logger.error("Error getting blacklisting status",error);
      return error;
     
    }

}