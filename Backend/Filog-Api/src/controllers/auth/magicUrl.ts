import { createJwt, envLogger as logger, mailer, verifyJwt } from "@lib";
import { GenMagicUrl as GenerateBody, VerMagicUrl as VerificationBody } from "@type/request/body";
import { EMAIL_TYPES } from "config/constants";
import { Request, Response } from "express";
import authService from "@services/authService";
import dbService from "@services/dbService";
import { sendSessionCookie } from "@utils/authUtils";


async function generateMagicUrl(req:Request<{},{},GenerateBody>, res:Response) {
    try {
        const { email } = req.body;
        const emailExists = await authService.doesUserExists({email})
        if(emailExists==null){res.status(500).send({code:500,res:null,message:"Internal server error"});return}
        if(!emailExists){res.status(400).send({code:400,res:null,message:"No account found with the requested email"});return}
        const magicUrlEmail = await mailer(EMAIL_TYPES.MAGICURL_EMAIL,{email})
        res.status(magicUrlEmail.code).send(magicUrlEmail)
    } catch (error) {
        logger.error(`ERR_GENERATING_MAGIC_URI_IN_MAGIC_URL_CONTROLLER ${error}`);
        res.status(500).send({ ok: false, res: "Internal server error", code: 500 })
        return
    }
}

async function verifyMagicUrl(req:Request<{},{},VerificationBody>, res:Response) {
    try {
        const { token } = req.body;
        const {email} = verifyJwt(token) as {email:string};
        const user = await dbService.getUserData({email})
        if(user==null) throw false
        if(!user) {res.status(400).send({res:null,code:400,message:"Email is not associated to any account"});return}
        sendSessionCookie(res,user)
        res.status(200).send({code:200,message:"Magic url session created successfully"})
        return
    } catch (error) {
        logger.error(`ERR_VERIFYING_MAGIC_URI_IN_MAGIC_URL_CONTROLLER ${error}`);
        res.status(500).send({ ok: false, res: "Internal server error", code: 500 })
        return
    }
}

export {verifyMagicUrl, generateMagicUrl}