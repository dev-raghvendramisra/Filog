import { z } from "zod";

export const genEVSchema  = z.object({
    email:z.string(),
    userId:z.string()
}).strict()

export const verEVShcema  = z.object({
    token:z.string(),
    userId:z.string()
}).strict()

export const genMagicUrlShcema = z.object({
    email:z.string()
}).strict()

export const verMagicUrlSchema = z.object({
    token:z.string(),
    userId:z.string()
}).strict()

export const resetPassSchema = z.object({
    userId:z.string(),
    password:z.string()
}).strict()

export const adminAuthSchema = z.object({
    email:z.string(),
    password:z.string()
}).strict()

export type GenEVerification = z.infer<typeof genEVSchema>
export type VerEVerfication = z.infer<typeof verEVShcema>
export type GenMagicUrl = z.infer<typeof genMagicUrlShcema>
export type VerMagicUrl = z.infer<typeof verMagicUrlSchema>
export type ResetPass = z.infer<typeof resetPassSchema>
export type AdminAuth = z.infer<typeof adminAuthSchema>