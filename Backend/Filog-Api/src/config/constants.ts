import { createBlogSchema, genEVSchema,  genMagicUrlShcema,  loginSchema,  resetPassSchema,  signupSchema,  updateBlogSchema,  updateUserProfileSchema,  verEVShcema,  verMagicUrlSchema } from "@type/request/body"
import { ZodObject } from "zod"
import conf from "./conf"

const ROUTES = [
  "GET /api/v1/auth/email-verification",
  "PATCH /api/v1/auth/email-verification",
  "POST /api/v1/auth/magic-url",
  "PATCH /api/v1/auth/magic-url",
  "POST /api/v1/auth/register",
  "POST /api/v1/auth/login",
  "PATCH /api/v1/auth/reset-password",
  "PATCH /api/v1/db/profile",
  "POST /api/v1/db/blogs",
  "PATCH api/v1/db/blogs/:_blogId"
] as const;

  const EMAIL_TYPES = {
    "VERIFICATION_EMAIL":"VERIFICATION_EMAIL",
    "MAGICURL_EMAIL":"MAGICURL_EMAIL"
 } as const

const ROUTE_MAP: Record<typeof ROUTES[number], { BODY_SCHEMA: ZodObject<{}>, ERROR_MESSAGE: string }> = {
  [ROUTES[0]]: {
    BODY_SCHEMA: genEVSchema,
    ERROR_MESSAGE: getERRMSG(genEVSchema)
  },
  [ROUTES[1]]: {
    BODY_SCHEMA: verEVShcema,
    ERROR_MESSAGE: getERRMSG(verEVShcema)
  },
  [ROUTES[2]]: {
    BODY_SCHEMA: genMagicUrlShcema,
    ERROR_MESSAGE: getERRMSG(genMagicUrlShcema)
  },
  [ROUTES[3]]: {
    BODY_SCHEMA: verMagicUrlSchema,
    ERROR_MESSAGE: getERRMSG(verMagicUrlSchema)
  },
  [ROUTES[4]]: {
    BODY_SCHEMA: signupSchema,
    ERROR_MESSAGE: getERRMSG(signupSchema)
  },
  [ROUTES[5]]: {
    BODY_SCHEMA: loginSchema,
    ERROR_MESSAGE: getERRMSG(loginSchema)
  },
  [ROUTES[6]]: {
    BODY_SCHEMA: resetPassSchema,
    ERROR_MESSAGE: getERRMSG(resetPassSchema)
  },
  [ROUTES[7]]: {
    BODY_SCHEMA: updateUserProfileSchema,
    ERROR_MESSAGE: getERRMSG(updateUserProfileSchema)
  },
  [ROUTES[8]]: {
    BODY_SCHEMA: createBlogSchema,
    ERROR_MESSAGE: getERRMSG(createBlogSchema)
  },
  [ROUTES[9]]: {
    BODY_SCHEMA: updateBlogSchema,
    ERROR_MESSAGE: getERRMSG(updateBlogSchema)
  }
} as const;


const EMAIL_MAP : Record<keyof typeof EMAIL_TYPES,{
  SUBJECT:string,
  FRONTEND_ENDPOINT:string
}>  = {
  [EMAIL_TYPES.VERIFICATION_EMAIL]: {
    SUBJECT: "Account Verification",
    FRONTEND_ENDPOINT: conf.FRONTEND_ENDPOINT + "/verify-email",
},
  [EMAIL_TYPES.MAGICURL_EMAIL]:{
    SUBJECT: "Forget Password",
    FRONTEND_ENDPOINT: conf.FRONTEND_ENDPOINT + "/reset-password",
}
} as const


function getERRMSG(schema : ZodObject<{}>){
  return `Request lacks any of them : (${schema.keyof().options})`
}


export {ROUTE_MAP,ROUTES,EMAIL_MAP,EMAIL_TYPES}
