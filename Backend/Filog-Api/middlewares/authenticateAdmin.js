const { conf } = require("../config/conf");
const { verifyJwt, handleJwtError, envLogger:logger } = require("../libs");


module.exports = async function (req,res,next){
    try {
        const authToken = req.headers['authorization']?.split(' ')[1];
        if(authToken){
            const {adminId} = verifyJwt(authToken);
            if(adminId==conf.ADMIN_ID){
               return next();
            }
          return res.status(401).send({ ok: false, res: "Unauthorized", code: 403 })
        }
        return res.status(400).send({ ok: false, res: "Request lacks auth token", code: 401 })

    } catch (error) {
        const isJwtError = handleJwtError(error.name);
        if(isJwtError){
            logger.error(`Error handling authenticated admin request: ${isJwtError.res}`);
            return res.status(isJwtError.code).send({ ok: false, res: isJwtError.res, code: isJwtError.code })
        }
        logger.error(`Error handling authenticated admin request: ${error}`);
        return res.status(500).send({ ok: false, res: "Internal server error", code: 500 })
        
    }
}