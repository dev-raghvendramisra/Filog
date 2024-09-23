// Description : Email Verification API for user email verification. This API is used to handle email verification requests. It receives a request with an action parameter and performs the corresponding action. If the action is "generate", it generates a new JWT verification email and sends it to the user. If the action is "verify", it verifies the JWT token and updates the user's email verification status in the database. The code uses functions from other files to send verification emails, verify JWT tokens, and update the database.

import {getJWTVerificationStatus, getNewJWTVerificationEmail} from "../utils/index.js"

export default async function handleEmailVerificationReq(req, res) {
    const { action } = req.body;
    console.log("Request received for action: ", action);

    if (action == "generate") {
        const { userId, email } = req.body;
        const res = await getNewJWTVerificationEmail(userId, email)
        return res.status(res.code).json({ ok: res.ok, res: res.res, code:res.code })
    }
    if (action == "verify") {
        const { token, userId } = req.body;
        const res = await getJWTVerificationStatus(token, userId)
        return res.status(res.code).json({ ok: res.ok, res: res.res, code:res.code })
        
    }
    return res.status(400).json({ ok: false, res: "Invalid action", code:400 })
}