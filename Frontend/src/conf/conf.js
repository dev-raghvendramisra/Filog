const conf = {
   APPWRITE_URL: String(import.meta.env.VITE_APPWRITE_URL),
   PROJECT_ID: String(import.meta.env.VITE_PROJECT_ID),
   DB_ID: String(import.meta.env.VITE_DATABASE_ID),
   BLOG_COLLECTION_ID: String(import.meta.env.VITE_BLOG_COLLECTION_ID),
   USERPROFILE_COLLECTION_ID: String(import.meta.env.VITE_USERPROFILE_COLLECTION_ID),
   BLOG_COMMENTS_COLLECTION_ID: String(import.meta.env.VITE_BLOGCOMMENTS_COLLECTION_ID),
   GEN_NOTIFICATION_COLLECTION_ID: String(import.meta.env.VITE_GENERAL_NOTIFICATIONS_COLLECTION_ID),
   USER_NOTIFICATION_COLLECTION_ID: String(import.meta.env.VITE_USER_NOTIFICATIONS_COLLECTION_ID),
   BUCKET_ID: String(import.meta.env.VITE_BUCKET_ID),
   AUTH_OBJ_KEY: String(import.meta.env.VITE_AUTH_OBJ_KEY),
   SIGNATURE_KEY: String(import.meta.env.VITE_SIGNATURE_KEY),
   LOCAL_ENDPOINT: String(import.meta.env.VITE_LOCAL_ENDPOINT),
   PRODUCTION_ENDPOINT: String(import.meta.env.VITE_PRODUCTION_ENDPOINT),
   CDN_ENDPOINT: String(import.meta.env.VITE_CDN_ENDPOINT),
   AUTH_API_ENDPOINT: String(import.meta.env.VITE_AUTH_API_ENDPOINT),
   ADMIN_ID:String(import.meta.env.VITE_ADMIN_ID)//temp
}

export default conf;

