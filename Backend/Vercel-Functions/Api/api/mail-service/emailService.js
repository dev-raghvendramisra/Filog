// Description : Email Verification API for user email verification. This API is used to handle email verification requests. It receives a request with an action parameter and performs the corresponding action. If the action is "generate", it generates a new JWT verification email and sends it to the user. If the action is "verify", it verifies the JWT token and updates the user's email verification status in the database. The code uses functions from other files to send verification emails, verify JWT tokens, and update the database.

import conf from "../../conf/conf.js";
import {appwriteAuthService} from "../appwrite-services/index.js";
import { getJWTVerificationStatus, getNewJWTVerificationEmail } from "../utils/index.js"



export default async function emailService(req, res) {
    //  conf.projectEndpoint
    res.setHeader('Access-Control-Allow-Origin', "*"); // Update with correct frontend URL
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS'); // Allowed methods
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Allowed headers
    res.setHeader('Access-Control-Allow-Credentials', 'true');  

    if(req.method==="OPTIONS"){
        return res.status(200).end();
    }
    
    try {

        console.log(req.body)

        if (!req.body) {
            console.log("Invalid request")
            return res.status(404).json({ ok: false, res: "Invalid request", code: 404 })
        }
        if (!req.body.action) {
            console.log("Request lacks action parameter")
            return res.status(404).json({ ok: false, res: "Invalid action", code: 404 })
        }
        if (req.body.action.toLowerCase() == "generate-verification-email") {
            if (!req.body.userId || !req.body.email) {
                console.log("Request lacks userId or email")
                return res.status(404).json({ ok: false, res: "Invalid request", code: 404 })
            }
        }
        if (req.body.action.toLowerCase() == "verify-verification-email") {
            if (!req.body.token || !req.body.userId) {
                console.log("Request lacks token or userId")
                return res.status(404).json({ ok: false, res: "Invalid request", code: 404 })
            }
        }
        if(req.body.action.toLowerCase() == "generate-magicurl-email"){
            if(!req.body.email){
                console.log("Request lacks email")
                return res.status(404).json({ ok: false, res: "Invalid request", code: 404 })
            }
        }

     

        const { action } = req.body;
        console.log("Request received for action: ", action);

        if (action.toLowerCase() == "generate-verfication-email") {
            const { userId, email } = req.body;
            const emailRes = await getNewJWTVerificationEmail(userId, email)
            return res.status(emailRes.code).json({ ok: emailRes.ok, res: emailRes.res, code: emailRes.code })
        }
        else if (action.toLowerCase() == "verify-verification-email") {
            const { token, userId } = req.body;
            const statusRes = await getJWTVerificationStatus(token, userId)
            return res.status(statusRes.code).json({ ok: statusRes.ok, res: statusRes.res, code: statusRes.code })

        }
        else if(action.toLowerCase() == "generate-magicurl-email"){
            const {email} = req.body;
            let userId = await appwriteAuthService.getUserDetails(email);
            if(userId){
                userId = userId.$id
            }
            else return res.status(404).json({ok:false,res:"User not found",code:404})
            const emailRes = await getNewJWTVerificationEmail(userId,email,"__email2",new Date().getTime()+15*60*1000
            ,'15m')
            emailRes.ok && delete emailRes.res.secret;
            return res.status(emailRes.code).json({ok:emailRes.ok,res:emailRes.res,code:emailRes.code})
          
        }
        else if(action.toLowerCase() == "verify-magicurl-email"){
            const {token, userId} = req.body;
            const statusRes = await getJWTVerificationStatus(token, userId, true);
            if(statusRes.ok){
                const appwriteSessionJwt = await appwriteAuthService.getNewSessionJwt(userId);
                return res.status(appwriteSessionJwt.code).json({ok:appwriteSessionJwt.ok,res:appwriteSessionJwt.res,code:appwriteSessionJwt.code})
            }
            return res.status(statusRes.code).json({ok:statusRes.ok,res:statusRes.res,code:statusRes.code});
        }
        return res.status(400).json({ ok: false, res: "Invalid action", code: 400 })



    } catch (error) {
        console.log("Error handling email verification request", error);
        return res.status(500).json({ ok: false, res: "Internal server error", code: 500 })
    }

}

