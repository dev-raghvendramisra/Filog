//description: getJWTBlackListingStatus function is used to check if the token is blacklisted or not.
//It uses getTokenDocument function from dbServices to get the token document from the database
//It returns an object with isDocumentPresent, isBlackListed and tokenDocument properties

import {dbServices} from "../appwrite-services/index.js"

export default async function getJWTBlackListingStatus(token,userId) {
   try {
    
     
       const tokenDocument = await dbServices.getTokenDocument(userId);
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