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

export default async function mailer<K extends keyof ARGSMAP>(emailType:K, requiredFields:ARGSMAP[K]){
   try {

      let URI;

      if(typeof requiredFields.URI=="string"){
        URI=requiredFields.URI
      }
      else if (requiredFields.URI!==false && typeof requiredFields.URI == "undefined"){
          const expiresIn = 60*15
          const token = createJwt("SESSION",{...requiredFields},expiresIn) 
          URI = `${EMAIL_MAP[EMAIL_TYPES[emailType]].FRONTEND_ENDPOINT}?secret=${token}&expire=${Date.now()+expiresIn*1000}`
      }
       
  
       const mailOptions = {
           from:`Filog Team <${conf.SERVICE_EMAIL}>`,
           to: requiredFields.email,
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
        transporter.sendMail(mailOptions).catch((err) => logger.error(`ERR_WHILE_SENDING_EMAIL ${err}`))
        return {code:200,res:null,message:"Email sent successfully"};
        
   } catch (error : any) {
     logger.error("Error sending email:",error.message)
     return {code:500,res:null,message:"Internal server error"}
   }
}

