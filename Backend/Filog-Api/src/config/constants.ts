import { genEVSchema,  genMagicUrlShcema,  loginSchema,  resetPassSchema,  signupSchema,  verEVShcema,  verMagicUrlSchema } from "@type/request/body"
import { ZodObject } from "zod"
import conf from "./conf"

 const ROUTES = {
    "/api/v1/auth/email-verification/generate":"/api/v1/auth/email-verification/generate",
        "/api/v1/auth/email-verification/verify":"/api/v1/auth/email-verification/verify",
        "/api/v1/auth/magic-url/generate":"/api/v1/auth/magic-url/generate",
        "/api/v1/auth/magic-url/verify":"/api/v1/auth/magic-url/verify",
        "/api/v1/auth/signup":"/api/v1/auth/signup",
        "/api/v1/auth/login":"/api/v1/auth/login",
        "/api/v1/auth/reset-password":"/api/v1/auth/reset-password"
 } as const

  const EMAIL_TYPES = {
    "VERIFICATION_EMAIL":"VERIFICATION_EMAIL",
    "MAGICURL_EMAIL":"MAGICURL_EMAIL"
 } as const

const ROUTE_MAP : Record<keyof typeof ROUTES,{BODY_SCHEMA:ZodObject<{}>,ERROR_MESSAGE:string}> = {
  [ROUTES["/api/v1/auth/email-verification/generate"]]:{
     BODY_SCHEMA : genEVSchema,
     ERROR_MESSAGE: "Request lacks userId or email"
  },
  [ROUTES["/api/v1/auth/email-verification/verify"]]:{
    BODY_SCHEMA:verEVShcema,
    ERROR_MESSAGE: "Request lacks token"
  },
  [ROUTES["/api/v1/auth/magic-url/generate"]]:{
   BODY_SCHEMA : genMagicUrlShcema,
    ERROR_MESSAGE: "Request lacks email"
  },
  [ROUTES["/api/v1/auth/magic-url/verify"]]:{
   BODY_SCHEMA:verMagicUrlSchema,
   ERROR_MESSAGE: "Request lacks token"
  },
  [ROUTES["/api/v1/auth/reset-password"]]:{
   BODY_SCHEMA:resetPassSchema,
   ERROR_MESSAGE: "Request lacks password or userId"
  },
  [ROUTES["/api/v1/auth/signup"]]:{
   BODY_SCHEMA:signupSchema,
   ERROR_MESSAGE:"Request lacks any of them:(email, password, username, fullname)"
  },
  [ROUTES["/api/v1/auth/login"]]:{
    BODY_SCHEMA:loginSchema,
    ERROR_MESSAGE:"Request lacks any one of them :(email, password) "
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


export {ROUTE_MAP,ROUTES,EMAIL_MAP,EMAIL_TYPES}
