import {Client, Databases, Query} from 'node-appwrite';
import conf from '../conf/conf.js';
class dbService{
     
    client = new Client()
    .setEndpoint(conf.appwriteUrl)
    .setProject(conf.appwriteProjectId)
    .setKey(conf.appwriteApiKey);

    database

    constructor(){
      this.database = new Databases(this.client);
    }

    async getBlog(id){
       try {
        const blog = await this.database.getDocument(conf.appwriteDbId,conf.appwriteBlogCollectionId,id);
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
        const profile = await this.database.listDocuments(conf.appwriteDbId,conf.appwriteProfileCollectionId,[Query.equal("userName",username)]);
        if(profile.documents.length>0){
            return profile.documents[0];
        }
        throw false
      } catch (error) {
        return error;
      }
    }
}
const dbServices = new dbService();

export default dbServices;