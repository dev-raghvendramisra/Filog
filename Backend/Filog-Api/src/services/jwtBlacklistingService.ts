import { appwriteDBService } from "@appwrite";
import { envLogger as logger } from "@lib";

export default   async function jwtBlacklistingService(token : string,userId : string) : Promise<{isDocumentPresent:boolean, isBlackListed:boolean, tokenDocument:any} | null> {
    try {
      const tokenDocument = await appwriteDBService.getTokenDocument(userId);
      if(!tokenDocument?.$id) return { isDocumentPresent:false, isBlackListed:false, tokenDocument:null};
      if(!tokenDocument.tokens.includes(token)) return { isDocumentPresent:true, isBlackListed:false, tokenDocument}
      return { isDocumentPresent:true, isBlackListed:true, tokenDocument};
    } catch (error) {
      logger.error(`Error getting blacklisting status: ${error}`);
      return null;
    }

}