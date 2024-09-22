import sendVerificationEmail from "./Send-Verification-Email/sendVerificationEmail.js"

export default async function createEmailVerification({req,res,log}) {
    const emailRes = await sendVerificationEmail('itsraghav12@gmail.com')
    if(emailRes.ok){
       return res.json({ok:true,res:emailRes.res})
    } return res.json({ok:false,res:emailRes.res})
}