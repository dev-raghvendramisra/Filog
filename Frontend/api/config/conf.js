import dotenv from 'dotenv'
dotenv.config()

const conf = Object.freeze({
    FRONTEND_ENDPOINT: String(process.env.FRONTEND_ENDPOINT),
    APPWRITE_ENDPOINT: String(process.env.APPWRITE_URL),
    APPWRITE_PROJECT_ID: String(process.env.APPWRITE_PROJECT_ID),
    APPWRITE_DATABASE_ID: String(process.env.APPWRITE_DATABASE_ID),
    APPWRITE_API_KEY: String(process.env.APPWRITE_API_KEY),
    APPWRITE_USERPROFILE_COLLECTION_ID: String(process.env.APPWRITE_USERPROFILE_COLLECTION_ID),
    APPWRITE_BLOG_COLLECTION_ID: String(process.env.APPWRITE_BLOG_COLLECTION_ID),
    DEFAULT_HTML_FILE: "../../dist/index.html"
})

export default conf