import { EMAIL_TYPES } from "config/constants";
import { Request, Response } from "express";
import { envLogger as logger } from "@lib";
import { jwtGenerationService, jwtVerificationService } from "@services";
import { GenEVerification as GenerateBody, VerEVerfication as VerificationBody } from "@type/request";

 async function generateEmailVerification(req : Request<{},{},GenerateBody>, res : Response) {
    try {
        const { userId, email } = req.body;
        const emailRes = await jwtGenerationService(userId, email, EMAIL_TYPES.VERIFICATION_EMAIL);
         res.status(emailRes.code).send({ ok: emailRes.ok, res: emailRes.res, code: emailRes.code });
         return
    } catch (error) {
        logger.error(`Error handling email verification-generation request: ${error}`);
        res.status(500).send({ ok: false, res: "Internal server error", code: 500 });
        return
    }
}

 async function verifyEmailVerification(req:Request<{},{},VerificationBody>, res:Response) {
    try {
        const { token, userId } = req.body;
        const emailRes = await jwtVerificationService(token, userId);
        res.status(emailRes.code).send({ ok: emailRes.ok, res: emailRes.res, code: emailRes.code });
        return
    } catch (error) {
        logger.error(`Error handling email verification-verification request: ${error}`);
         res.status(500).send({ ok: false, res: "Internal server error", code: 500 });
         return
    }
}

export default {generateEmailVerification, verifyEmailVerification}