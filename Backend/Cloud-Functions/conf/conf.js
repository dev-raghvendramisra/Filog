const conf = {
    appWriteUrl: String(process.env.APPWRITE_APPWRITE_URL),
    projectId: String(process.env.APPWRITE_PROJECT_ID),
    dbId: String(process.env.APPWRITE_DATABASE_ID),
    blogCollectionID: String(process.env.APPWRITE_BLOG_COLLECTION_ID),
    userProfilesCollectionID: String(process.env.APPWRITE_USERPROFILE_COLLECTION_ID),
    bucketId: String(process.env.APPWRITE_BUCKET_ID),
    apiKey:String(process.env.APPWRITE_API_KEY),
    oAuthClientId: String(process.env.APPWRITE_OAUTH_CLIENT_ID),
    oAuthClientSecret: String(process.env.APPWRITE_OAUTH_CLIENT_SECRET),
    oAuthRefreshToken: String(process.env.APPWRITE_OAUTH_REFRESH_TOKEN),
    googlAppPass: String(process.env.APPWRITE_GOOGLE_APP_PASS),    
}

export default conf;