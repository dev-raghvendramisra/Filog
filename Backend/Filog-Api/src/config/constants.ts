import { genEVSchema,  genMagicUrlShcema,  resetPassSchema,  verEVShcema,  verMagicUrlSchema } from "types/req.body"
import { ZodObject } from "zod"
import conf from "./conf"

 const ROUTES = {
    "/apis/auth/email-verification/generate":"/apis/auth/email-verification/generate",
        "/apis/auth/email-verification/verify":"/apis/auth/email-verification/verify",
        "/apis/auth/magic-url/generate":"/apis/auth/magic-url/generate",
        "/apis/auth/magic-url/verify":"/apis/auth/magic-url/verify",
        "/apis/auth/reset-password":"/apis/auth/reset-password"
 } as const

 const EMAIL_TYPES = {
    "VERIFICATION_EMAIL":"VERIFICATION_EMAIL",
    "MAGICURL_EMAIL":"MAGICURL_EMAIL"
 } as const

const ROUTE_MAP : Record<keyof typeof ROUTES,{BODY_SCHEMA:ZodObject<{}>,ERROR_MESSAGE:string}> = {
   [ROUTES["/apis/auth/email-verification/generate"]]:{
       BODY_SCHEMA : genEVSchema,
       ERROR_MESSAGE: "Request lacks userId or email"
   },
   [ROUTES["/apis/auth/email-verification/verify"]]:{
     BODY_SCHEMA:verEVShcema,
     ERROR_MESSAGE: "Request lacks token or userId"
   },
   [ROUTES["/apis/auth/magic-url/generate"]]:{
    BODY_SCHEMA : genMagicUrlShcema,
     ERROR_MESSAGE: "Request lacks email"
   },
   [ROUTES["/apis/auth/magic-url/verify"]]:{
    BODY_SCHEMA:verMagicUrlSchema,
    ERROR_MESSAGE: "Request lacks token or userId"
   },
   [ROUTES["/apis/auth/reset-password"]]:{
    BODY_SCHEMA:resetPassSchema,
    ERROR_MESSAGE: "Request lacks password or userId"
   }
} as const


const EMAIL_MAP : Record<keyof typeof EMAIL_TYPES,{
  SUBJECT:string,
  FRONTEND_ENDPOINT:string,
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


export {ROUTE_MAP,ROUTES,EMAIL_MAP,EMAIL_TYPES}
