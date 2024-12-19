const { Client, Databases, Query } = require("node-appwrite");
const {conf} = require('../config/conf');
const minifyAppwriteObj = require("../utils/minifyAppwriteObj");
const logger = require('../libs').envLogger;

class DBService{
     
    client = new Client()
    .setEndpoint(conf.APPWRITE_ENDPOINT)
    .setProject(conf.APPWRITE_PROJECT_ID)
    .setKey(conf.APPWRITE_API_KEY);

    database

    constructor(){
      this.database = new Databases(this.client);
    }

    async getBlog(id){
       try {
        const blog = await this.database.getDocument(conf.APPWRITE_DATABASE_ID,conf.APPWRITE_BLACKISTED_TOKENS_COLLECTION_ID,id);
        if(blog.$id){
            return blog;
        }
        throw false
       } catch (error) {
          return error;
       }
    }
    async getProfile(id){
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
    async getTokenDocument(userId){
      try {
        const res = await this.database.getDocument(conf.APPWRITE_DATABASE_ID,conf.APPWRITE_BLACKISTED_TOKENS_COLLECTION_ID,userId);
        return res
      } catch (error) {
        logger.error(`Failed to retreive blackListedToken document for requested id ${userId}`,);
        return error
      }
    }
    async blackListToken(create,userId,token,existingTokens){
      try {
        const res = create 
                    ? await this.database.createDocument(conf.APPWRITE_DATABASE_ID,conf.APPWRITE_BLACKISTED_TOKENS_COLLECTION_ID,userId,{tokens:[token]})
                    : await this.database.updateDocument(conf.APPWRITE_DATABASE_ID,conf.APPWRITE_BLACKISTED_TOKENS_COLLECTION_ID,userId,{tokens:[...existingTokens,token]})
        return res;
      } catch (error) {
        logger.error(`Failed to blacklist token ${error}`);
        return error
        
      }
    }

    async listUsers(){
      try {
        const res = await this.database.listDocuments(conf.APPWRITE_DATABASE_ID,conf.APPWRITE_USERPROFILE_COLLECTION_ID);
        if(res.documents.length){
          res.documents = minifyAppwriteObj(res.documents);
          return res.documents;
        }
        throw false
      } catch (error) {
        logger.error(`Failed to list users ${error}`);
        return error;
      }
    }
}

module.exports.appwriteDBService = new DBService();