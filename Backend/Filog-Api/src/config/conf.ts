import dotenv from 'dotenv'
dotenv.config()

const conf = {
    FRONTEND_ENDPOINT: String(process.env.FRONTEND_ENDPOINT),
    PORT: Number(process.env.PORT),
    JWT_SESSION_SECRET: String(process.env.JWT_SESSION_SECRET),
    JWT_API_SECRET:String(process.env.JWT_API_SECRET),
    ENV:process.env.ENV,
    GOOGLE_OAUTH_CLIENT_ID:String(process.env.GOOGLE_OAUTH_CLIENT_ID),
    GOOGLE_OAUTH_SECRET:String(process.env.GOOGLE_OAUTH_SECRET),
    DB_URI:String(process.env.DB_URI),
    SERVICE_EMAIL: String(process.env.SERVICE_EMAIL),
    SERVICE_EMAIL_PASSWORD: String(process.env.SERVICE_EMAIL_PASSWORD),
    APPWRITE_ENDPOINT: String(process.env.APPWRITE_URI),
    APPWRITE_BUCKET_ID: String(process.env.APPWRITE_BUCKET_ID),
    ADMIN_ID: String(process.env.ADMIN_ID),
    APPWRITE_PROJECT_ID: String(process.env.APPWRITE_PROJECT_ID),
    APPWRITE_DATABASE_ID: String(process.env.APPWRITE_DATABASE_ID),
    APPWRITE_API_KEY: String(process.env.APPWRITE_API_KEY),
    APPWRITE_USERPROFILE_COLLECTION_ID: String(process.env.APPWRITE_USERPROFILE_COLLECTION_ID),
    APPWRITE_BLOG_COLLECTION_ID: String(process.env.APPWRITE_BLOG_COLLECTION_ID),
    BLACKISTED_TOKENS_DOC_ID: String(process.env.BLACKISTED_TOKENS_DOC_ID),
    AWS_REGION:String(process.env.AWS_REGION),
    AWS_S3_BUCKET_NAME:String(process.env.AWS_S3_BUCKET_NAME),
    CDN_ENDPOINT:String(process.env.CDN_ENDPOINT)
} as const

export default conf;