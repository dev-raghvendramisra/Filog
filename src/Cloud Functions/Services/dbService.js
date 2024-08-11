import {Client, Databases, Role} from 'node-appwrite'
import conf from '../conf/conf';

class DatabaseService {
    client = new Client()
   .setEndpoint(conf.appWriteUrl)
   .setProject(conf.projectId)
   .setKey(conf.apiKey)

   database ;

   constructor () {
    this.database = new Databases(this.client);
   }
    
   async updateProfileDocument ({profileId,updatedAttr}) {
      try {
        const res = await this.database.updateDocument(conf.dbId,conf.userProfilesCollectionID,profileId,
            updatedAttr,)
        if(res.$id){
            return res;
        }
        else  throw{res:res,ok:false}
       } catch (error) {
        return error
      }
    }
   
}

export const{dbServices} = new DatabaseService()