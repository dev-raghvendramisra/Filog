const jwt = require('jsonwebtoken')
const {conf} = require('../config/conf');

module.exports.createJwt = function (payload,expiry){
    return jwt.sign(payload, conf.JWT_SECRET, { expiresIn: expiry })
}

module.exports.verifyJwt = function (token){
    return jwt.verify(token, conf.JWT_SECRET)
}