 const conf ={
     appwriteUrl: String(process.env.APPWRITE_URL),
     appwriteProjectId: String(process.env.APPWRITE_PROJECT_ID),
     appwriteDbId:String(process.env.APPWRITE_DATABASE_ID),
     appwriteBlogCollectionId: String(process.env.APPWRITE_BLOG_COLLECTION_ID),
     appwriteProfileCollectionId: String(process.env.APPWRITE_USERPROFILE_COLLECTION_ID),
     appwriteBlackListedTokenCollectionId: String(process.env.APPWRITE_BLACKLISTED_TOKEN_COLLECTION_ID),
     appwriteApiKey:String(process.env.APPWRITE_API_KEY),
     appwriteBucketId: String(process.env.APPWRITE_BUCKET_ID),
     serviceEmail: String(process.env.SERVICE_EMAIL),
     googlAppPass: String(process.env.GOOGLE_APP_PASS),   
     jwtSecret: String(process.env.JWT_SECRET),
     emailVerificationUrl: String(process.env.EMAIL_VERIFICATION_URL),
}
export default conf;
