// description: This file defines a function that generates a new JWT token and sends a verification email to the user.
// It uses the sendVerificationEmail function from the emailverification folder to send the email.
// It returns an object with ok, res, and code properties.

import sendVerificationEmail from "../emailverification/sendVerificationEmail.js";
import jwt from 'jsonwebtoken';
import conf from '../../conf/conf.js';

export default async function getNewJWTVerificationEmail(userId, email) {
    try {

        const expiry = '1h';
        const token = jwt.sign({ userId }, conf.jwtSecret, { expiresIn: expiry })
        const expiryDate = new Date(Date.now() + 3600000); // 1 hour from now
        const formattedExpiry = expiryDate.toISOString().slice(0, 19).replace('T', ' ');
        const emailRes = await sendVerificationEmail(email, userId, token, encodeURIComponent(formattedExpiry))
        if (emailRes.ok) {
            console.log("Email sent successfully", emailRes.res)
            return { ok: true, res: { userId: userId, secret: token, expiry: expiryDate }, code: 200 }
        } console.log("Failed to send email", emailRes.res)
        return { ok: false, res: emailRes.res, code: 500 }

    } catch (error) {
        console.log("Error generating JWT token and sending email:", error)
        return { ok: false, res: error, code: 500 }

    }
}