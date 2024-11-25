const {conf} = require('./conf');

module.exports.constants = Object.freeze({
    ACTIONS:{
        GENERATE_MAGIC_URL:{
            MANDATORY_FIELDS:["email"],
            ERROR_MESSAGE:"Request lacks userId or email"
        },
        GENERATE_VERIFICATION_EMAIL:{
            MANDATORY_FIELDS:["email","userId"],
            ERROR_MESSAGE:"Request lacks userId or email"
        },
        VERIFY_VERIFICATION_EMAIL:{
            MANDATORY_FIELDS:["token","userId"],
            ERROR_MESSAGE:"Request lacks token or userId"
        },
        VERIFY_MAGIC_URL:{
            MANDATORY_FIELDS:["token","userId"],
            ERROR_MESSAGE:"Request lacks token or userId"
        }
    },
    EMAIL_TYPES:{
        VERIFICATION_EMAIL: {
            SUBJECT:"Account Verification",
            FRONTED_ENDPOINT:conf.FRONTEND_ENDPOINT+"/verify-email",
            MANDATORY_FIELDS:["userId", "secret", "expiry", "recipient", "embeddedUrl"],
        },
        MAGIC_URL:{
            SUBJECT:"Forget Password",
            FRONTED_ENDPOINT:conf.FRONTEND_ENDPOINT+"/reset-password",
            MANDATORY_FIELDS:["userId", "secret", "expiry", "recipient", "embeddedUrl"],
        }
    }
})

