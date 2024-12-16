const dotenv = require('dotenv');
dotenv.config();

module.exports.conf = Object.freeze({
    FRONTEND_ENDPOINT: String(process.env.FRONTEND_ENDPOINT),
    PORT: Number(process.env.PORT),
    JWT_SECRET: String(process.env.JWT_SECRET),
    SERVICE_EMAIL: String(process.env.SERVICE_EMAIL),
    SERVICE_EMAIL_PASSWORD: String(process.env.SERVICE_EMAIL_PASSWORD),
    APPWRITE_ENDPOINT: String(process.env.APPWRITE_URL),
    ADMIN_ID: String(process.env.ADMIN_ID),
    APPWRITE_PROJECT_ID: String(process.env.APPWRITE_PROJECT_ID),
    APPWRITE_DATABASE_ID: String(process.env.APPWRITE_DATABASE_ID),
    APPWRITE_API_KEY: String(process.env.APPWRITE_API_KEY),
    APPWRITE_USERPROFILE_COLLECTION_ID: String(process.env.APPWRITE_USERPROFILE_COLLECTION_ID),
    APPWRITE_BLACKISTED_TOKENS_COLLECTION_ID: String(process.env.APPWRITE_BLACKISTED_TOKENS_COLLECTION_ID),
})