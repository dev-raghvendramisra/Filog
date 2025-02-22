import { envLogger } from "@lib";
import { genSalt, hash } from "bcrypt";
import mongoose, {Types } from "mongoose";

export const UserSchema = new mongoose.Schema({
    fullname:{type:String,required:true},
    username:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    emailVerification:{type:Boolean,required:false,default:false}
})

export const UserProfileSchema = new mongoose.Schema({
    userId:{type:Types.ObjectId,ref:"User",required:true},
    userAvatar:{type:String,required:true},
    username:{type:String,required:true},
    userAvatarId:{type:String,required:false,default:null},
    isFilogVerified:{type:Boolean,required:false,default:false},
    blogsWritten:{type:Number,required:false,default:0},
    activeness:{type:Number,required:false,default:0},
    blogsLiked:[
        {type:Types.ObjectId,ref:"Blogs",default:[]}
    ],
    followers:[
        {type:Types.ObjectId, ref:"User",default:[]}
    ],
    following:[
        {type:Types.ObjectId, ref:"User", default:[]}
    ]
    
})

export const BlogSchema = new mongoose.Schema({
    title:{type:String,required:true},
    createdAt:{type:String,required:true},
    userId:{type:String,required:true},
    tags:[{
        type:String,required:false,default:[]
    }],
    coverImageId:{type:String,required:true},
    subImagesId:[{type:String,required:false,default:[]}],
    status:{type:Boolean,required:true},
    coverImageURI:{type:String,required:true},
    subImageURI:[{type:String,required:false,default:[]}],
    likeCount:{type:Number,required:false,default:0},
    commentCount:{type:Number,required:false,default:0},
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


UserSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        return next()
    }
    try {
        const salt = await genSalt(10);
        this.password = await hash(this.password,salt)
    } catch (error) {
       envLogger.error(`ERR_OCCURED_WHILE_HASHING_PASS ${JSON.stringify(error,null,2)}`)
       next(error as mongoose.CallbackError)
    }
})

