const conf = {
    appWriteUrl: String(process.env.APPWRITE_APPWRITE_URL),
    projectId: String(process.env.APPWRITE_PROJECT_ID),
    dbId: String(process.env.APPWRITE_DATABASE_ID),
    blogCollectionID: String(process.env.APPWRITE_BLOG_COLLECTION_ID),
    userProfilesCollectionID: String(process.env.APPWRITE_USERPROFILE_COLLECTION_ID),
    bucketId: String(process.env.APPWRITE_BUCKET_ID),
    apiKey:String(process.env.APPWRITE_CLOUD_FUNCTION_API_KEY),
}

export default conf;