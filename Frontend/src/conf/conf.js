const conf = Object.freeze({
   AUTH_OBJ_KEY: String(import.meta.env.VITE_AUTH_OBJ_KEY),
   SIGNATURE_KEY: String(import.meta.env.VITE_SIGNATURE_KEY),
   LOCAL_ENDPOINT: String(import.meta.env.VITE_LOCAL_ENDPOINT),
   PRODUCTION_ENDPOINT: String(import.meta.env.VITE_PRODUCTION_ENDPOINT),
   CDN_ENDPOINT: String(import.meta.env.VITE_CDN_ENDPOINT),
   
   // API-creds
   API_JWT_SECRET:String(import.meta.env.VITE_API_JWT_SECRET),
   API_ENDPOINT:String(import.meta.env.VITE_API_ENDPOINT),


   // Auth-related API endpoints
   AUTH_API_ENDPOINT: String(import.meta.env.VITE_API_ENDPOINT)+"/auth",
   AUTH_API_OAUTH_GOOGLE_ENDPOINT: String(import.meta.env.VITE_API_ENDPOINT)+"/auth/oauth/init/google",
   AUTH_API_REGISTER_ENDPOINT: String(import.meta.env.VITE_API_ENDPOINT)+"/auth/register",
   AUTH_API_LOGIN_ENDPOINT: String(import.meta.env.VITE_API_ENDPOINT)+"/auth/login",
   AUTH_API_LOGOUT_ENDPOINT: String(import.meta.env.VITE_API_ENDPOINT)+"/auth/logout",
   AUTH_API_GET_USER_DATA: String(import.meta.env.VITE_API_ENDPOINT)+"/auth/users/me",
   AUTH_API_RESET_PASSWORD_ENDPOINT: String(import.meta.env.VITE_API_ENDPOINT)+"/auth/reset-password",
   AUTH_API_MAGIC_URL_ENDPOINT: String(import.meta.env.VITE_API_ENDPOINT)+"/auth/magic-url",
   AUTH_API_EMAIL_VERIFICATION_ENDPOINT: String(import.meta.env.VITE_API_ENDPOINT)+"/auth/email-verification",
   // DB-related API endpoints
   DB_API_ENDPOINT: String(import.meta.env.VITE_API_ENDPOINT)+"/db",
   DB_API_GET_USERS_ENDPOINT: String(import.meta.env.VITE_API_ENDPOINT)+"/db/users",
   DB_API_FOLLOW_USER_ENDPOINT: String(import.meta.env.VITE_API_ENDPOINT)+"/db/users/followers",
   DB_API_GET_BLOGS_ENDPOINT: String(import.meta.env.VITE_API_ENDPOINT)+"/db/blogs",
   DB_API_UPDATE_PROFILE_ENDPOINT: String(import.meta.env.VITE_API_ENDPOINT)+"/db/profile",
   DB_API_BLOG_ENDPOINT: String(import.meta.env.VITE_API_ENDPOINT)+"/db/blogs",
   DB_API_BLOG_LIKE_ENDPOINT: String(import.meta.env.VITE_API_ENDPOINT)+"/db/blogs/likes",
   DB_API_NOTIFICATION_GENERAL_ENDPOINT: String(import.meta.env.VITE_API_ENDPOINT)+"/db/notifications/general",
   DB_API_NOTIFICATION_CUSTOM_ENDPOINT: String(import.meta.env.VITE_API_ENDPOINT)+"/db/notifications/custom",
})

export default conf;
