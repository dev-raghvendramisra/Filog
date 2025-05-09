import { EMAIL_TYPES } from "config/constants";

/**
 * Generates the HTML content for emails based on the email type.
 * @param type - The type of email (e.g., verification or magic URL).
 * @param url - Optional URL to include in the email content.
 * @returns The HTML string for the email content.
 */
export const getMailContent = function (type : string, url ?: string){
     if(type === EMAIL_TYPES.VERIFICATION_EMAIL){
     return  `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" cappwrite-auth-serviceontent="width=device-width, initial-scale=1.0" />
    <title>Verify Email</title>
  </head>
  <body style="font-family: Arial, sans-serif; background-color: #f9f9f9; margin: 0; padding: 0;">
    <div style="max-width: 600px; margin: 20px auto; background-color: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);">
      <div style="text-align: center; margin-bottom: 20px;">
        <img src="https://www.filog.in/meta/android-chrome-192x192.png" alt="Filog Logo" style="width: 80px;" />
      </div>
      <div style="text-align: center;">
        <h1 style="color: #333; font-size: 24px;">Help us to verify your email address</h1>
        <p style="color: #555; font-size: 16px;">
          Verify your email address to help keep your account more secure and up-to-date.
        </p>
        <a href=${url} style="display: inline-block; background-color: #194fe6; color: #ffffff; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold; margin-top: 20px;">Verify email</a>
        <p style="color: #555; font-size: 16px;">This link will expire in 1 hour</p>
        <p style="color: #555; font-size: 16px;">
          Didn't create a Filog account? <a href="https://www.filog.in/">Join now</a>.
        </p>
      </div>
      <div style="margin-top: 30px; text-align: center; font-size: 12px; color: #999;">
        <p>The Filog team</p>
      </div>
    </div>
  </body>
</html>

`
     }

     if(type === EMAIL_TYPES.MAGICURL_EMAIL){
        return `<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Password Reset Link</title>
  </head>
  <body style="font-family: Arial, sans-serif; background-color: #f9f9f9; margin: 0; padding: 0;">
    <div style="max-width: 600px; margin: 20px auto; background-color: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);">
      <div style="text-align: center; margin-bottom: 20px;">
        <img src="https://www.filog.in/meta/android-chrome-192x192.png" alt="Filog Logo" style="width: 80px;" />
      </div>
      <div style="text-align: center;">
        <h1 style="color: #333; font-size: 24px;">Forget Password Request</h1>
        <p style="color: #555; font-size: 16px;">
          You requested to reset your password. Click the link below to securely reset your password for your Filog account.
        </p>
        <a href="${url}" style="display: inline-block; background-color: #194fe6; color: #ffffff; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold; margin-top: 20px;">Reset Password</a>
        <p style="color: #555; font-size: 16px;">This link will expire in 15 minutes.</p>
        <p style="color: #555; font-size: 16px;">
          If you didn’t request a password reset, please ignore this email or contact us for support.
        </p>
      </div>
      <div style="margin-top: 30px; text-align: center; font-size: 12px; color: #999;">
        <p>The Filog team</p>
      </div>
    </div>
  </body>
</html>
`
     }
}

