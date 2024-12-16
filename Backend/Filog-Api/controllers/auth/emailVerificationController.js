
const {jwtGenerationService, jwtVerificationService} = require('../../services')
const logger = require('../../libs').envLogger;


async function generateEmailVerification(req,res) {
   try {

    const { userId, email } = req.body;
    const emailRes = await jwtGenerationService(userId, email, "VERIFICATION_EMAIL")
    return res.status(emailRes.code).send({ ok: emailRes.ok, res: emailRes.res, code: emailRes.code })

   } catch (error) {
       logger.error("Error handling email verification request", error);
       return res.status(500).send({ ok: false, res: "Internal server error", code: 500 })
    
   }
}

async function verifyEmailVerification(req,res) {
    try {
        const { token, userId } = req.body;
        const emailRes = await jwtVerificationService(token, userId)
        return res.status(emailRes.code).send({ ok: emailRes.ok, res: emailRes.res, code: emailRes.code })
    } catch (error) {
        logger.error("Error handling email verification request", error);
        return res.status(500).send({ ok: false, res: "Internal server error", code: 500 })
    }
}


module.exports = {
    generateEmailVerification,
    verifyEmailVerification
}