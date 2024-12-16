const { conf } = require('./conf');

module.exports.constants = Object.freeze({
    SERVICES: [
        "/apis/auth/email-verification/generate",
        "/apis/auth/email-verification/verify",
        "/apis/auth/magic-url/generate",
        "/apis/auth/magic-url/verify",
        "/apis/auth/reset-password",
        "/apis/admin/login",
    ],
    
    ROUTE_CONFIG: {
        "/apis/auth/email-verification/generate": {
            MANDATORY_FIELDS: ["email", "userId"],
            ERROR_MESSAGE: "Request lacks userId or email"
        },
        "/apis/auth/email-verification/verify": {
            MANDATORY_FIELDS: ["token", "userId"],
            ERROR_MESSAGE: "Request lacks token or userId"
        },
        "/apis/auth/magic-url/generate": {
            MANDATORY_FIELDS: ["email"],
            ERROR_MESSAGE: "Request lacks email"
        },
        "/apis/auth/magic-url/verify": {
            MANDATORY_FIELDS: ["token", "userId"],
            ERROR_MESSAGE: "Request lacks token or userId"
        },
        "/apis/auth/reset-password": {
            MANDATORY_FIELDS: ["userId", "password"],
            ERROR_MESSAGE: "Request lacks password or userId"
        },
        "/apis/admin/login": {
            MANDATORY_FIELDS: ["email", "password"],
            ERROR_MESSAGE: "Request lacks email or password"
        }
    },

    EMAIL_TYPES: {
        VERIFICATION_EMAIL: {
            SUBJECT: "Account Verification",
            FRONTEND_ENDPOINT: conf.FRONTEND_ENDPOINT + "/verify-email",
            MANDATORY_FIELDS: ["userId", "secret", "expiry", "recipient", "embeddedUrl"]
        },
        MAGIC_URL: {
            SUBJECT: "Forget Password",
            FRONTEND_ENDPOINT: conf.FRONTEND_ENDPOINT + "/reset-password",
            MANDATORY_FIELDS: ["userId", "secret", "expiry", "recipient", "embeddedUrl"]
        }
    }
});
