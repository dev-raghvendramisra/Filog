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

  async updateProfileDocument({ profileId, updatedFollowers, stagedAction, version, updatedFollowing, log, blogsLiked }) {
    try {
      const updatedAttr = {
        ...(updatedFollowers !==undefined && { followers: updatedFollowers }),
        ...(stagedAction !==undefined && { stagedAction:stagedAction }),
        ...(version !==undefined && { version:version }),
        ...(updatedFollowing !==undefined && { following:updatedFollowing }),
        ...(blogsLiked !==undefined && { blogsLiked:blogsLiked })
      };
    //  log(updatedAttr)
      const res = await this.database.updateDocument(
        conf.dbId,
        conf.userProfilesCollectionID,
        profileId,
        updatedAttr
      );
      log("Document Updated in database:", res);
      return res.$id ? res : { ok: false };
    } catch (error) {
      log("Error updating document database:", error.message);
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

  async getBlog(blogId,log) {
    try {
      const res = await this.database.listDocuments(
        conf.dbId,
        conf.blogCollectionID,
        [Query.equal("blogId", [blogId])]
      );
      return res.documents.length > 0 ? res.documents[0] : { ok: false };
    } catch (error) {
      log("Error fetching blog:", error.message);
      return { ok: false, error: error.message };
    }
  }

  async updateBlogDocument({ blogId, updatedLikes, log }) {
    try {
      const res = await this.database.updateDocument(
        conf.dbId,
        conf.blogCollectionID,
        blogId,
        { likeCount: updatedLikes }
      );
      log("Document Updated in database:", res);
      return res.$id ? res : { ok: false };
    } catch (error) {
      log("Error updating document database:", error.message);
      return { ok: false, error: error.message };
    }
  }
}

const dbServices = new DatabaseService();
export default dbServices;
