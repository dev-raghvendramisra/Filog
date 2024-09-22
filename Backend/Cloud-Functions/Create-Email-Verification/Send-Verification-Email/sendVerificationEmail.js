import nodemailer from 'nodemailer';
import conf from '../../conf/conf.js';

export default async function sendVerificationEmail(email, verificationUrl) {
   
   try {

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'filogteam@gmail.com',
            pass:conf.googlAppPass
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

