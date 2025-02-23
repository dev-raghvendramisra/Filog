import { envLogger as logger } from '@lib';
import { BlogBody, SignupBody, UpdateBlogBody, UpdateProfileBody, UserDataInCookie } from '@type/request/body';
import { Blog, User, UserProfile } from '@db/models';
import { DBQuery } from '@type/request/query';

class DBService{

    async createBlog(data:BlogBody){
        try {
            const blog = await Blog.create(data)
            return {res:blog,message:"Blog Created",code:200}
        } catch (error) {
            logger.error(`ERR_CREATING_BLOG_IN_DB_SERVICE ${error}`)
            return {code:500,message:"Internal server error",res:null}
        }
    }

    async getUserData(query:Partial<UserDataInCookie>){
        try {
            const res = await User.findOne(query).lean()
            if(!res) return {code:404,res:null,message:"User not found"}
            delete ((res as any).password)
            return {code:200,res,message:"User Data Found"};
        } catch (error) {
            logger.error(`ERR_GETTING_USER_FROM_DB_IN_DB_SERVICE ${error}`)
             return { code: 500, res: null, message: "Internal Server Error" }
        }
    }

    async getUserProfile(_id:string){
        try {
          const user = await UserProfile.findOne({userId:_id})
          if(!user) return {code:404,res:null,message:"Userprofile not found"}
          return {code:200,res:user,message:"User Profile Found"}
        } catch (error) {
          logger.error(`ERR_GETTING_USER_PROFILE_IN_AUTH_SERVICE ${error}`)
          return { code: 500, res: null, message: "Internal Server Error" }
        }
      }
      
    
    async getUserProfiles(query:DBQuery){
        try {
            const users = await UserProfile.find(query.filters).skip(query.skip || 0).sort(query.sort).limit(query.limit || 10);
            return {res:users,code:200,message:"Users fetched"}
        } catch (error) {
            logger.error(`ERR_WHILE_FETCHING_USERS_IN_DB_SERVICE ${error}`)
            return {code:500,res:null,message:"Internal server error"}
        }
    }

    async getBlogs(query:DBQuery){
        try {
            const blogs = await Blog.find(query.filters).skip(query.skip || 0).sort(query.sort).limit(query.limit || 10)
            return {res:blogs,code:200,message:"Blogs Fetched"}
       } catch (error) {
        logger.error(`ERR_WHILE_FETCHING_BLOGS_IN_DB_SERVICE ${error}`)
        return {code:500,res:null,message:"Internal server error"}
        }
    }
    

    async updateBlog(query:UpdateBlogBody){
        try {
            const blog = await Blog.updateOne({_id:query._blogId},{$set:query.updatedFeilds})
            if(blog.modifiedCount) return {code:200,message:"Blog updated successfully",res:null}
            return {code:404,message:"Blog does'nt exists",res:null}
        } catch (error) {
            logger.error(`ERR_WHILE_UPDATING_BLOG_IN_DB_SERVICE ${error}`)
        return {code:500,res:null,message:"Internal server error"}
        }
    }

    async updateProfile(query:UpdateProfileBody){
        try {
            const userProfile = await UserProfile.updateOne({_id:query._profileId},{$set:query.updatedFeilds})
            if(userProfile.modifiedCount) return {code:200,message:"Profile updated successfully",res:null}
            return {code:404,message:"Profile does'nt exists",res:null}
        } catch (error) {
            logger.error(`ERR_WHILE_UPDATING_USERPROFILE_IN_DB_SERVICE ${error}`)
        return {code:500,res:null,message:"Internal server error"}
        }
    }
}

const dbService = new DBService();
export default dbService