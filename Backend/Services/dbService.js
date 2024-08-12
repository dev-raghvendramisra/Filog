import {Client, Databases, Query, Role} from 'node-appwrite'
import conf from '../conf/conf.js';

class DatabaseService {
    client = new Client()
   .setEndpoint(conf.appWriteUrl)
   .setProject(conf.projectId)
   .setKey(conf.apiKey)

   database ;

   constructor () {
    this.database = new Databases(this.client);
   }
    
   async updateProfileDocument ({profileId,updatedAttribute,log}) {
      try {
        const res = await this.database.updateDocument(conf.dbId,conf.userProfilesCollectionID,profileId,
          {updatedAttribute},)
        log(res)
        if(res.$id){
            return res;
        }
        else  throw{res:res,ok:false}
       } catch (error) {
        return error
      }
    }
   
    async getTargteProfile(userId){
      try {
        const res = await this.database.listDocuments(conf.dbId,conf.userProfilesCollectionID,[Query.equal("userId",[userId])])
        if(res.documents.length>0){
          return res.documents[0]
        }
        else throw{res:res,ok:false}
      } catch (error) {
        return error
      }
    }
}

 const dbServices = new DatabaseService()
 export default dbServices