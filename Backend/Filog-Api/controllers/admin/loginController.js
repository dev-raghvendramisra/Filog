const { appwriteAuthService } = require("../../appwrite-services");
const { conf } = require("../../config/conf");
const { createJwt,envLogger:logger } = require("../../libs");


module.exports = async function (req,res){
    try {
        const {email,password} = req.body;  
        const admin = await appwriteAuthService.verifyUserCreds(email,password);
        if(admin.ok){
            if(admin.res.userId !== conf.ADMIN_ID){
                return res.status(403).send({ ok: false, res: "Forbidden", code: 403 })
            }
            const token = createJwt({adminId:conf.ADMIN_ID},"1h");
            return res.status(200).send({ ok: true, res: {message:"Admin logged in",token}, code: 200 })
        }
        return res.status(admin.code).send({ ok: admin.ok, res: admin.res, code: admin.code })
        
    } catch (error) {
        logger.error("Error handling admin login request", error);
        return res.status(500).send({ ok: false, res: "Internal server error", code: 500 })
        
    }
}