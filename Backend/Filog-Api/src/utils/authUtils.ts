import { createJwt } from "@lib";
import { Response } from "express";


export async function sendSessionCookie(res:Response,data:object){
   const age = 1000*60*60*24*15
   const token = createJwt(data,age)
   return res.cookie('auth_token',token,{
    httpOnly:true,
    secure:process.env.ENV!=="development",
    sameSite:"none",
    maxAge:age,
   })
}
