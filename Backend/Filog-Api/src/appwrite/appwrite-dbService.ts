import { Client, Databases, Models, Query } from 'node-appwrite'
import conf from 'config/conf';
import { envLogger as logger } from '@lib';

class DBService{
     
    client = new Client()
    .setEndpoint(conf.APPWRITE_ENDPOINT)
    .setProject(conf.APPWRITE_PROJECT_ID)
    .setKey(conf.APPWRITE_API_KEY);

    database

    constructor(){
      this.database = new Databases(this.client);
    }

  
    async getProfile(id : string){
      try {
        const profile = await this.database.listDocuments(conf.APPWRITE_DATABASE_ID,conf.APPWRITE_USERPROFILE_COLLECTION_ID,[Query.equal("userId",id)]);
        if(profile.documents.length>0){
            return profile.documents[0];
        }
        throw false
      } catch (error) {
        return error;
      }
    }
    async getTokenDocument(userId : string) :  Promise<Models.Document | null>{
      try {
        const res = await this.database.getDocument(conf.APPWRITE_DATABASE_ID,conf.APPWRITE_BLACKISTED_TOKENS_COLLECTION_ID,userId);
        return res
      } catch (error) {
        logger.error(`Failed to retreive blackListedToken document for requested id ${userId}`,);
        return null
      }
    }
    async blackListToken(create:boolean,userId:string,token:string,existingTokens=[""]){
      try {
        const res = create 
                    ? await this.database.createDocument(conf.APPWRITE_DATABASE_ID,conf.APPWRITE_BLACKISTED_TOKENS_COLLECTION_ID,userId,{tokens:[token]})
                    : await this.database.updateDocument(conf.APPWRITE_DATABASE_ID,conf.APPWRITE_BLACKISTED_TOKENS_COLLECTION_ID,userId,{tokens:[...existingTokens,token]})
        return res;
      } catch (error) {
        logger.error(`Failed to blacklist token ${error}`);
        return null
        
      }
    }

}

const appwriteDBService = new DBService();
export default appwriteDBService