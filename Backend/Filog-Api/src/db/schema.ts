import mongoose, {Types } from "mongoose";
import { hashPassword } from "./hooks";

export const UserSchema = new mongoose.Schema({
    fullName:{type:String,required:true},
    userName:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    emailVerification:{type:Boolean,required:false,default:false}
})

export const CustomNotificationSchema = new mongoose.Schema({
    _id:{type:Types.ObjectId,required:false},
    type:{type:String,default:"custom",required:false,immutable:true},
    message:{type:String,required:true},
    icon:{type:String,required:true},
    createdAt:{type:Number,required:true},
    userId:{type:String,required:true},
    link:{type:String,required:false,default:null},
    readAt:{type:Number, required: false, default:null}
})

export const GeneralNotifcationSchema = new mongoose.Schema({
    type:{type:String,default:"general",required:false,immutable:true},
    message:{type:String,required:true},
    icon:{type:String,required:true},
    createdAt:{type:Number,required:true},
    readBy:[{type:String,required:false,default:[]}],
    link:{type:String,required:false,default:null},
    clearedBy:[{type:String,required:false, default:[]}],
})

export const UserProfileSchema = new mongoose.Schema({
    userId:{type:String,required:true},
    userAvatar:{type:String,required:true},
    userName:{type:String,required:true},
    fullName:{type:String,required:true},
    userAvatarId:{type:String,required:false,default:null},
    isFilogVerified:{type:Boolean,required:false,default:false},
    blogsWritten:{type:Number,required:false,default:0},
    activeness:{type:Number,required:false,default:0},
    customNotifications:[{type:Types.ObjectId,required:false,default:[],ref:"CustomNotification"}],
    blogsLiked:[
        {type:String, default:[]}
    ],
    followers:[
        {type:String, default:[]}
    ],
    following:[
        {type:String,  default:[]}
    ]
    
})

export const BlogSchema = new mongoose.Schema({
    title:{type:String,required:true},
    createdAt:{type:String,required:true},
    userId:{type:String,required:true},
    tags:[{
        type:String,required:false,default:[]
    }],
    content:{type:String,required:true},
    coverImageId:{type:String,required:true},
    subImagesId:[{type:String,required:false,default:[]}],
    status:{type:Boolean,required:true},
    coverImageURI:{type:String,required:true},
    subImageURI:[{type:String,required:false,default:[]}],
    likeCount:{type:Number,required:false,default:0},
    commentCount:{type:Number,required:false,default:0},
    permissions:[
        {type:String,required:true}
    ],
    comments:[{
      type:Types.ObjectId,
      required:false,
      default:[],
      ref:"Comments"
    }],
    author:{
        type:Types.ObjectId,
        required:true,
        ref:"UserProfile"
    },
    slug:{type:String,required:true}
})

export const BlackListedTokenSchema = new mongoose.Schema({
    tokens:[{
        type:String,default:[]
    }]
})

export const CommentSchema = new mongoose.Schema({
    blogId:{type:Types.ObjectId, ref:"Blogs",required:true},
    userId:{type:Types.ObjectId, ref:"User",required:true},
    comment:{type:String,required:true}
})


UserSchema.pre("save",hashPassword)

