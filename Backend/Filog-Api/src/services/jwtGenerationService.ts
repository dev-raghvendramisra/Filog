import { EMAIL_MAP, EMAIL_TYPES } from "config/constants"
import {createJwt, envLogger as logger,mailer} from "@lib"

export default async function jwtGenerationService(userId : string, recipient:string, emailType : keyof typeof EMAIL_TYPES ,expiryDate = new Date().getTime()+60*60*1000, expiry = 1*1000*60){
    try {
        const token = createJwt({userId}, expiry) // 1 hour from now
        const embeddedUrl  =  `${EMAIL_MAP[EMAIL_TYPES[emailType]].FRONTEND_ENDPOINT}?userId=${userId}&secret=${token}&expire=${expiryDate}`
        const emailRes = await mailer(emailType, { recipient, embeddedUrl })
        if (!emailRes.ok) {
            logger.error(`Failed to send email: ${emailRes.res}`)
            return { ok: false, res: emailRes.res, code: 500 }
        }
        return { ok: true, res: { userId: userId, secret: token, expiry: expiryDate }, code: 200 }
    } catch (error) {
        logger.error(`Error generating JWT token and sending email: ${error}`)
        return { ok: false, res: error, code: 500 }
    }
}