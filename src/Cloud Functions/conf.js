const conf = {
    appWriteUrl: String(process.env.VITE_APPWRITE_URL),
    projectId: String(process.env.VITE_PROJECT_ID),
    dbId: String(process.env.VITE_DATABASE_ID),
    blogCollectionID: String(process.env.VITE_BLOG_COLLECTION_ID),
    userProfilesCollectionID: String(process.env.VITE_USERPROFILE_COLLECTION_ID),
    bucketId: String(process.env.VITE_BUCKET_ID),
}

module.exports=conf;