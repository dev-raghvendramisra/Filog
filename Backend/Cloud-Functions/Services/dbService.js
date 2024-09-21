import {Client, Databases, Query, Storage} from 'node-appwrite'
import conf from '../conf/conf.js';
class DatabaseService {
  client = new Client()
    .setEndpoint(conf.appWriteUrl)
    .setProject(conf.projectId)
    .setKey(conf.apiKey);

  database;
  storage;

  constructor() {
    this.database = new Databases(this.client);
    this.storage = new Storage(this.client);
  }

  async getAsset(assetId,log) {
    try{
      const asset = await this.storage.getFile(conf.bucketId,assetId);
      return asset;
    }catch(error){
      log("Error fetching asset:", error.message);
      return { ok: false, error: error.message };
    }
  } 

  async deleteAsset(assetId,log){
    try {
      const deletionRes = await this.storage.deleteFile(conf.bucketId,assetId)
      return {ok:true, res:deletionRes};
    } catch (error) {
       log("Error deleting asset:",error.message)
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
        [Query.equal("$id", [blogId])]
      );
      return res.documents.length > 0 ? res.documents[0] : { ok: false };
    } catch (error) {
      log("Error fetching blog:", error.message);
      return { ok: false, error: error.message };
    }
  }

  async updateBlogDocument({ blogId, updatedLikeCount, log, version, updatedCommentCount }) { 
    try {
      const res = await this.database.updateDocument(
        conf.dbId,
        conf.blogCollectionID,
        blogId,
        { 
          ...(updatedLikeCount!==undefined && {likeCount:updatedLikeCount}) , 
          ...(version!==undefined && {version:version}), 
          ...(updatedCommentCount!==undefined && {commentCount:updatedCommentCount}),
          content:"temperoy content"
        }//will remove content later
      );
      log("Document Updated in database:", res);
      return res.$id ? res : { ok: false };
    } catch (error) {
      log("Error updating document database:", error.message);
      return { ok: false, error: error.message };
    }
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
}

const dbServices = new DatabaseService();
export default dbServices;
