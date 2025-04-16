import conf from 'config/conf';
import jwt, {JwtPayload} from 'jsonwebtoken'


export const createJwt = function (variant:"SESSION"|"API",payload : string | Buffer | object , expiry = 30*24*60*60){
    switch(variant){
        case "SESSION":
            return jwt.sign(payload, conf.JWT_SESSION_SECRET,{expiresIn:expiry});
        default:
            return jwt.sign(payload,conf.JWT_API_SECRET,{expiresIn:expiry})
    }
}

export const verifyJwt = function (variant:"SESSION"|"API",token : string) {
    switch(variant){
        case "SESSION":
            return jwt.verify(token,conf.JWT_SESSION_SECRET);
        default:
            return jwt.verify(token,conf.JWT_API_SECRET);
    }
}

export const handleJwtError = function (err : string) {
    switch (err) {
        case 'TokenExpiredError':
            return ({ code: 410, message: "Token expired", res:null });
        case 'JsonWebTokenError':
            return ({ code: 401, message: "Invalid token", res:null });
        default:
            return false;
    }
}
