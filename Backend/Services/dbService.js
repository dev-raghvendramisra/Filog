import {Client, Databases, Query} from 'node-appwrite'
import conf from '../conf/conf.js';
class DatabaseService {
  client = new Client()
    .setEndpoint(conf.appWriteUrl)
    .setProject(conf.projectId)
    .setKey(conf.apiKey);

  database;

  constructor() {
    this.database = new Databases(this.client);
  }

  async updateProfileDocument({ profileId, updatedFollowers, stagedAction, version, updatedFollowing, log }) {
    try {
      const updatedAttr = {
        ...(updatedFollowers && { followers: updatedFollowers }),
        ...(stagedAction  && { stagedAction:stagedAction }),
        ...(version && { version:version }),
        ...(updatedFollowing && { following:updatedFollowing })
      };
     log(updatedAttr)
      const res = await this.database.updateDocument(
        conf.dbId,
        conf.userProfilesCollectionID,
        profileId,
        updatedAttr
      );
      log("Document Updated:", res);
      return res.$id ? res : { ok: false };
    } catch (error) {
      log("Error updating document:", error.message);
      return { ok: false, error: error.message };
    }
  }

  async getUserProfile(userId,log) {
    try {
      const res = await this.database.listDocuments(
        conf.dbId,
        conf.userProfilesCollectionID,
        [Query.equal("userId", [userId])]
      );
      return res.documents.length > 0 ? res.documents[0] : { ok: false };
    } catch (error) {
      log("Error fetching profile:", error.message);
      return { ok: false, error: error.message };
    }
  }
}

const dbServices = new DatabaseService();
export default dbServices;
