// description: send verification email to user's email address
// It uses nodemailer to send the email
// It uses the the service email id's password to send the email
// It returns an object with ok and res properties


import nodemailer from 'nodemailer';
import conf from '../../conf/conf.js'
import {Email} from '../appwrite-services/index.js'

export default async function sendEmail(email, userId, secret, expiry, emailTypeKey) {
   const verificationUrl = `${conf.email[emailTypeKey].url}?userId=${userId}&secret=${secret}&expire=${expiry}`
   try {
    
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'filogteam@gmail.com',
            pass:conf.googlAppPass
        }
    })
    const mailOptions = {
        from:`Filog Team <${conf.serviceEmail}>`,
        to: email,
        subject: conf.email[emailTypeKey].subject,
        html: Email.generate(conf.email[emailTypeKey].type,verificationUrl),
    };

    const result =  await transporter.sendMail(mailOptions);
    
    return {ok:true,res:result};
   } catch (error) {
      return {ok:false,res:error};
   }
}

