import { Client, ID, Databases, Storage, Query, Permission, Role } from "appwrite";
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

    async createBlog({
        title,
        content,
        coverImageId,
        coverImageUrl,
        subImageId = [],
        subImageUrl=[],
        userId,
        status = true,
        tags=[],
        authorName,
        authorAvatar
    }) {
        console.log(userId);
        const blogAttr = {
            title:title,
            content:content,
            coverImageId:coverImageId,
            coverImageUrl:coverImageUrl,
            subImageId:subImageId,
            subImageUrl:subImageUrl,
            userId:userId,
            createdAt:createdAt(),
            status:status,
            tags:tags,
            authorName:authorName,
            authorAvatar:authorAvatar,
            // randomIndex:100000000
        }
        try {
            const res = await this.database.createDocument(
                conf.dbId,
                conf.blogCollectionID,
                ID.unique(),
                blogAttr,
                [
                 Permission.read(Role.any()),
                 Permission.update(Role.user(userId)),
                 Permission.delete(Role.user(userId))
                ]  //permission array
            );
            

            if (res.$databaseId) {
                const likesDoc = await this.createBlogLikesDocument(res.$id,userId)
                if(likesDoc.$id){
                    return res;
                }
                return res;
            } else{
                throw { err: "dbService error :: failed to create blog", res: res };}
        } catch (error) {
            console.log("dbService error :: failed to create document", error);
            return error
        }
    }

     async updateBlog(blogId,updatedBlogAttr){
       try {
        const updatedBlog =  await this.database.updateDocument(
             conf.dbId,
             conf.blogCollectionID,
             blogId,
             updatedBlogAttr
 
         )
         if(updatedBlog.title){
            return updatedBlog;
         }
         else{
            throw {err:"dbService error :: failed to update document : " ,updatedBlog:updatedBlog}
         }
       } catch (error) {
           console.log("dbService error :: failed to update document : ",error )
           return error
       }
    }
     async follow_unfollowUser(userProfileId,targetUserId,type){
       try {
        const updatedProfile =  await this.database.updateDocument(
             conf.dbId,
             conf.userProfilesCollectionID,
             userProfileId,
             {
              stagedAction : type=="following" ? action.follow(targetUserId) : action.unfollow(targetUserId)
            }
         )
         if(updatedProfile.$id){
            return updatedProfile;
         }
         else{
            throw {err:"dbService error :: failed to update profile : " ,res:updatedProfile}
         }
       } catch (error) {
           console.log("dbService error :: failed to update profile : ",error )
           return error
       }
    }

    async deleteBlog(blogId){
         try {
            const res = await this.database.deleteDocument(
               conf.dbId,
               conf.blogCollectionID,
               blogId
            )
            if(res.$id){
                return res;
            }
            else{
                throw {err:"dbService error :: failed to delete document : ", res:res}
            }
     
         } catch (error) {
            console.log("dbService error :: failed to delete document : ", error)
            return error
         }
    }

    async getBlogs(query){
       try {
        const res = await this.database.listDocuments(
             conf.dbId,
             conf.blogCollectionID,
             query
         );

         if(res.documents){
            return res
         }
         else{
            throw{err:"dbService error :: failed to retreive documents :" ,res:res}
         }
       } catch (error) {
            console.log("dbService error :: failed to retreive documents :", error)
            return error

       }
    }
    async getUsers(query = [Query.notEqual("userId", ["#"])]){
       try {
        const res = await this.database.listDocuments(
             conf.dbId,
             conf.userProfilesCollectionID,
             query,
         );

         if(res.documents){
            return res
         }
         else{
            throw{err:"dbService error :: failed to retreive users :" ,res:res}
         }
       } catch (error) {
            console.log("dbService error :: failed to retreive users :", error)
            return error

       }
    }

    async uploadImage(coverImage, subImages = []) {
        const imageData = {
            coverImageId:"",
            subImageId:[],
            coverImageUrl:"",
            subImageUrl:[]
        };
        try {
            const { $id } = await this.storageBucket.createFile(
                conf.bucketId,
                ID.unique(),
                coverImage
            );
            imageData.coverImageId = $id;
            imageData.coverImageUrl=this.generateImgUrl($id)


            if (subImages.length !== 0) {
                const subImagesId = await Promise.all(
                    subImages.map(async (image) => {
                        return await this.storageBucket.createFile(
                            conf.bucketId,
                            ID.unique(),
                            image
                        );
                    })
                );
                imageData.subImageId = subImagesId;
                imageData.subImageUrl= subImagesId.map((subImage)=>(this.generateImgUrl(subImage.$id)))
                
            }
            return imageIds;
        } catch (error) {
            console.log("error in dbService :: imageUpload error: ", error);
            return { err: "error in dbService :: imageUpload error: ", error };
        }
    }
    
    async createProfileDocument(docObj,userId) {
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
                ]  //permission array
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
     
    async createBlogLikesDocument(docId,userId){
        try {
            const res = await this.database.createDocument(
                conf.dbId,
                conf.blogLikesCollectionID,
                docId,
                {
                    likes:0,
                    blogId:docId
                },
                [
                    Permission.read(Role.any()),
                    Permission.update(Role.any()),
                    Permission.delete(Role.user(userId))
                ]
            )
            if(res.$id){
                return res;
            }
            else{
                throw {err:"dbService error :: failed to create blogsLiked document",res:res}
            }
        } catch (error) {
            console.log(error);
            return error
        }
    }

    async commentOnBlog(blogId,userId,comment,blogsCommentedOn,isFirstComment,authorId){
       try {
          const res = isFirstComment ? await this.database.updateDocument(conf.dbId,conf.userProfilesCollectionID,profileId,{
            blogsCommentedOn
          }) : {$id:"#"}

          if(res.$id){
            const res = await this.database.createDocument(conf.dbId,conf.blogCommentsCollectionID,blogId,{
                blogId,
                userId,
                comment
            },
            [
                Permission.read(Role.any()),
                Permission.update(Role.user(userId)),
                Permission.delete(Role.user(userId)),
                Permission.delete(Role.user(authorId))
            ])
            if(res.$id){
                return res;
            } else throw {err:"dbService error :: failed to comment", res:res}
          }
          throw {err:"dbService error :: failed to update profile document", res:res}
       } catch (error) {
           console.log(error)
           return error
       }
    }

    async deleteComment(commentId,blogsCommentedOn,profileId){
        try {
            const res = await this.database.deleteDocument(conf.dbId,conf.blogCommentsCollectionID,commentId)
            if(res.$id){
                if(blogsCommentedOn && profileId){
                    const res = await this.database.updateDocument(conf.dbId,conf.userProfilesCollectionID,profileId,{
                        blogsCommentedOn
                    })
                    if(res.$id){
                        return res
                    }
                    else throw {err:"dbService error :: failed to update profile document",res:res}

                }
                return res
            }
             else throw {err:"dbService error :: failed to delete comment document",res:res}
        } catch (error) {
            
        }
    }  
    
    async like_unlikeBlog(blogId,profileId,newLikes,blogsLiked){
      try {
        const res = await this.database.updateDocument(conf.dbId,conf.userProfilesCollectionID,profileId,{blogsLiked})
        if(res.$id){
            const res = await this.database.updateDocument(conf.dbId,conf.blogLikesCollectionID,blogId,{
                likes:newLikes
            })
            if(res.$id){
                return res
            }
            else throw {err:"dbService error failed to update likes",res}
        }
        else throw {err:"dbService error failed to update profile document",res}
      } catch (error) {
        console.log(error)
        return error
      }
    }
    

    generateImgUrl(fileId){
       let url = `${conf.appWriteUrl}/storage/buckets/${conf.bucketId}/files/${fileId}/view?project=${conf.projectId}`
       return url
    }
    
    ///will have to create a function to update documents 
}

class Action {
    stagedAction;
    constructor() {
    }
    follow(userId) {
        return this.stagedAction = JSON.stringify({
            type: "following",
            value: userId
        });
    }
    unfollow(userId) {
        return this.stagedAction = JSON.stringify({
            type: "unfollowing",
            value: userId
        });
    }
}


function createdAt() {
    const crrDate = new Date();
    let formattedDate = crrDate.toDateString();
    formattedDate = formattedDate.substring(
        formattedDate.indexOf(" ") + 1,
        formattedDate.length
    );
    let time = crrDate.toTimeString();
    time = time.substring(0, time.lastIndexOf(":"));
    if (time.substring(0, 1) <= 11) {
        time += " AM";
    } else {
        time += " PM";
    }

    formattedDate += " " + time;
    return formattedDate;
}

const dbServices = new DatabaseService();
export const action = new Action();
export default dbServices;


//implement cloudfunctions to reflect the changes on profile of liking blog, commenting on them , unliking them or deleting comment