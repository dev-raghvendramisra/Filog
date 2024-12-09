const {appwriteDBService} = require('../appwrite-services/appwrite-dbService');


module.exports.jwtBlacklistingService = async function (token,userId) {
    try {
    
     
        const tokenDocument = await appwriteDBService.getTokenDocument(userId);
        if(tokenDocument.$id){
          if(tokenDocument.tokens.includes(token)){
            console.log("Token is blacklisted");
            return { isDocumentPresent:true, isBlackListed:true, tokenDocument};
          } 
          console.log("Token is not blacklisted");
          return { isDocumentPresent:true, isBlackListed:false, tokenDocument}
        }
        console.log("Token is not blacklisted");
        return { isDocumentPresent:false, isBlackListed:false, tokenDocument:null};
    } catch (error) {
      console.log("Error getting blacklisting status",error);
      return error;
     
    }

}