const {appwriteAuthService} = require('../appwrite-services')
const {jwtGenerationService, jwtVerificationService} = require('../services')

module.exports.authController = async function (req,res) {
    const {action} = req.body

    try{
         if(action === "GENERATE_VERIFICATION_EMAIL"){
            const { userId, email } = req.body;
            const emailRes = await jwtGenerationService(userId, email,"VERIFICATION_EMAIL")
            return res.status(emailRes.code).send({ ok: emailRes.ok, res: emailRes.res, code: emailRes.code })
         }
        if(action === "GENERATE_MAGIC_URL"){
            const {email} = req.body;
            let userId = await appwriteAuthService.getUserDetails(email);
            if(userId){
                userId = userId.$id
            }
            else return res.status(404).send({ok:false,res:"User not found",code:404})
            const emailRes = await jwtGenerationService(userId,email,"MAGIC_URL",new Date().getTime()+15*60*1000
            ,'15m')
            emailRes.ok && delete emailRes.res.secret;
            return res.status(emailRes.code).send({ok:emailRes.ok,res:emailRes.res,code:emailRes.code})
        }
        if(action === "VERIFY_VERIFICATION_EMAIL"){
            const { token, userId } = req.body;
            const emailRes = await jwtVerificationService(token, userId)
            return res.status(emailRes.code).send({ ok: emailRes.ok, res: emailRes.res, code: emailRes.code })
        }
        if(action === "VERIFY_MAGIC_URL"){
            const {token, userId} = req.body;
            const statusRes = await jwtVerificationService(token, userId, true);
            if(statusRes.ok){
                const appwriteSessionJwt = await appwriteAuthService.getNewSessionJwt(userId);
                return res.status(appwriteSessionJwt.code).send({ok:appwriteSessionJwt.ok,res:appwriteSessionJwt.res,code:appwriteSessionJwt.code})
            }
            return res.status(statusRes.code).send({ok:statusRes.ok,res:statusRes.res,code:statusRes.code});
        }
        if(action === "RESET_PASSWORD"){
            const{userId,password} = req.body
            const passRes = await appwriteAuthService.resetPassword(userId,password);
            return res.status(passRes.code).send({code:passRes.code,ok:passRes.ok,res:passRes.res})
        }
    }catch(error){
        console.log("Error handling email verification request", error);
        return res.status(500).send({ ok: false, res: "Internal server error", code: 500 })
    }
}