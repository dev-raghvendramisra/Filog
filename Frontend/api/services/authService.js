import { Client, Users } from "node-appwrite";
import conf from "../conf/conf.js";

export class AuthService{
    client = new Client()
    .setEndpoint(conf.appwriteUrl)
    .setProject(conf.appwriteProjectId)
    .setKey(conf.appwriteApiKey);

    users;

    constructor(){
        this.users = new Users(this.client);
    }

    async verifyEmail(userId) {
        try {
          const res = await this.users.updateEmailVerification(userId,true);
          return { ok: true, res: res };
        } catch (error) {
          console.log("Error verifying email:", error.message);
          return { ok: false, error: error.message };
        }
      }
}

const authServices = new AuthService();
export default authServices;