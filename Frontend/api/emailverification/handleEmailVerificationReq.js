import authServices from "../services/authService.js";
import conf from "../conf/conf.js";
import jwt from "jsonwebtoken"
import sendVerificationEmail from "./sendVerificationEmail.js";

export default async function handleEmailVerificationReq(req, res) {
    const { action } = req.body;
    console.log("Request received for action: ", action);

    if (action == "generate") {
        const { userId, email } = req.body;
        const expiry = '1h';
        const token = jwt.sign({ userId }, conf.jwtSecret, { expiresIn: expiry })
        const expiryDate = new Date(Date.now() + 3600000); // 1 hour from now
        const formattedExpiry = expiryDate.toISOString().slice(0, 19).replace('T', ' ');
        const verificationUrl = `${conf.emailVerificationUrl}?userId=${userId}&secret=${token}&expire=${encodeURIComponent(formattedExpiry)}`
        const emailRes = await sendVerificationEmail(email, verificationUrl)
        if (emailRes.ok) {
            console.log("Email sent successfully", emailRes.res)
            return res.status(200).json({ ok: true, res: { userId: userId, secret: token, expiry: expiryDate } })
        } console.log("Failed to send email", emailRes.res)
        return res.status(500).json({ ok: false, res: emailRes })
    }
    if (action == "verify") {
        const { token, userId } = req.body;
        try {
            const decoded = jwt.verify(token, conf.jwtSecret)
            if (decoded.userId != userId) {
                console.log("Invalid token")
                return res.status(401).json({ ok: false, res: "Invalid token" })
            }
            console.log("Token verified successfully")
            const verifyEmail = await authServices.verifyEmail(userId)
            if (verifyEmail.ok) {
                console.log("Email verified successfully")
                return res.status(200).json({ ok: true, res: verifyEmail.res })
            } 
            console.log("Failed to verify email", verifyEmail.res)
            return res.status(500).json({ ok: false, res: verifyEmail.res })
        } catch (error) {
            if (error.name == "TokenExpiredError") {
                return res.status(401).json({ ok: false, res: "Token expired" })
            }
            console.log("Error verifying token:", error.message)
            return res.status(400).json({ ok: false, res: error.message })
        }
    }
    return res.status(400).json({ ok: false, res: "Invalid action" })
}