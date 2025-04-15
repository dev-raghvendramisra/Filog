import { getFormattedTime } from "../../utils";
import conf from "../../conf/conf";
import axios from "axios";

export class DatabaseService {

    database = axios.create({ withCredentials: true });


    // Blog CRUD operations
    async createBlog({
        title,
        content,
        coverImageId,
        coverImageURI,
        subImageId = [],
        subImageURI = [],
        userId,
        userName,
        status = true,
        tags = [],
        authorProfileId
    }) {
        const blogAttr = {
            title: title,
            content: content,
            coverImageId: coverImageId,
            coverImageURI: coverImageURI,
            subImageId: subImageId,
            subImageURI: subImageURI,
            userId: userId,
            createdAt: getFormattedTime(),
            status: status,
            tags: tags,
            authorData: authorProfileId,
            likeCount: 0,
            slug: userName + "-" + title.toLowerCase().split(" ").join("-"),
            commentCount: 0,
        };
        try {
            const res = await this.database.post(conf.DB_API_BLOG_ENDPOINT, {
                ...blogAttr,
            });
            return res.data;
        } catch (error) {
            console.log("DB_SERVICE_ERROR :: FAILED_TO_CREATE_DOCUMENT", error);
            return error.response;
        }
    }

    async updateBlog(_blogId, updatedFields) {
        try {
            const updatedBlog = await this.database.patch(
                conf.DB_API_BLOG_ENDPOINT,
                { _blogId, updatedFields }
            );
            return updatedBlog.data;
        } catch (error) {
            console.log("DB_SERVICE_ERROR :: FAILED_TO_UPDATE_DOCUMENT", error);
            return error.response;
        }
    }

    async deleteBlog(blogId) {
        try {
            const res = await this.database.delete(conf.DB_API_BLOG_ENDPOINT, {
                params: {
                    blogId,
                },
            });
            return res.data;
        } catch (error) {
            console.log("DB_SERVICE_ERROR :: FAILED_TO_DELETE_DOCUMENT", error);
            return error.response;
        }
    }

    async getBlogs(query = encodeURIComponent(JSON.stringify({ userId: { $ne: "#" } }))) {
        console.log("Query in DBService for blogs", JSON.parse(decodeURIComponent(query)));
        try {
            const res = await this.database.get(
                conf.DB_API_GET_BLOGS_ENDPOINT + `?query=${query}`
            );
            return res.data;
        } catch (error) {
            console.log("DB_SERVICE_ERROR :: FAILED_TO_RETREIVE_DOCUMENTS", error);
            return error.response.data;
        }
    }

    async readGenNotification(notificationId) {
        try {
            const res = await this.database.patch(
                `${conf.DB_API_NOTIFICATION_GENERAL_ENDPOINT}/${notificationId}`
            );
            return res.data;
        } catch (error) {
            console.log("DB_SERVICE_ERROR :: FAILED_TO_UPDATE_PROFILE_DOCUMENT", error);
            return error.response.data;
        }
    }

    async removeGenNotification(notificationId) {
        try {
            const res = await this.database.delete(
                `${conf.DB_API_NOTIFICATION_GENERAL_ENDPOINT}/${notificationId}`
            );
            return res.data;
        } catch (err) {
            console.log("DB_SERVICE_ERROR :: FAILED_TO_UPDATE_PROFILE_DOCUMENT", err);
            return err.response.data;
        }
    }

    async readUserNotification(notificationId) {
        try {
            const res = await this.database.patch(
                `${conf.DB_API_NOTIFICATION_CUSTOM_ENDPOINT}/${notificationId}`
            );
            return res.data;
        } catch (error) {
            console.log("DB_SERVICE_ERROR :: FAILED_TO_UPDATE_PROFILE_DOCUMENT", error);
            return error.response.data;
        }
    }

    async removeUserNotification(notificationId) {
        try {
            const res = await this.database.delete(
                `${conf.DB_API_NOTIFICATION_CUSTOM_ENDPOINT}/${notificationId}`
            );
            return res.data;
        } catch (err) {
            console.log("DB_SERVICE_ERROR :: FAILED_TO_UPDATE_PROFILE_DOCUMENT", err);
            return err.response.data;
        }
    }

    async getUsers(query = JSON.stringify({ userId: { $ne: "#" } })) {
        try {
            const res = await this.database.get(
                conf.DB_API_GET_USERS_ENDPOINT + `?query=${encodeURIComponent(query)}`
            );

            return res.data;
        } catch (error) {
            console.log("DB_SERVICE_ERROR :: FAILED_TO_RETREIVE_USERS", error);
            return error.response.data;
        }
    }

    // User interaction operations
    async like_unlikeBlog(blogId, type) {
        try {
            const method = type == "like" ? "patch" : "delete";
            const res = await this.database[method](
                `${conf.DB_API_BLOG_LIKE_ENDPOINT}/${blogId}`
            );
            return res.data;
        } catch (error) {
            console.log("DB_SERVICE_ERROR :: FAILED_TO_LIKE_UNLIKE_BLOG", error);
            return error.response;
        }
    }

    async follow_unfollowUser(targetUserId, type) {
        try {
            const method = type == "follow" ? "patch" : "delete";
            const updatedProfile = await this.database[method](
                `${conf.DB_API_FOLLOW_USER_ENDPOINT}/${targetUserId}`
            );
            return updatedProfile.data;
        } catch (error) {
            console.log("DB_SERVICE_ERROR :: FAILED_TO_FOLLOW_UNFOLLOW_USER", error);
            return error.response.data;
        }
    }

    // Image upload operations
    async uploadBlogImages(coverImage, subImages = []) {
        const imageData = {
            coverImageId: "",
            subImageId: [],
            coverImageURI: "",
            subImageURI: [],
        };
        try {
            const img = await this.uploadBlogImage(coverImage)
            if(!img.code==200){
                throw new Error(img.message)
            }
            imageData.coverImageId = img.res.imageId;
            imageData.coverImageURI = img.res.imageURI;

            if (subImages.length !== 0) {
                const subImages = await Promise.all(
                    subImages.map(async (image) => {
                        const img =  await this.uploadBlogImage(image);
                        if(img.code!==200){
                            throw new Error(img.message)
                        }
                        return img.res.imageId;
                    })
                );
                subImages.forEach((subImage) => {
                    imageData.subImageId.push(subImage.res.imageId);
                    imageData.subImageURI.push(subImage.res.imageURI);
                })
            }
            return imageData;
        } catch (error) {
            console.log("DB_SERVICE_ERROR :: IMAGE_UPLOAD_ERROR", error);
            return { err: "DB_SERVICE_ERROR :: IMAGE_UPLOAD_ERROR", error };
        }
    }


    async uploadBlogImage(image) {
        try {
            const formData = new FormData()
            formData.append("blogImage", image)
            const res = await this.database.put(
               conf.DB_API_ENDPOINT+"/blogs/images",
               formData,
               {headers:{"Content-Type":"multipart/form-data"}}
            );
            return res.data
        } catch (error) {
            console.log("DB_SERVICE_ERROR :: FAILED_TO_UPLOAD_BLOG_IMAGE", error);
            return error.response.data
        }
    }

    async uploadAvatar(image){
      try {
        const formData = new FormData()
            formData.append("avatar", image)
            const res = await this.database.put(
               conf.DB_API_ENDPOINT+"/profile/avatar",
               formData,
               {headers:{"Content-Type":"multipart/form-data"}}
            );
            return res.data
        } catch (error) {
            console.log("DB_SERVICE_ERROR :: FAILED_TO_UPLOAD_AVATAR", error);
            return error.response.data
        }
    }

    async updateProfile(_userId, updatedFields) {
        try {
            const res = await this.database.patch(conf.DB_API_UPDATE_PROFILE_ENDPOINT, {
                _userId,
                updatedFields,
            });
            return res.data;
        } catch (error) {
            console.log("DB_SERVICE_ERROR :: ERROR_IN_PROFILE_UPDATION", error.res);
            return error.response;
        }
    }
}

const dbServices = new DatabaseService();
export default dbServices;
