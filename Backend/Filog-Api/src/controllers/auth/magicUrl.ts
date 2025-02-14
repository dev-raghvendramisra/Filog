import { appwriteAuthService } from "@appwrite";
import { envLogger as logger } from "@lib";
import { jwtGenerationService, jwtVerificationService } from "@services";
import { EMAIL_TYPES } from "config/constants";
import { Request, Response } from "express";
import { Models } from "node-appwrite";


async function generateMagicUrl(req:Request, res:Response) {
    try {
        const { email } = req.body;
        let userId : string | Models.User<Models.Preferences> | null= await appwriteAuthService.getUserDetails(email);
        if (userId) {
            userId = userId.$id 
        }
        else{res.status(404).send({ ok: false, res: "User not found", code: 404 });return}
        const emailRes = await jwtGenerationService(userId, email, EMAIL_TYPES.MAGICURL_EMAIL , new Date().getTime() + 15 * 60 * 1000
            , 1*1000*15)
        emailRes.ok && delete emailRes.res.secret;
        res.status(emailRes.code).send({ ok: emailRes.ok, res: emailRes.res, code: emailRes.code })
        return
    } catch (error) {
        logger.error(`Error handling magic url-generation request: ${error}`);
        res.status(500).send({ ok: false, res: "Internal server error", code: 500 })
        return
    }
}

async function verifyMagicUrl(req:Request, res:Response) {
    try {
        const { token, userId } = req.body;
        const statusRes = await jwtVerificationService(token, userId, true);
        if (statusRes.ok) {
            const appwriteSessionJwt = await appwriteAuthService.getNewSessionJwt(userId);
            res.status(appwriteSessionJwt.code).send({ ok: appwriteSessionJwt.ok, res: appwriteSessionJwt.res, code: appwriteSessionJwt.code })
            return
        }
        res.status(statusRes.code).send({ ok: statusRes.ok, res: statusRes.res, code: statusRes.code });
        return
    } catch (error) {
        logger.error(`Error handling magic url verification-verification request: ${error}`);
        res.status(500).send({ ok: false, res: "Internal server error", code: 500 })
        return
    }
}

export default {verifyMagicUrl, generateMagicUrl}