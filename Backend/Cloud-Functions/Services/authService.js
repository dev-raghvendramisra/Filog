import {Client, Users} from 'node-appwrite';
import conf from '../conf/conf.js';

class AuthService {
  client = new Client()
    .setEndpoint(conf.appWriteUrl)
    .setProject(conf.projectId)
    .setKey(conf.apiKey);

  users = new Users(this.client);

  async verifyEmail(userId,log) {
    try {
      const res = await this.users.updateEmailVerification(userId,true);
      return { ok: true, res: res };
    } catch (error) {
      log("Error verifying email:", error.message);
      return { ok: false, error: error.message };
    }
  }
}

const authServices =  new AuthService();
export default authServices;