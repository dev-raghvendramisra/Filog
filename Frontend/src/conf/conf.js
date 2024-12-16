const conf = Object.freeze({
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
   
   // Auth-related API endpoints
   AUTH_API_ENDPOINT: String(import.meta.env.VITE_API_ENDPOINT)+"/auth",
   AUTH_API_RESET_PASSWORD_ENDPOINT: String(import.meta.env.VITE_API_ENDPOINT)+"/auth/reset-password",
   AUTH_API_MAGIC_URL_GENERATE_ENDPOINT: String(import.meta.env.VITE_API_ENDPOINT)+"/auth/magic-url/generate",
   AUTH_API_MAGIC_URL_VERIFY_ENDPOINT: String(import.meta.env.VITE_API_ENDPOINT)+"/auth/magic-url/verify",
   AUTH_API_EMAIL_VERIFICATION_GENERATE_ENDPOINT: String(import.meta.env.VITE_API_ENDPOINT)+"/auth/email-verification/generate",
   AUTH_API_EMAIL_VERIFICATION_VERIFY_ENDPOINT: String(import.meta.env.VITE_API_ENDPOINT)+"/auth/email-verification/verify",

   // Admin-related API endpoints
   ADMIN_API_ENDPOINT: String(import.meta.env.VITE_API_ENDPOINT)+"/admin",
   ADMIN_API_LOGIN_ENDPOINT: String(import.meta.env.VITE_API_ENDPOINT)+"/admin/login",

})

export default conf;
