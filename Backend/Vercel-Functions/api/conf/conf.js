 const conf ={
     appwriteUrl: String(process.env.VITE_APPWRITE_URL),
     appwriteProjectId: String(process.env.VITE_PROJECT_ID),
     appwriteDbId:String(process.env.VITE_DATABASE_ID),
     appwriteBlogCollectionId: String(process.env.VITE_BLOG_COLLECTION_ID),
     appwriteProfileCollectionId: String(process.env.VITE_USERPROFILE_COLLECTION_ID),
     appwriteBlackListedTokenCollectionId: String(process.env.APPWRITE_BLACKLISTED_TOKEN_COLLECTION_ID),
     appwriteApiKey:String(process.env.APPWRITE_API_KEY),
     appwriteBucketId: String(process.env.VITE_BUCKET_ID),
     serviceEmail: String(process.env.APPWRITE_SERVICE_EMAIL),
     googlAppPass: String(process.env.APPWRITE_GOOGLE_APP_PASS),   
     jwtSecret: String(process.env.APPWRITE_JWT_SECRET),
     emailVerificationUrl: String(process.env.APPWRITE_EMAIL_VERIFICATION_URL),
}
export default conf;
