const { Client, Users, Query, Account } = require("node-appwrite");
const {conf} = require('../config/conf');
const {minifyAppwriteObj} = require("../utils");
const logger = require('../libs').envLogger;

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

    async verifyEmail(userId) {
        try {
          const res = await this.users.updateEmailVerification(userId,true);
          return { ok: true, res: res };
        } catch (error) {
          logger.error(`Error verifying email: ${error.message}`);
          return { ok: false, error: error.message };
        }
      }

      async getUserDetails(email){
         try {
          const res  = await this.users.list([Query.contains("email",email)]);
          return res.total > 0 && res.users[0]
         } catch (error) {
           logger.error(`Error getting user details: ${error.message}`);
           return false;
         }
      }
      
      async getNewSessionJwt(userId){
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

     async verifyUserCreds(email,pass){
        try {
          const res = await this.account.createEmailPasswordSession(email,pass);
          return {ok:true, res:res, code:200}
        } catch (error) {
          logger.error(`Error verifying user credentials: ${error.message}`);
          return {ok:false, res:error, code:error.code}
        }
      }
     

      async resetPassword(userId, password){
        try {
          const res = await this.users.updatePassword(userId, password)
          return {ok:true, res:res, code:200}
        } catch (error) {
          logger.error(`Error resetting password: ${error.message}`);
          return {ok:false, res:error, code:500}
        }
      }
     
}

module.exports.appwriteAuthService = new AuthService();