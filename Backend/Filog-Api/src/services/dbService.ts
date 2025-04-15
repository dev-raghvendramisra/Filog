import { envLogger as logger } from '@lib';
import { BlogBody, UpdateBlogBody, UpdateProfileBody, UserDataInCookie } from '@type/request/body';
import { Blog, CustomNotification, GeneralNotification, User, UserProfile } from '@db/models';
import { DBQuery } from '@type/request/query';
import conf from 'config/conf';
import { Types } from 'mongoose';

/**
 * DBService provides a set of methods to interact with the database for managing
 * blogs, user profiles, notifications, and related operations. It handles CRUD operations
 * and other functionalities such as following/unfollowing users, liking/unliking blogs,
 * and managing notifications.
 */
class DBService {

    /**
     * Creates a new blog in the database.
     * @param data - The blog data to be created.
     * @returns A response object containing the created blog or an error message.
     */
    async createBlog(data: BlogBody) {
        try {
            const blog = await Blog.create(data)
            const profile = await this.getUserProfile(data.userId)
            if(profile.code==200 && data.status){
               this.updateProfile({_userId:data.userId,updatedFields:{blogsWritten:(profile.res?.blogsWritten as number) + 1}})
            }
            return { res: blog, message: "Blog Created", code: 200 }
        } catch (error) {
            logger.error(`ERR_CREATING_BLOG_IN_DB_SERVICE ${error}`)
            return { code: 500, message: "Internal server error", res: null }
        }
    }

    /**
     * Retrieves user data based on the provided query.
     * @param query - Partial query object to find the user.
     * @returns A response object containing user data or an error message.
     */
    async getUserData(query: Partial<UserDataInCookie>) {
        try {
            const res = await User.findOne(query, { password: 0 }).lean()
            if (!res) return { code: 404, res: null, message: "User not found" }
            return { code: 200, res, message: "User Data Found" };
        } catch (error) {
            logger.error(`ERR_GETTING_USER_FROM_DB_IN_DB_SERVICE ${error}`)
            return { code: 500, res: null, message: "Internal Server Error" }
        }
    }

    /**
     * Retrieves a user's profile along with notifications.
     * @param _id - The user ID.
     * @returns A response object containing the user profile or an error message.
     */
    async getUserProfile(_id: string) {
        try {
            const res = await Promise.all([
                UserProfile.findOne({ userId: _id }).populate("customNotifications").lean(),
                GeneralNotification.find({ clearedBy: { $nin: _id } })
            ])

            if (!res[0]) return { code: 404, res: null, message: "Userprofile not found" }
            const customNotfication = res[0].customNotifications
            const generalNotfication = res[1]
            delete (res[0] as any).customNotifications
            const user = {
                ...res[0],
                notifications: [...customNotfication, ...generalNotfication]
            }
            return { code: 200, res: user, message: "User Profile Found" }
        } catch (error) {
            logger.error(`ERR_GETTING_USER_PROFILE_IN_AUTH_SERVICE ${error}`)
            return { code: 500, res: null, message: "Internal Server Error" }
        }
    }

    /**
     * Retrieves multiple user profiles based on the query.
     * @param query - Query object containing filters, sort, skip, and limit.
     * @returns A response object containing user profiles or an error message.
     */
    async getUserProfiles(query: DBQuery) {
        try {
            const users = await UserProfile.find(query.filters, { customNotifications: 0, blogsLiked: 0, userAvatarId: 0 }).skip(query.skip || 0).sort(query.sort).limit(query.limit || 10);
            return { res: users, code: 200, message: "Users fetched" }
        } catch (error) {
            logger.error(`ERR_WHILE_FETCHING_USERS_IN_DB_SERVICE ${error}`)
            return { code: 500, res: null, message: "Internal server error" }
        }
    }

    /**
     * Updates a user's profile with the provided fields.
     * @param query - Object containing the user ID and updated fields.
     * @param returnUpdated - Flag which if set to true will return the updated profile if false then old one else null
     * @returns A response object indicating success or failure.
     */
    async updateProfile(query: UpdateProfileBody, returnUpdated?: true | false) {
        try {
            const userProfile = await UserProfile.findOneAndUpdate({ userId:query._userId }, { $set: query.updatedFields }, { returnOriginal: !returnUpdated })
            if (userProfile) return { code: 200, message: "Profile updated successfully", res: typeof returnUpdated == "undefined" ? null : userProfile }
            return { code: 404, message: "Profile does'nt exists", res: null }
        } catch (error) {
            logger.error(`ERR_WHILE_UPDATING_USERPROFILE_IN_DB_SERVICE ${error}`)
            return { code: 500, res: null, message: "Internal server error" }
        }
    }

    /**
     * Follows a target user by updating the followers and following lists.
     * @param targetUserId - The ID of the user to follow.
     * @param userId - The ID of the user performing the follow action.
     * @returns A response object indicating success or failure.
     */
    async followUser(targetUserId: string, userId: string) {
        try {
            const followed = await Promise.all([
                UserProfile.updateOne({ userId: targetUserId }, { $push: { followers: userId } }),
                UserProfile.updateOne({ userId }, { $push: { following: targetUserId } })
            ])
            if (followed[0].modifiedCount && followed[1].matchedCount) {
                this.createOrDeleteFollowNotfication("CREATE", targetUserId, userId)
                return { code: 200, message: "Followed user successfully", res: null }
            }
            return { code: 404, message: "User does'nt exists", res: null }
        } catch (error) {
            logger.error(`ERR_WHILE_FOLLOWING_USER_IN_DB_SERVICE ${error}`)
            return { code: 500, res: null, message: "Internal server error" }
        }
    }

    /**
     * Unfollows a target user by updating the followers and following lists.
     * @param targetUserId - The ID of the user to unfollow.
     * @param userId - The ID of the user performing the unfollow action.
     * @returns A response object indicating success or failure.
     */
    async unfollowUser(targetUserId: string, userId: string) {
        try {
            const unfollowed = await Promise.all([
                UserProfile.updateOne({ userId: targetUserId }, { $pull: { followers: userId } }),
                UserProfile.updateOne({ userId }, { $pull: { following: targetUserId } })
            ])
            if (unfollowed[0].modifiedCount && unfollowed[1].matchedCount) {
                this.createOrDeleteFollowNotfication("DELETE", targetUserId, userId)
                return { code: 200, message: "Unfollowed user successfully", res: null }
            }
            return { code: 404, message: "User does'nt exists", res: null }
        } catch (error) {
            logger.error(`ERR_WHILE_UNFOLLOWING_USER_IN_DB_SERVICE ${error}`)
            return { code: 500, res: null, message: "Internal server error" }
        }
    }

    /**
     * Retrieves blogs based on the provided query.
     * @param query - Query object containing filters, sort, skip, and limit.
     * @returns A response object containing blogs or an error message.
     */
    async getBlogs(query: DBQuery) {
        try {
            const blogs = await Blog.find(query.filters, { permissions: 0 }).skip(query.skip || 0).sort(query.sort).limit(query.limit || 10).populate("author")
            return { res: blogs, code: 200, message: "Blogs Fetched" }
        } catch (error) {
            logger.error(`ERR_WHILE_FETCHING_BLOGS_IN_DB_SERVICE ${error}`)
            return { code: 500, res: null, message: "Internal server error" }
        }
    }

    /**
     * Updates a blog with the provided fields.
     * @param query - Object containing the blog ID and updated fields.
     * @returns A response object indicating success or failure.
     */
    async updateBlog(query: UpdateBlogBody) {
        try {
            const blog = await Blog.updateOne({ _id: new Types.ObjectId(query._blogId) }, { $set: query.updatedFields })
            if (blog.modifiedCount) return { code: 200, message: "Blog updated successfully", res: null }
            return { code: 404, message: "Blog does'nt exists", res: null }
        } catch (error) {
            logger.error(`ERR_WHILE_UPDATING_BLOG_IN_DB_SERVICE ${error}`)
            return { code: 500, res: null, message: "Internal server error" }
        }
    }

    /**
     * Deletes a blog by its ID.
     * @param _blogId - The ID of the blog to delete.
     * @returns A response object indicating success or failure.
     */
    async deleteBlog(_blogId: string) {
        try {
            const res = await Blog.deleteOne({ _id: new Types.ObjectId(_blogId) })
            if (res.deletedCount) return { code: 203, message: "Blog deleted successfully", res: null }
            return { code: 404, message: "Blog does'nt exists", res: null }
        } catch (error) {
            logger.error(`ERR_DELETING_BLOG_IN_DB_SERVICE ${error}`)
            return { code: 500, message: "Internal server error", res: null }
        }
    }

    /**
     * Likes a blog and updates the user's liked blogs list.
     * @param _id - The ID of the blog to like.
     * @param userId - The ID of the user liking the blog.
     * @returns A response object indicating success or failure.
     */
    async likeBlog(_id: string, userId: string) {
        try {
            const liked = await Promise.all([
                Blog.updateOne({ _id: new Types.ObjectId(_id) }, { $inc: { likeCount: 1 } }),
                UserProfile.updateOne({ userId }, { $push: { blogsLiked: _id } })
            ])
            if (liked[0].modifiedCount && liked[1].matchedCount) {
                return { code: 200, message: "Blog liked successfully", res: null }
            }
            return { code: 404, message: "Blog does'nt exists", res: null }
        } catch (error) {
            logger.error(`ERR_WHILE_LIKING_BLOG_IN_DB_SERVICE ${error}`)
            return { code: 500, res: null, message: "Internal server error" }
        }
    }

    /**
     * Unlikes a blog and updates the user's liked blogs list.
     * @param _id - The ID of the blog to unlike.
     * @param userId - The ID of the user unliking the blog.
     * @returns A response object indicating success or failure.
     */
    async unlike(_id: string, userId: string) {
        try {
            const liked = await Promise.all([
                Blog.updateOne({ _id: new Types.ObjectId(_id) }, { $inc: { likeCount: -1 } }),
                UserProfile.updateOne({ userId }, { $pull: { blogsLiked: _id } })
            ])
            if (liked[0].modifiedCount && liked[1].matchedCount) return { code: 200, message: "Blog unliked successfully", res: null }
            return { code: 404, message: "Blog does'nt exists", res: null }
        } catch (error) {
            logger.error(`ERR_WHILE_UNLIKING_BLOG_IN_DB_SERVICE ${error}`)
            return { code: 500, res: null, message: "Internal server error" }
        }
    }

    /**
     * Creates a custom notification for a user.
     * @param message - The notification message.
     * @param icon - The notification icon.
     * @param userId - The ID of the user to notify.
     * @param link - Optional link associated with the notification.
     * @returns A response object indicating success or failure.
     */
    async createCustomNotification(message: string, icon: string, userId: string, link?: string, rest?: Object) {
        try {
            const notfication = await CustomNotification.create({ message, icon, userId, link, createdAt: Date.now(), ...rest })
            return { code: 201, message: "Custom notifcation created", res: notfication }
        } catch (error) {
            logger.error(`ERR_WHILE_CREATING_CUSTOM_NOTIFICATION_IN_DB_SERVUCE ${error}`)
            return { code: 500, message: "Internal server error", res: null }
        }
    }

    /**
     * Creates a general notification for all users.
     * @param message - The notification message.
     * @param icon - The notification icon.
     * @returns A response object indicating success or failure.
     */
    async createGeneralNotfication(message: string, icon: string) {
        try {
            const notfication = await GeneralNotification.create({ message, icon, createdAt: Date.now() })
            return { code: 201, message: "General notifcation created", res: notfication }
        } catch (error) {
            logger.error(`ERR_WHILE_CREATING_GENERAL_NOTIFICATION_IN_DB_SERVUCE ${error}`)
            return { code: 500, message: "Internal server error", res: null }
        }
    }

    /**
     * Marks a general notification as read for a user.
     * @param notificationId - The ID of the notification.
     * @param userId - The ID of the user reading the notification.
     * @returns A response object indicating success or failure.
     */
    async readGeneralNotfication(notificationId: string, userId: string) {
        try {
            const read = await GeneralNotification.updateOne({ _id: new Types.ObjectId(notificationId) }, { $push: { readBy: userId } })
            if (read.modifiedCount) return { code: 200, message: "General notification read successfully", res: null }
            return { code: 404, message: "Notification not found", res: null }
        } catch (error) {
            logger.error(`ERR_WHILE_READING_GENERAL_NOTIFICATION_IN_DB_SERVUCE ${error}`)
            return { code: 500, message: "Internal server error", res: null }
        }
    }

    /**
     * Marks a custom notification as read for a user.
     * @param notificationId - The ID of the notification.
     * @param userId - The ID of the user reading the notification.
     * @returns A response object indicating success or failure.
     */
    async readCustomNotfication(notificationId: string, userId: string) {
        try {
            const read = await CustomNotification.updateOne({ _id: new Types.ObjectId(notificationId), userId }, { $set: { readAt: String(new Date().getTime()) } })
            if (read.modifiedCount) return { code: 200, message: "Custom notification read successfully", res: null }
            return { code: 404, message: "Notification not found", res: null }
        } catch (error) {
            logger.error(`ERR_WHILE_READING_CUSTOM_NOTIFICATION_IN_DB_SERVUCE ${error}`)
            return { code: 500, message: "Internal server error", res: null }
        }
    }

    /**
     * Clears a general notification for a user.
     * @param notificationId - The ID of the notification.
     * @param userId - The ID of the user clearing the notification.
     * @returns A response object indicating success or failure.
     */
    async clearGeneralNotification(notificationId: string, userId: string) {
        try {
            const clear = await GeneralNotification.updateOne({ _id: new Types.ObjectId(notificationId) }, { $push: { clearedBy: userId } })
            if (clear.modifiedCount) return { code: 200, message: "General notification cleared successfully", res: null }
            return { code: 404, message: "Notification not found", res: null }
        } catch (error) {
            logger.error(`ERR_WHILE_CLEARING_GENERAL_NOTIFICATION_FOR_USER_${userId}_IN_DB_SERVUCE ${error}`)
            return { code: 500, message: "Internal server error", res: null }
        }
    }

    /**
     * Clears a custom notification for a user.
     * @param notificationId - The ID of the notification.
     * @param userId - The ID of the user clearing the notification.
     * @returns A response object indicating success or failure.
     */
    async clearCustomNotification(notificationId: string, userId: string) {
        try {

            const clear = await CustomNotification.deleteOne({ _id: new Types.ObjectId(notificationId), userId })
            if (clear.deletedCount) return { code: 200, message: "Custom notification cleared successfully", res: null }
            return { code: 404, message: "Notification not found", res: null }
        } catch (error) {
            logger.error(`ERR_WHILE_CLEARING_CUSTOM_NOTIFICATION_FOR_ID_${userId}_IN_DB_SERVICE ${error}`)
            return { code: 500, message: "Internal server error", res: null }
        }
    }

    /**
     * Creates or deletes a follow notification for a user.
     * @param variant - "CREATE" to create or "DELETE" to delete the notification.
     * @param targetUserId - The ID of the user being followed/unfollowed.
     * @param userId - The ID of the user performing the action.
     */
    async createOrDeleteFollowNotfication(variant: "CREATE" | "DELETE", targetUserId: string, userId: string) {
        const userProfile = await UserProfile.findOne({ userId });
        if (!userProfile) return;
        if (variant == "CREATE") {
            const res = await this.createCustomNotification(`${userProfile.fullName} started following you`, userProfile.userAvatar as string, targetUserId, `${conf.FRONTEND_ENDPOINT}/user/@${userProfile.userName}`)
            if (res.code == 201) {
                await UserProfile.updateOne({ userId: targetUserId }, { $push: { customNotifications: res.res?._id } })
            }
        }
        else await CustomNotification.deleteOne({ userId: targetUserId, message: `${userProfile.fullName} started following you` }).catch((err) => logger.error(`ERR_WHILE_DELETING_FOLLOW_NOTIFICATION_IN_DB_SERVICE ${err}`))
    }
}

const dbService = new DBService();
export default dbService