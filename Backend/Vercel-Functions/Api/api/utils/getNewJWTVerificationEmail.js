// description: This file defines a function that generates a new JWT token and sends a verification email to the user.
// It uses the sendVerificationEmail function from the emailverification folder to send the email.
// It returns an object with ok, res, and code properties.

import sendEmail from "../mail-service/sendEmail.js";
import jwt from 'jsonwebtoken';
import conf from '../../conf/conf.js';

export default async function getNewJWTVerificationEmail(userId, email, emailTypeKey="__email1" ,expiryDate = new Date().getTime()+60*60*1000, expiry = '1h') {
    try {

        const token = jwt.sign({ userId }, conf.jwtSecret, { expiresIn: expiry }) // 1 hour from now
        const emailRes = await sendEmail(email, userId, token, expiryDate,emailTypeKey)
        if (emailRes.ok) {
            console.log("Email sent successfully")
            return { ok: true, res: { userId: userId, secret: token, expiry: expiryDate }, code: 200 }
        } console.log("Failed to send email", emailRes.res)
        return { ok: false, res: emailRes.res, code: 500 }

    } catch (error) {
        console.log("Error generating JWT token and sending email:", error)
        return { ok: false, res: error, code: 500 }

    }
}