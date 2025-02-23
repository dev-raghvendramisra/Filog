import conf from 'config/conf';
import jwt, {JwtPayload} from 'jsonwebtoken'
import { envLogger as logger } from './winstonLogger';
export const createJwt = function (payload : JwtPayload , expiry = 30*24*60*60){
    return jwt.sign(payload, conf.JWT_SECRET,{expiresIn:expiry});
}

export const verifyJwt = function (token : string) {
    return jwt.verify(token, conf.JWT_SECRET);
}

export const handleJwtError = function (err : string) {
    logger.error(`${err}`);
    switch (err) {
        case 'TokenExpiredError':
            return ({ res:null, message: "Token expired", code: 401 });
        case 'JsonWebTokenError':
            return ({ res:null, message: "Invalid token", code: 401 });
        default:
            return false;
    }
}
