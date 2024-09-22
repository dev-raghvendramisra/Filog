import sendVerificationEmail from "./Send-Verification-Email/sendVerificationEmail.js"
import jwt from 'jsonwebtoken'
import conf from "../conf/conf.js";
import authServices from "../Services/dbService.js";

export default async function createEmailVerification({req,res,log}) {

    const {action} = req.body;
    log("Request received for action: ",action);
     
    if(action=="generate"){
      const {userId,email} = req.body;
      const expiry = '1h';
      const token = jwt.sign({userId},conf.jwtSecret,{expiresIn:expiry})
      const verificationUrl = `${conf.emailVerificationUrl}?token=${token}`
      res.json({ok:true,res:{token:token,expiry:expiry}})
      const emailRes = await sendVerificationEmail(email,verificationUrl)
        if(emailRes.ok){
          log("Email sent successfully",emailRes.res)
          return res.empty()
        } log("Failed to send email",emailRes.res)
        return res.empty()
    }
    if(action=="verify"){
        const {token,userId} = req.body;
        try {
            const decoded = jwt.verify(token,conf.jwtSecret)
            if(decoded.userId!=userId){
                return res.json({ok:false,res:"Invalid token",code:401})
            }
            const verifyEmail = await authServices.verifyEmail(userId,log)
            if(verifyEmail.ok){
                return res.json({ok:true,res:verifyEmail.res,code:200})
            } return res.json({ok:false,res:verifyEmail.res,code:500})
        } catch (error) {
            if(error.name=="TokenExpiredError"){
                return res.json({ok:false,res:"Token expired",code:401})
            }
            return res.json({ok:false,res:error,code:500})
        }
    }
    

    const emailRes = await sendVerificationEmail('itsraghav12@gmail.com')
    if(emailRes.ok){
       return res.json({ok:true,res:emailRes.res})
    } return res.json({ok:false,res:emailRes.res})
}