import { Client, ID, Databases, Storage, Query, Permission, Role } from "appwrite";
import {getFormattedTime, getImgUrl} from "../../utils";
import action from "../Action/ActionGenerator";
import conf from "../../conf/conf";

export class DatabaseService {
    client = new Client()
        .setEndpoint(conf.appWriteUrl)
        .setProject(conf.projectId);
    database;

    storageBucket;
    constructor() {
        this.database = new Databases(this.client);
        this.storageBucket = new Storage(this.client);
    }

    // Blog crud operations
    async createBlog({
        title,
        content,
        coverImageId,
        coverImageUrl,
        subImageId = [],
        subImageUrl = [],
        userId,
        blogId=ID.unique(),
        status = true,
        tags = [],
        authorProfileId
    }) {
        const blogAttr = {
            title: title,
            content: content,
            coverImageId: coverImageId,
            coverImageUrl: coverImageUrl,
            subImageId: subImageId,
            subImageUrl: subImageUrl,
            userId: userId,
            createdAt: getFormattedTime(),
            status: status,
            tags: tags,
            authorData:authorProfileId,
            likeCount: 0,
            commentCount: 0,
        }
        try {
            const res = await this.database.createDocument(
                conf.dbId,
                conf.blogCollectionID,
                blogId,
                blogAttr,
                [
                    Permission.read(Role.any()),
                    Permission.update(Role.user(userId)),
                    Permission.delete(Role.user(userId))
                ]
            );

            if (res.$databaseId) {
                return res;
            }
            throw { err: "dbService error :: failed to create blog", res: res };
        } catch (error) {
            console.log("dbService error :: failed to create document", error);
            return error
        }
    }

    async updateBlog(blogId, updatedBlogAttr) {
        try {
            const updatedBlog = await this.database.updateDocument(
                conf.dbId,
                conf.blogCollectionID,
                blogId,
                updatedBlogAttr

            )
            if (updatedBlog.title) {
                return updatedBlog;
            }
            else {
                throw { err: "dbService error :: failed to update document : ", updatedBlog: updatedBlog }
            }
        } catch (error) {
            console.log("dbService error :: failed to update document : ", error)
            return error
        }
    }

    async deleteBlog(blogId) {
        try {
            const res = await this.database.deleteDocument(
                conf.dbId,
                conf.blogCollectionID,
                blogId
            )
            if (res.$id) {
                return res;
            }
            else {
                throw { err: "dbService error :: failed to delete document : ", res: res }
            }

        } catch (error) {
            console.log("dbService error :: failed to delete document : ", error)
            return error
        }
    }

    async getBlogs(query) {
        try {
            const res = await this.database.listDocuments(
                conf.dbId,
                conf.blogCollectionID,
                query
            );

            if (res.documents) {
                return res
            }
            else {
                throw { err: "dbService error :: failed to retreive documents :", res: res }
            }
        } catch (error) {
            console.log("dbService error :: failed to retreive documents :", error)
            return error

        }
    }

    // User crud operations
    async checkUserNameAvailability(userName) {
        try{
            const res = await this.database.listDocuments(
                conf.dbId,
                conf.userProfilesCollectionID,
                [Query.equal("userName",userName.toLowerCase())]
            )
            if(res.documents.length===0){
                return true
            }
            else{
                return false
            }
        }catch(error){
            console.log("dbService error :: failed to check username availability",error)
            return false
        }
    }

    async createProfileDocument(docObj, userId) {
        try {
            const res = await this.database.createDocument(
                conf.dbId,
                conf.userProfilesCollectionID,
                ID.unique(),
                docObj,
                [
                    Permission.read(Role.any()),
                    Permission.update(Role.user(userId)),
                    Permission.delete(Role.user(userId))
                ]
            );

            if (res.$databaseId) {
                return res;
            } else
                throw { err: "dbService error :: failed to create document", res: res };
        } catch (error) {
            console.log("dbService error :: failed to create document", error);
            return error
        }
    }

    async getGeneralNotifications(query){
        try {
            const res = await this.database.listDocuments(conf.dbId,conf.genNotificationCollectionID,[
                ...query
            ])
            if(res.documents){
                return res.documents
            }
            else{
                throw {err:"dbService error :: failed to get general notifications",res:res}
            }
        } catch (err) {
            console.log("dbService error :: failed to get general notifications",err)
            return err
        }
    }

    async readGenNotification(notificationId,userProfileId){
       try {
        const res = await this.database.updateDocument(conf.dbId,conf.userProfilesCollectionID,userProfileId,{
            stagedAction:action.readGenNotification(notificationId)
        })
        if(res.$id){
            return res
        }
        else throw {err:"dbService error :: failed to update profile document",res:res}
       } catch (error) {
        console.log("dbService error :: failed to update profile document",error)
        return error
       }
    }

    async removeGenNotification(notificationId,userProfileId){
        try{
            const res = await this.database.updateDocument(conf.dbId,conf.userProfilesCollectionID,userProfileId,{
                stagedAction:action.removeGenNotification(notificationId)
            })
            if(res.$id){
                return res
            }
            else throw {err:"dbService error :: failed to update profile document",res:res}
        }catch(err){
            console.log("dbService error :: failed to update profile document",err)
            return
        }
    }
    
    async getUserNotifications(userId){
        try{
           const res = await this.database.listDocuments(conf.dbId,conf.userNotificationCollectionID,[
            Query.equal("userId",userId),
           ])
              if(res.documents){
                return res.documents
              }
              else{
                throw {err:"dbService error :: failed to get user notifications",res:res}
              }
        }catch(err){
            console.log("dbService error :: failed to get userSpecific notifications",err)
            return err
        }
    }

    async readUserNotification(notificationId){
        try {
            const res = await this.database.updateDocument(conf.dbId,conf.userNotificationCollectionID,notificationId,{
                readAt:`${new Date().getTime()}/- ${getFormattedTime()}`
            })
            if(res.$id){
                return res
            }
            else throw {err:"dbService error :: failed to update notification document",res:res}
        } catch (error) {
            console.log("dbService error :: failed to update notification document",error)
            return error
        }
    }
    
    async removeUserNotification(notificationId){
        try {
            const res = await this.database.deleteDocument(conf.dbId,conf.userNotificationCollectionID,notificationId)
            if(res.message.length==0){                             
                res.$id=notificationId
                return res
            }
            else throw {err:"dbService error :: failed to delete notification document",res:res}
        } catch (error) {
            console.log("dbService error :: failed to delete notification document",error)
            return error
        }
    }


    async getUsers(query = [Query.notEqual("userId", ["#"])]) {
        try {
            const res = await this.database.listDocuments(
                conf.dbId,
                conf.userProfilesCollectionID,
                query,
            );

            if (res.documents) {
                return res
            }
            else {
                throw { err: "dbService error :: failed to retreive users :", res: res }
            }
        } catch (error) {
            console.log("dbService error :: failed to retreive users :", error)
            return error

        }
    }

    //Blog interaction operations
    async createBlogLikesDocument(docId, userId) {
        try {
            const res = await this.database.createDocument(
                conf.dbId,
                conf.blogLikesCollectionID,
                docId,
                {
                    likes: 0,
                    blogId: docId
                },
                [
                    Permission.read(Role.any()),
                    Permission.update(Role.any()),
                    Permission.delete(Role.user(userId))
                ]
            )
            if (res.$id) {
                return res;
            }
            else {
                throw { err: "dbService error :: failed to create blogsLiked document", res: res }
            }
        } catch (error) {
            console.log(error);
            return error
        }
    }

    async commentOnBlog(blogId, userId, comment, userProfileId, authorId) {
        try {
            const res = await this.database.createDocument(conf.dbId, conf.blogCommentsCollectionID, ID.unique(), {
                blogId,
                userId,
                comment
            },
                [
                    Permission.read(Role.any()),
                    Permission.update(Role.user(userId)),
                    Permission.delete(Role.user(userId), Role.user(authorId)),
                ])
            if (res.$id) {
                const stageAction = await this.database.updateDocument(conf.dbId, conf.userProfilesCollectionID, userProfileId, {
                    stagedAction: action.addComment(blogId)
                })
                if (stageAction.$id) {
                    return res
                }
                else throw { err: "dbService error :: failed to stage profile document", res: res }
            } else throw { err: "dbService error :: failed to comment", res: res }
        }
        catch (error) {
            console.log(error)
            return error
        }
    }

    async deleteComment(commentId, profileId) {
        try {
            const res = await this.database.deleteDocument(conf.dbId, conf.blogCommentsCollectionID, commentId)
            if (res.$id) {
                const stageAction = await this.database.updateDocument(conf.dbId, conf.userProfilesCollectionID, profileId, {
                    stagedAction: action.deleteComment(blogId)
                })
                if (stageAction.$id) {
                    return res
                }
                else throw { err: "dbService error :: failed to stage profile document", res: res }
            } else throw { err: "dbService error :: failed to delete comment", res: res }
        }
        catch (error) {
            console.log(error)
            return error
        }
    }

    //user interaction operations
    async like_unlikeBlog(blogId, profileId, type) {
        try {
            const res = await this.database.updateDocument(conf.dbId, conf.userProfilesCollectionID, profileId, {
                stagedAction: type == "like" ? action.like(blogId) : action.unlike(blogId)
            })
            if (res.$id) {
                return res
            }
            else throw { err: "dbService error failed to update profile document", res }
        } catch (error) {
            console.log(error)
            return error
        }
    }

    async follow_unfollowUser(userProfileId, targetUserId, type) {
        try {
            const updatedProfile = await this.database.updateDocument(
                conf.dbId,
                conf.userProfilesCollectionID,
                userProfileId,
                {
                    stagedAction: type == "following" ? action.follow(targetUserId) : action.unfollow(targetUserId)
                }
            )
            if (updatedProfile.$id) {
                return updatedProfile;
            }
            else {
                throw { err: "dbService error :: failed to update profile : ", res: updatedProfile }
            }
        } catch (error) {
            console.log("dbService error :: failed to update profile : ", error)
            return error
        }
    }

    //Image upload operations
    async uploadBlogImages(coverImage, subImages = []) {
        const imageData = {
            coverImageId: "",
            subImageId: [],
            coverImageUrl: "",
            subImageUrl: []
        };
        try {
            const { $id } = await this.storageBucket.createFile(
                conf.bucketId,
                ID.unique(),
                coverImage
            );
            imageData.coverImageId = $id;
            imageData.coverImageUrl = getImgUrl($id).url;


            if (subImages.length !== 0) {
                const subImagesId = await Promise.all(
                    subImages.map(async (image) => {
                        return await this.storageBucket.createFile(
                            conf.bucketId,
                            ID.unique(),
                            image
                        ).$id;
                    })
                );
                imageData.subImageId = subImagesId;
                imageData.subImageUrl = subImagesId.map((subImageId) => (getImgUrl(subImageId).url))

            }
            return imageData;
        } catch (error) {
            console.log("error in dbService :: imageUpload error: ", error);
            return { err: "error in dbService :: imageUpload error: ", error };
        }
    }

    async changeAvatar(avatar, userId, userProfileId, currentAvatarId) {
        try{
           const res = await this.uploadImage(avatar,userId)
           if(res.url){
            const updatedProfile = await this.database.updateDocument(conf.dbId, conf.userProfilesCollectionID, userProfileId,{
                userAvatar:res.url,
                userAvatarId:res.fileId,
                stagedAction:action.bucketCleanup(currentAvatarId)
            })
            if(updatedProfile.$id){
                return updatedProfile
            }
            else throw {err:"dbService error :: failed to update profile document",res:updatedProfile}
           }else throw {err:"dbService error :: failed to upload image",res:res}
        }catch(error){
           console.log("dbService error :: failed to change avatar",error)
           return error
        }
    }

    async uploadImage(image,userId,uniqueId=ID.unique()) {
        try {
            const res = await this.storageBucket.createFile(conf.bucketId, uniqueId, image, [
                Permission.read(Role.any()),
                Permission.update(Role.user(userId)),
                Permission.delete(Role.user(userId))
            ]);
            if(res.$id){
               return getImgUrl(uniqueId)
            }
            else throw {err:"dbService error :: failed to upload image",res:res}
        } catch (error) {
            console.log("dbService error :: failed to upload image",error)
            return error
        }
    }

    async updateProfile(profileId,updatedAttr){
      try {
        const res = await this.database.updateDocument(conf.dbId, conf.userProfilesCollectionID,profileId,updatedAttr)
        if(res.$id){
            return res;
        }
        else throw {err:"dbService error :: failed to update profile",res:res}
      } catch (error) {
        console.log("dbService error :: error in profile updation", error.res)
        return error;
      }
    }

}


const dbServices = new DatabaseService();
export default dbServices;

