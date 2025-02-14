import conf from 'config/conf';
import jwt, {JwtPayload} from 'jsonwebtoken'
import { envLogger as logger } from './winstonLogger';
export const createJwt = function (payload : JwtPayload , expiry : number){
    return jwt.sign(payload, conf.JWT_SECRET,{expiresIn:expiry});
}

export const verifyJwt = function (token : string) {
    return jwt.verify(token, conf.JWT_SECRET);
}

export const handleJwtError = function (err : string) {
    logger.error(`${err}`);
    switch (err) {
        case 'TokenExpiredError':
            return ({ ok: false, res: "Token expired", code: 401 });
        case 'JsonWebTokenError':
            return ({ ok: false, res: "Invalid token", code: 401 });
        default:
            return false;
    }
}
