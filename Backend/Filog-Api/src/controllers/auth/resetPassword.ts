import { appwriteAuthService } from "@appwrite";
import { envLogger as logger } from "@lib";
import { ResetPass as ResetPassBody} from "@type/request";
import { Request,Response } from "express";

export default  async function resetPassword(req:Request<{},{},ResetPassBody>, res:Response) {
    try {

        const { userId, password } = req.body
        const passRes = await appwriteAuthService.resetPassword(userId, password);
        res.status(passRes.code).send({ code: passRes.code, ok: passRes.ok, res: passRes.res })
        return

    } catch (error) {
        logger.error(`Error handling reset password request: ${error}`);
        res.status(500).send({ ok: false, res: "Internal server error", code: 500 })
        return
    }
}