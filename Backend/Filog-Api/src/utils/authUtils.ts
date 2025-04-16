import { createJwt } from "@lib";
import { Response } from "express";
import { googleOAuthClient } from "@lib";
import conf from "config/conf";
import { envLogger as logger } from "@lib";

/**
 * Sends a session cookie to the client.
 * @param res - The Express response object.
 * @param data - The data to include in the JWT.
 */
export async function sendSessionCookie(res:Response,data:object){
   const age = 1000*60*60*24*15
   const token = createJwt("SESSION",data,age)
   return res.cookie('auth_token',token,{
    httpOnly:true,
    secure:conf.ENV=="production",
    sameSite:"strict",
    maxAge:age,
   })
}

/**
 * Fetches the Google OAuth user data using the provided authorization code.
 * @param code - The authorization code from Google.
 * @returns The user data or an error response.
 */
export async function getGoogleOAuthUser(code:string){
   googleOAuthClient.setCredentials({})
   try {
       const {tokens} = await googleOAuthClient.getToken(code)
       googleOAuthClient.setCredentials(tokens)
       const googleUser = await googleOAuthClient.verifyIdToken({
           idToken:tokens.id_token as string,
           audience:conf.GOOGLE_OAUTH_CLIENT_ID
       })
       const userData = googleUser.getPayload()
       if(typeof userData == "undefined") throw null
       return {code:200,message:"Google user found", res:userData}
   } catch (error) {
       logger.error(`ERR_WHILE_GETTING_GOOGLE_USER ${error}`)
       return {code:500,message:"Error occured on google's end",res:null}
   }
}

/**
 * Formats the current time and date into a readable string.
 * @param milliseconds - Whether to include milliseconds in the formatted time.
 * @returns The formatted time and date string.
 */
export  function getFormattedTime(milliseconds = false) {
    const crrDate = new Date();
    let formattedDate = crrDate.toDateString();
    formattedDate = formattedDate.substring(
        formattedDate.indexOf(" ") + 1,
        formattedDate.length
    );
    let time = crrDate.toTimeString();
    
    // Format hours and minutes
    time = time.substring(0, time.lastIndexOf(":"));

    // Add seconds and milliseconds if the parameter is true
    if (milliseconds) {
        const seconds = crrDate.getSeconds().toString().padStart(2, "0");
        const millis = crrDate.getMilliseconds().toString().padStart(3, "0");
        time += `:${seconds}.${millis}`;
    }

    // Append AM/PM
    if (crrDate.getHours() < 12) {
        time += " AM";
    } else {
        time += " PM";
    }

    formattedDate += " " + time;
    return formattedDate;
}
