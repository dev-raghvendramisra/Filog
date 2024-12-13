const { Client, Databases, Query } = require("node-appwrite");
const {conf} = require('../config/conf');

class DBService{
     
    client = new Client()
    .setEndpoint(conf.APPWRITE_ENDPOINT)
    .setProject(conf.APPWRITE_PROJECT_ID)
    .setKey(conf.APPWRITE_API_KEY);

    database

    constructor(){
      this.database = new Databases(this.client);
    }

    async getBlog(slug){
       try {
        const blog = await this.database.listDocuments(conf.APPWRITE_DATABASE_ID,conf.APPWRITE_BLOG_COLLECTION_ID,[
          Query.equal("slug",slug)
        ]);
        if(blog.total){
            return blog.documents[0];
        }
        throw false
       } catch (error) {
          return error;
       }
    }
    async getProfile(username){
      try {
        const profile = await this.database.listDocuments(conf.APPWRITE_DATABASE_ID,conf.APPWRITE_USERPROFILE_COLLECTION_ID,[Query.equal("userName",username)]);
        if(profile.documents.length>0){
            return profile.documents[0];
        }
        throw false
      } catch (error) {
        return error;
      }
    }
   }

module.exports.appwriteDBService = new DBService();