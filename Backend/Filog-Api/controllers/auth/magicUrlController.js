const { appwriteAuthService } = require('../../appwrite-services')
const { jwtGenerationService, jwtVerificationService } = require('../../services')
const logger = require('../../libs').envLogger;

async function generateMagicUrl(req, res) {
    try {
        const { email } = req.body;
        let userId = await appwriteAuthService.getUserDetails(email);
        if (userId) {
            userId = userId.$id
        }
        else return res.status(404).send({ ok: false, res: "User not found", code: 404 })
        const emailRes = await jwtGenerationService(userId, email, "MAGIC_URL", new Date().getTime() + 15 * 60 * 1000
            , '15m')
        emailRes.ok && delete emailRes.res.secret;
        return res.status(emailRes.code).send({ ok: emailRes.ok, res: emailRes.res, code: emailRes.code })
    } catch (error) {
        logger.error("Error handling magic url request", error);
        return res.status(500).send({ ok: false, res: "Internal server error", code: 500 })
    }
}



async function verifyMagicUrl(req, res) {
    try {
        const { token, userId } = req.body;
        const statusRes = await jwtVerificationService(token, userId, true);
        if (statusRes.ok) {
            const appwriteSessionJwt = await appwriteAuthService.getNewSessionJwt(userId);
            return res.status(appwriteSessionJwt.code).send({ ok: appwriteSessionJwt.ok, res: appwriteSessionJwt.res, code: appwriteSessionJwt.code })
        }
        return res.status(statusRes.code).send({ ok: statusRes.ok, res: statusRes.res, code: statusRes.code });
    } catch (error) {
        logger.error("Error handling magic url verification request", error);
        return res.status(500).send({ ok: false, res: "Internal server error", code: 500 })

    }
}


module.exports = {
    generateMagicUrl,
    verifyMagicUrl
}