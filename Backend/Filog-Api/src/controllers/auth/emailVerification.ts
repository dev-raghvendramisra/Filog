import { EMAIL_TYPES } from "config/constants";
import { Response } from "express";
import { handleJwtError, envLogger as logger, mailer, verifyJwt } from "@lib";
import { AuthenticatedRequest, UserDataInCookie, VerEVerfication as VerificationBody } from "@type/request/body";
import authService from "@services/authService";

 async function generateEmailVerification(req : AuthenticatedRequest, res : Response) {
    try {
        const { _id:userId, email } = req.userData as UserDataInCookie;
        const emailRes = await mailer(EMAIL_TYPES.VERIFICATION_EMAIL,{userId,email});
        res.status(emailRes.code).send(emailRes);
        return
    } catch (error) {
        logger.error(`ERR_GENERATING_EMAIL_VERIFICATION_IN_EMAIL_VERIFICATION_CONTROLLER: ${error}`);
        res.status(500).send({ ok: false, res: "Internal server error", code: 500 });
        return
    }
}

 async function verifyEmailVerification(req:AuthenticatedRequest<{},{},VerificationBody>, res:Response) {
    try {
        const { token } = req.body;
        const isTokenBlackListed = await authService.blacklistToken(token)

        if(isTokenBlackListed==null){throw false}
        if(isTokenBlackListed){res.status(401).send({code:401,res:null,message:"Invalid Token"});return}

        const verifyToken = verifyJwt(token) as {userId:string};
        const verifyEmail = await authService.verifyEmail(verifyToken.userId)
        
        res.status(verifyEmail.code).send(verifyEmail)
    } catch (error) {
        
        const isJwtErr = handleJwtError(error as any)
        if(isJwtErr){res.status(isJwtErr.code).send(isJwtErr);return}

        logger.error(`ERR_VERIFYING_EMAIL_VERIFICATION_IN_EMAIL_VERIFICATION_CONTROLLER: ${error}`);
         res.status(500).send({ ok: false, res: "Internal server error", code: 500 });
         return
    }
}

export {generateEmailVerification, verifyEmailVerification}