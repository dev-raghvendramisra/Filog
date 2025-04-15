import mongoose from "mongoose"
import { UserSchema,UserProfileSchema,CommentSchema,BlackListedTokenSchema,BlogSchema, CustomNotificationSchema, GeneralNotifcationSchema } from "./schema"


export const User = mongoose.model("User",UserSchema,"Users")
export const UserProfile = mongoose.model("UserProfile",UserProfileSchema,"User-Profiles")
export const Blog = mongoose.model("Blog",BlogSchema,"Blogs")
export const BlackListedToken = mongoose.model("BlackListedToken",BlackListedTokenSchema,"BlackListed-Tokens")
export const Comment = mongoose.model("Comment",CommentSchema,"Comments")
export const CustomNotification = mongoose.model("CustomNotification",CustomNotificationSchema, "Custom-Notifcations")
export const GeneralNotification = mongoose.model("GeneralNotifcation",GeneralNotifcationSchema, "General-Notifcations")

