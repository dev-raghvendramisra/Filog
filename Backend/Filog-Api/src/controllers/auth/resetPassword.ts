import { envLogger as logger } from "@lib";
import { Request,Response } from "express";
import authService from "@services/authService";
import { AuthenticatedRequest, UserDataInCookie } from "@type/request/body";

export default  async function resetPassword(req:AuthenticatedRequest, res:Response) {
    try {

        const { password } = req.body
        const {_id:userId} = req.userData as UserDataInCookie
        const passRes = await authService.resetPass(userId, password);
        res.status(passRes.code).send(passRes)
        return

    } catch (error) {
        logger.error(`Error handling reset password request: ${error}`);
        res.status(500).send({ ok: false, res: "Internal server error", code: 500 })
        return
    }
}