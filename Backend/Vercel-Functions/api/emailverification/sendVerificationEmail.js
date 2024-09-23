// description: send verification email to user's email address
// It uses nodemailer to send the email
// It uses the the service email id's password to send the email
// It returns an object with ok and res properties


import nodemailer from 'nodemailer';
import conf from '../conf/conf.js';

export default async function sendVerificationEmail(email, userId, secret, expiry) {
   const verificationUrl = `${conf.emailVerificationUrl}?userId=${userId}&secret=${secret}&expire=${expiry}`
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
        subject: 'Account Verification',
        text: `Welcome to Filog. Please verify your email by clicking the following link: ${verificationUrl}`,
        html: `<h1>Welcome to Filog</h1>
        <p>Please verify your email by clicking the link below:</p>
        <a href="${verificationUrl}">Verify Email</a>
        <p>Thank you for joining us!</p>
        <p>Team Filog</p>`,
    };
    const result = await transporter.sendMail(mailOptions);
    return {ok:true,res:result};
   } catch (error) {
      return {ok:false,res:error};
   }
}

