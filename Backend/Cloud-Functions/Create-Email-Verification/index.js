import sendVerificationEmail from './Send-Verification-Email/sendVerificationEmail.js'

export default async function createEmailVerification({req,res,log}) {
    const emailRes = await sendVerificationEmail('itsraghav12@gmail.com')
    if(emailRes.ok){
       return res.status(200).send({ok:true,res:emailRes.res})
    } res.status(500).send({ok:false,res:emailRes.res})
}