import {EMAIL_MAP, EMAIL_TYPES } from "config/constants";

import conf from '../config/conf';
import { getMailContent } from '../utils';
import nodemailer from 'nodemailer';
import { envLogger as logger } from '@lib';

export default async function mailer(emailType : keyof typeof EMAIL_TYPES,mailData:{
    recipient:string,
    embeddedUrl:string
}){
   try {
  
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: "filogteam@gmail.com",
            pass:conf.SERVICE_EMAIL_PASSWORD
        }
    })
    const mailOptions = {
        from:`Filog Team <${conf.SERVICE_EMAIL}>`,
        to: mailData.recipient,
        subject: EMAIL_MAP[emailType].SUBJECT,
        html: getMailContent(emailType,mailData.embeddedUrl),
    };

    const result =  await transporter.sendMail(mailOptions);
    return {ok:true,res:result};
         
   } catch (error : any) {
         logger.error("Error sending email:",error.message)
         return {ok:false,res:error}
   }
}

