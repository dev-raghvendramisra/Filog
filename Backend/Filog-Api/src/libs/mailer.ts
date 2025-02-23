import {EMAIL_MAP, EMAIL_TYPES } from "config/constants";

import conf from '../config/conf';
import {getMailContent} from '@utils/mailUtils';
import nodemailer from 'nodemailer';
import { envLogger as logger } from './winstonLogger';
import {createJwt} from './jwt'


interface ARGSMAP {
    [EMAIL_TYPES.MAGICURL_EMAIL]:{
        email:string,
        URI?:false | string
    },
    [EMAIL_TYPES.VERIFICATION_EMAIL]:{
        userId:string,
        email:string,
        URI?:false | string
    }
}

export default async function mailer<K extends keyof ARGSMAP>(emailType:K, requiredFeilds:ARGSMAP[K]){
   try {

      let URI;

      if(typeof requiredFeilds.URI=="string"){
        URI=requiredFeilds.URI
      }
      else if (requiredFeilds.URI!==false && typeof requiredFeilds.URI == "undefined"){
          const expiry = 60*15
          const token = createJwt({...requiredFeilds},expiry) 
          URI = `${EMAIL_MAP[EMAIL_TYPES[emailType]].FRONTEND_ENDPOINT}?secret=${token}&expire=${expiry}`
      }
       
  
       const mailOptions = {
           from:`Filog Team <${conf.SERVICE_EMAIL}>`,
           to: requiredFeilds.email,
           subject: EMAIL_MAP[emailType].SUBJECT,
           html: getMailContent(emailType,URI),
        };
        
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: "filogteam@gmail.com",
                pass:conf.SERVICE_EMAIL_PASSWORD
            }
        })
    await transporter.sendMail(mailOptions);
    return {code:200,res:null,message:"Email sent successfully"};
         
   } catch (error : any) {
     logger.error("Error sending email:",error.message)
     return {code:500,res:null,message:"Internal server error"}
   }
}

