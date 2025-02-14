import { Client, Users, Query, Account } from 'node-appwrite'
import conf from '../config/conf';
import {envLogger as logger} from '@lib'

class AuthService{
    client = new Client()
    .setEndpoint(conf.APPWRITE_ENDPOINT)
    .setProject(conf.APPWRITE_PROJECT_ID)
    .setKey(conf.APPWRITE_API_KEY);

    users;
    account = new Account(this.client);
    constructor(){
        this.users = new Users(this.client);
    }

    async verifyEmail(userId : string) {
        try {
          const res = await this.users.updateEmailVerification(userId,true);
          return { ok: true, res: res };
        } catch (error : any) {
          logger.error(`Error verifying email: ${error.message}`);
          return { ok: false, error: error.message };
        }
      }

      async getUserDetails(email:string){
         try {
          const res  = await this.users.list([Query.contains("email",email)]);
          if(res.users[0]) return res.users[0]
          return null;
         } catch (error:any) {
           logger.error(`Error getting user details: ${error.message}`);
           return null;
         }
      }
      
      async getNewSessionJwt(userId : string){
        try {
         const res = await this.users.createJWT(userId)
         if(res){
          return {ok:true,res:res, code:200}
         }
         else return {ok:false, res:res, code:500}
        } catch (error) {
          return {ok:false, res:error, code:500}
        }
     }


      async resetPassword(userId : string, password:string){
        try {
          const res = await this.users.updatePassword(userId, password)
          return {ok:true, res:res, code:200}
        } catch (error:any) {
          logger.error(`Error resetting password: ${error.message}`);
          return {ok:false, res:error, code:500}
        }
      }
     
}

const appwriteAuthService = new AuthService();
export default appwriteAuthService