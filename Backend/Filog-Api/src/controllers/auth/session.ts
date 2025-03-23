import { Request, Response } from "express";
import {
  AuthenticatedRequest,
  LoginBody,
  SignupBody,
  UserDataInCookie,
} from "@type/request/body";
import dbService from "@services/dbService";
import { sendSessionCookie } from "@utils/authUtils";
import { envLogger as logger } from "@lib";
import authService from "@services/authService";
import { googleOAuthClient } from "@lib";
import { getGoogleOAuthUser } from "@utils/authUtils";
import conf from "config/conf";

/**
 * Handles user signup by creating a new user account.
 * @param req - The request containing signup data.
 * @param res - The response object to send the result.
 */
export async function signup(req: Request<{}, {}, SignupBody>, res: Response) {
  const user = await authService.createUser(req.body);
  res.status(user.code).send(user);
}

/**
 * Launches the OAuth flow for the specified provider.
 * @param req - The request containing the provider name.
 * @param res - The response object to redirect to the provider's OAuth page.
 */
export async function launchOauth(req: Request, res: Response) {
  const { provider } = req.params;
  let redirectURI;
  if (provider == "google") {
    redirectURI = googleOAuthClient.generateAuthUrl({
      access_type: "offline",
      scope: ["openid", "email", "profile"],
    });
  } else {
    res.status(404).send({ code: 404, message: "Invalid provider", res: null });
    return;
  }
  res.redirect(redirectURI as string);
}

/**
 * Handles user login by verifying credentials and creating a session.
 * @param req - The request containing login data.
 * @param res - The response object to send the result.
 */
export async function login(req: Request<{}, {}, LoginBody>, res: Response) {
  const areCredsValid = await authService.verifyCreds(req.body);
  if (areCredsValid.code !== 200) {
    res.status(areCredsValid.code).send(areCredsValid);
    return;
  }
  const user = await dbService.getUserData({ email: req.body.email });
  if (user.code !== 200) {
    res.status(user.code).send(user);
    return;
  }

  sendSessionCookie(res, user.res as object);
  res
    .status(200)
    .send({ code: 200, message: "Session creation successfull", res: null });
}

/**
 * Handles Google OAuth login and creates a session for the user.
 * @param req - The request containing the Google authorization code.
 * @param res - The response object to redirect or send the result.
 */
export async function googleOAuth(req: Request, res: Response) {
  const { code } = req.query;
  if (!code) {
    res
      .status(400)
      .send({ code: 400, message: "Missing auth code", res: null });
    return;
  }
  const googleUser = await getGoogleOAuthUser(code as string);
  if (googleUser.code !== 200) {
    res.status(googleUser.code).send(googleUser);
    return;
  }
  const user = await authService.createUser({
    email: googleUser.res?.email as string,
    emailVerification: true,
    fullName: googleUser.res?.name as string,
    password:googleUser.res?.email as string,
    userName:googleUser.res?.email as string + Date.now().toString(),
    userAvatar:googleUser.res?.picture as string
  });


  if(user.code==500){
    res.status(user.code).send(user)
    return
  }
    sendSessionCookie(res, user.res as object);
    res
    .redirect(conf.FRONTEND_ENDPOINT+"/dashboard");
}

/**
 * Fetches the authenticated user's details, including profile and data.
 * @param req - The authenticated request containing user data.
 * @param res - The response object to send the result.
 */
export async function getUserDetails(req: AuthenticatedRequest, res: Response) {
  const userData = await dbService.getUserData({
    _id: req.userData?._id as string,
  });
  if (userData.code !== 200) {
    res.status(userData.code).send(userData);
    return;
  }
  const userProfile = await dbService.getUserProfile(
    req.userData?._id as string
  );
  if (userProfile.code !== 200) {
    res.status(userProfile.code).send(userProfile);
    return;
  }
  const userDetails = {
    userData: userData.res,
    userProfile: userProfile.res,
  };
  res
    .status(200)
    .send({ code: 200, message: "User Data Found", res: userDetails });
}

/**
 * Logs out the user by clearing the session cookie.
 * @param req - The authenticated request.
 * @param res - The response object to send the result.
 */
export async function logout(req: AuthenticatedRequest, res: Response) {
  res.clearCookie("auth_token");
  res
    .status(200)
    .send({ code: 200, message: "Logged out successfully", res: null });
}

/**
 * Resets the user's password.
 * @param req - The authenticated request containing the new password.
 * @param res - The response object to send the result.
 */
export async function resetPassword(req: AuthenticatedRequest, res: Response) {
  try {
    const { password } = req.body;
    const { _id: userId } = req.userData as UserDataInCookie;
    const passRes = await authService.resetPass(userId, password);
    res.status(passRes.code).send(passRes);
    return;
  } catch (error) {
    logger.error(
      `ERR_RESETTING_PASSWORD_IN_RESET_PASSWORD_CONTROLLER ${error}`
    );
    res
      .status(500)
      .send({ code: 500, message: "Internal server error", res: null });
    return;
  }
}
