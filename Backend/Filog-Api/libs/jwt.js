const jwt = require('jsonwebtoken')
const {conf} = require('../config/conf');
const logger = require('./winstonLogger').envLogger;

module.exports.createJwt = function (payload,expiry){
    return jwt.sign(payload, conf.JWT_SECRET, { expiresIn: expiry })
}

module.exports.verifyJwt = function (token){
    return jwt.verify(token, conf.JWT_SECRET)
}

module.exports.handleJwtError = function (err){
    logger.error(err);
    switch(err){
        case 'TokenExpiredError':
            return ({ ok: false, res: "Token expired", code: 401 });
        case 'JsonWebTokenError':
            return ({ ok: false, res: "Invalid token", code: 401 });
        default:
            return false
    }
}