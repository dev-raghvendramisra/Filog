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
     projectEndpoint: String(process.env.PROJECT_ENDPOINT),
     email:{
        __email1:{
            type:"acc-verify",
            subject:"Account Verification",
            url:"https://filog.in/verify-email"
        },
        __email2:{
            type:"forget-pass",
            subject:"Forget Password",
            url:"http://filog.in/reset-password"
        }
     }
}
export default conf;
