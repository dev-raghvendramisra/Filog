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
        html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Verify Email</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f9f9f9;
        margin: 0;
        padding: 0;
      }
      .email-container {
        max-width: 600px;
        margin: 20px auto;
        background-color: #fff;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
      }
      .logo {
        text-align: center;
        margin-bottom: 20px;
      }
      .logo img {
        width: 80px;
      }
      .content {
        text-align: center;
      }
      .content h1 {
        color: #333;
        font-size: 24px;
      }
      .content p {
        color: #555;
        font-size: 16px;
      }
      .btn {
        display: inline-block;
        background-color: #194fe6; 
        color: #ffffff;
        padding: 12px 25px;
        text-decoration: none;
        border-radius: 5px;
        font-weight: bold;
        margin-top: 20px;
      }
      .btn:hover {
        background-color: #143cb0;
      }
      .footer {
        margin-top: 30px;
        text-align: center;
        font-size: 12px;
        color: #999;
      }
    </style>
  </head>
  <body>
    <div class="email-container">
      <div class="logo">
        <img src="https://fiilog.vercel.app/meta/android-chrome-192x192.png" alt="Filog Logo" />
      </div>
      <div class="content">
        <h1>Help us to verify your email address</h1>
        <p>
          Verify your email address to help keep your account more secure and up-to-date.
        </p>
        <a href=${verificationUrl} class="btn">Verify email</a>
        <p>This link will expire in 1 hour</p>
        <p>
          Didn't create a Filog account? <a href="https://fiilog.vercel.app">Join now</a>.
        </p>
      </div>
      <div class="footer">
        <p>The Filog team</p>
      </div>
    </div>
  </body>
</html>
`,
    };
    const result = await transporter.sendMail(mailOptions);
    return {ok:true,res:result};
   } catch (error) {
      return {ok:false,res:error};
   }
}

