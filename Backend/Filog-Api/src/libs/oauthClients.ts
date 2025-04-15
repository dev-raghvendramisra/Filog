import conf from "config/conf";
import { OAuth2Client as GoogleOAuth2Client } from "google-auth-library";

export const googleOAuthClient = new GoogleOAuth2Client(
  conf.GOOGLE_OAUTH_CLIENT_ID,
  conf.GOOGLE_OAUTH_SECRET,
  "http://localhost:8000/api/v1/auth/oauth/google"
);

