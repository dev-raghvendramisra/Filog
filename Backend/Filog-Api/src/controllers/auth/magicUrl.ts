import { handleJwtError, envLogger as logger, mailer, verifyJwt } from "@lib";
import { GenMagicUrl as GenerateBody, VerMagicUrl as VerificationBody } from "@type/request/body";
import { EMAIL_TYPES } from "config/constants";
import { Request, Response } from "express";
import authService from "@services/authService";
import dbService from "@services/dbService";
import { sendSessionCookie } from "@utils/authUtils";

/**
 * Generates a magic URL for password reset and sends it via email.
 * @param req - The request containing the user's email.
 * @param res - The response object to send the result.
 */
async function generateMagicUrl(req:Request<{},{},GenerateBody>, res:Response) {
    try {
        const { email } = req.body;


        const emailExists = await authService.doesUserExists({email})
        if(emailExists==null){res.status(500).send({code:500,message:"Internal server error",res:null});return}
        if(!emailExists.exists){res.status(404).send({code:404,res:null,message:"No account found with the requested email"});return}

        const magicUrlEmail = await mailer(EMAIL_TYPES.MAGICURL_EMAIL,{email})
        res.status(magicUrlEmail.code).send(magicUrlEmail)

    } catch (error) {
        logger.error(`ERR_GENERATING_MAGIC_URI_IN_MAGIC_URL_CONTROLLER ${error}`);
        res.status(500).send({ res: null, message: "Internal server error", code: 500 })
        return
    }
}

/**
 * Verifies the magic URL token and creates a session for the user.
 * @param req - The request containing the magic URL token.
 * @param res - The response object to send the result.
 */
async function verifyMagicUrl(req:Request<{},{},VerificationBody>, res:Response) {
    try {
        const { token } = req.body;
        const {email} = verifyJwt("SESSION",token) as {email:string};
        const isBlackListed = await authService.blacklistToken(token)
        if(isBlackListed) {res.status(410).send({code:401,message:"Invalid token",res:null});return}
        const user = await dbService.getUserData({email})
        if(user==null) throw false
        if(!user) {res.status(404).send({code:404,message:"Email is not associated to any account",res:null});return}

        sendSessionCookie(res,user.res as object)
        res.status(200).send({code:200,message:"Magic url session created successfully",res:null})
        return
    } catch (error:any) {
        logger.error(`ERR_VERIFYING_MAGIC_URI_IN_MAGIC_URL_CONTROLLER ${error}`);
        const err = handleJwtError(error.name)
        if(err){res.status(err.code).send(err);return}
        res.status(500).send({ code: 500, message: "Internal server error", res: null })
        return
    }
}

export {verifyMagicUrl, generateMagicUrl}