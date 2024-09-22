import nodemailer from 'nodemailer';
import { google } from 'googleapis';
import conf from '../../conf/conf.js';

export default async function sendVerificationEmail(email, verificationUrl) {
   const oAuth2Client = new google.auth.OAuth2(conf.oAuthClientId,conf.oAuthClientSecret)
   oAuth2Client.setCredentials({ refresh_token: conf.oAuthRefreshToken });

   try {
    const accessToken = await oAuth2Client.getAccessToken();

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: 'filogteam@gmail.com',
            clientId:conf.oAuthClientId,
            clientSecret:conf.oAuthClientSecret,
            refreshToken:conf.oAuthRefreshToken,
            accessToken: accessToken.token
        }
    })
    const mailOptions = {
        from:'Filog Team <filogteam@gmail.com>',
        to: email,
        subject: 'Account Verification',
        html: `<h1>Welcome to Filog</h1>`,
        text: `This is the test email from filog`
    }
    const result = await transporter.sendMail(mailOptions);
    return {ok:true,res:result};
   } catch (error) {
      return {ok:false,res:error};
   }
}