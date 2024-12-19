const {appwriteAuthService} = require('../../appwrite-services')
const logger = require('../../libs').envLogger;

module.exports = async function (req, res) {
    try {

        const { userId, password } = req.body
        const passRes = await appwriteAuthService.resetPassword(userId, password);
        return res.status(passRes.code).send({ code: passRes.code, ok: passRes.ok, res: passRes.res })

    } catch (error) {
        logger.error(`Error handling reset password request: ${error}`);
        return res.status(500).send({ ok: false, res: "Internal server error", code: 500 })
    }
}