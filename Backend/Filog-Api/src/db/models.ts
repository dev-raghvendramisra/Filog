import mongoose from "mongoose"
import { UserSchema,UserProfileSchema,CommentSchema,BlackListedTokenSchema,BlogSchema } from "./schema"


export const User = mongoose.model("User",UserSchema,"Users")
export const UserProfile = mongoose.model("UserProfile",UserProfileSchema,"UserProfiles")
export const Blog = mongoose.model("Blog",BlogSchema,"Blogs")
export const BlackListedToken = mongoose.model("BlackListedToken",BlackListedTokenSchema,"BlackListedTokens")
export const Comment = mongoose.model("Comment",CommentSchema,"Comments")

