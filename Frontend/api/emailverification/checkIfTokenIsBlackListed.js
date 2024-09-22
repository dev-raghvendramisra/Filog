import dbServices from "../services/dbService";

export default async function checkIfTokenIsBlackListed(token,userId) {
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
}