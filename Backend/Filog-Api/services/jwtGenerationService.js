const { constants } = require("../config/constants")
const {createJwt, mailer, envLogger:logger} = require('../libs')

module.exports.jwtGenerationService = async function(userId, recipient, emailType="VERIFICATION_EMAIL" ,expiryDate = new Date().getTime()+60*60*1000, expiry = '1h'){
    try {
        const token = createJwt({userId}, expiry) // 1 hour from now
        const embeddedUrl  =  `${constants.EMAIL_TYPES[emailType].FRONTEND_ENDPOINT}?userId=${userId}&secret=${token}&expire=${expiryDate}`
        const emailRes = await mailer(emailType, { recipient, embeddedUrl })
        if (emailRes.ok) {
            logger.info("Email sent successfully")
            return { ok: true, res: { userId: userId, secret: token, expiry: expiryDate }, code: 200 }
        } 
        logger.error(`Failed to send email: ${emailRes.res}`)
        return { ok: false, res: emailRes.res, code: 500 }

    } catch (error) {
        logger.error(`Error generating JWT token and sending email: ${error}`)
        return { ok: false, res: error, code: 500 }
    }
}