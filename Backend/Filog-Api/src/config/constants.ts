import { createBlogSchema, genEVSchema,  genMagicUrlShcema,  loginSchema,  resetPassSchema,  signupSchema,  updateBlogSchema,  updateUserProfileSchema,  verEVShcema,  verMagicUrlSchema } from "@type/request/body"
import { ZodObject } from "zod"
import conf from "./conf"

 const ROUTES = {
    "/api/v1/auth/email-verification/generate":"/api/v1/auth/email-verification/generate",
        "/api/v1/auth/email-verification/verify":"/api/v1/auth/email-verification/verify",
        "/api/v1/auth/magic-url/generate":"/api/v1/auth/magic-url/generate",
        "/api/v1/auth/magic-url/verify":"/api/v1/auth/magic-url/verify",
        "/api/v1/auth/signup":"/api/v1/auth/signup",
        "/api/v1/auth/login":"/api/v1/auth/login",
        "/api/v1/auth/reset-password":"/api/v1/auth/reset-password",
        "/api/v1/db/profile/update" : "/api/v1/db/profile/update",
        "/api/v1/db/blog/update" : "/api/v1/db/blog/update",
        "/api/v1/db/blog/create" : "/api/v1/db/blog/create"
 } as const

  const EMAIL_TYPES = {
    "VERIFICATION_EMAIL":"VERIFICATION_EMAIL",
    "MAGICURL_EMAIL":"MAGICURL_EMAIL"
 } as const

const ROUTE_MAP : Record<keyof typeof ROUTES,{BODY_SCHEMA:ZodObject<{}>,ERROR_MESSAGE:string}> = {
  [ROUTES["/api/v1/auth/email-verification/generate"]]:{
     BODY_SCHEMA : genEVSchema,
    ERROR_MESSAGE:getERRMSG(genEVSchema)
    },
  [ROUTES["/api/v1/auth/email-verification/verify"]]:{
    BODY_SCHEMA:verEVShcema,
    ERROR_MESSAGE:getERRMSG(verEVShcema)
  },
  [ROUTES["/api/v1/auth/magic-url/generate"]]:{
   BODY_SCHEMA : genMagicUrlShcema,
    ERROR_MESSAGE:getERRMSG(genMagicUrlShcema)
  },
  [ROUTES["/api/v1/auth/magic-url/verify"]]:{
   BODY_SCHEMA:verMagicUrlSchema,
    ERROR_MESSAGE:getERRMSG(verMagicUrlSchema)
  },
  [ROUTES["/api/v1/auth/reset-password"]]:{
   BODY_SCHEMA:resetPassSchema,
    ERROR_MESSAGE:getERRMSG(resetPassSchema)
  },
  [ROUTES["/api/v1/auth/signup"]]:{
   BODY_SCHEMA:signupSchema,
    ERROR_MESSAGE:getERRMSG(signupSchema)
  },
  [ROUTES["/api/v1/auth/login"]]:{
    BODY_SCHEMA:loginSchema,
    ERROR_MESSAGE:getERRMSG(loginSchema)
  },
  [ROUTES["/api/v1/db/profile/update"]]:{
    BODY_SCHEMA:updateUserProfileSchema,
    ERROR_MESSAGE:getERRMSG(updateBlogSchema)
  },
  [ROUTES["/api/v1/db/blog/update"]]:{
    BODY_SCHEMA:updateBlogSchema,
    ERROR_MESSAGE:getERRMSG(updateBlogSchema)
  },
  [ROUTES["/api/v1/db/blog/create"]]:{
    BODY_SCHEMA:createBlogSchema,
    ERROR_MESSAGE:getERRMSG(createBlogSchema)
  }
} as const


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
