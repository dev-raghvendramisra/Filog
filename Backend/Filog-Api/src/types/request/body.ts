import { Request } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { z } from "zod";

/**
 * Zod schema for generating email verification requests.
 */
export const genEVSchema  = z.object({
    email:z.string(),
    userId:z.string()
}).strict()

/**
 * Zod schema for verifying email verification tokens.
 */
export const verEVShcema  = z.object({
    token:z.string()
}).strict()

export const genMagicUrlShcema = z.object({
    email:z.string()
}).strict()

export const verMagicUrlSchema = z.object({
    token:z.string()
}).strict()

export const resetPassSchema = z.object({
    password:z.string()
}).strict()

export const signupSchema = z.object({
    fullName:z.string(),
    email:z.string(),
    userName:z.string(),
    password:z.string(),
    userAvatar:z.string().optional(),
    emailVerification:z.boolean().optional()
}).strict()

export const loginSchema = z.object({
    email:z.string(),
    password:z.string()
}).strict()

export const createUserProfileSchema = z.object({
    userId: z.string(),
    userAvatar: z.string(),
    userName: z.string(),
    fullName:z.string(),
    userAvatarId: z.union([z.string(),z.null()]).optional(),
    isFilogVerified: z.boolean().optional(),
    blogsWritten: z.number().optional(),
    activeness: z.number().optional(),
    blogsLiked: z.array(z.string()).optional(),
    followers: z.array(z.string()).optional(),
    following: z.array(z.string()).optional()
}).strict()

export const updateUserProfileSchema = z.object({
    _userId:z.string(),
    updatedFields : createUserProfileSchema.omit({userId:true}).partial()
})

export const createBlogSchema = z.object({
    title: z.string(),
    createdAt: z.string(),
    content:z.string(),
    userId: z.string(),
    tags: z.array(z.string()).optional(),
    coverImageId: z.string(),
    subImagesId: z.array(z.string()).optional(),
    status: z.boolean(),
    coverImageURI: z.string(),
    subImageURI: z.array(z.string()).optional(),
    author: z.string(),
    slug: z.string(),
    permissions:z.array(z.string())
}).strict()

export const updateBlogSchema = z.object({
    _blogId:z.string(),
    updatedFields:createBlogSchema.omit({userId:true,author:true,createdAt:true}).partial()
})

/**
 * Interface for user data stored in cookies.
 */
export interface UserDataInCookie{
    _id:string,
    userName:string,
    fullName:string,
    email:string
}

/**
 * Extended Express Request interface for authenticated requests.
 */
export interface AuthenticatedRequest<P=ParamsDictionary,T=any,B=any> extends Request<P,T,B>{
    userData?:UserDataInCookie
}

export type GenEVerification = z.infer<typeof genEVSchema>
export type VerEVerfication = z.infer<typeof verEVShcema>
export type GenMagicUrl = z.infer<typeof genMagicUrlShcema>
export type VerMagicUrl = z.infer<typeof verMagicUrlSchema>
export type ResetPass = z.infer<typeof resetPassSchema>
export type SignupBody = z.infer<typeof signupSchema>
export type UserProfileBody = z.infer<typeof createUserProfileSchema>
export type LoginBody = z.infer<typeof loginSchema>
export type BlogBody = z.infer<typeof createBlogSchema>
export type UpdateBlogBody = z.infer<typeof updateBlogSchema>
export type UpdateProfileBody = z.infer<typeof updateUserProfileSchema>

