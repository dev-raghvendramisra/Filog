import { LoginBody, SignupBody, UserProfileBody } from "@type/request/body";
import { envLogger as logger } from "@lib";
import { BlackListedToken, User, UserProfile } from "@db/models";
import { getDiceBearAvatar } from "@utils/dbUtils";
import conf from "config/conf";
import { compare, genSalt, hash } from "bcrypt";
import axios from "axios";
import bucketService from "./bucketService";
import dbService from "./dbService";
import { Types } from "mongoose";

class AuthService {
  /**
   * Creates a new user account.
   * @param {SignupBody} data - The signup data containing user details.
   * @returns {Promise<{code: number, message: string, res: any}>} Response object with status code, message, and result.
   */
  async createUser(data: SignupBody) {
    try {
      const res = await this.doesUserExists(data);
      if (res == null) {
        throw false;
      }
      if (res.exists){ return {
          code: 409,
          message: "An account already exists with same email or userName",
          res: res.user,
        }}
      const user = await User.create(data);
      
      const profile = await this.createUserProfile({
        userName: data.userName,
        userId: user.id,
        userAvatar: data.userAvatar || getDiceBearAvatar(user.id),
        fullName: user.fullName
      });
      if (profile.code !== 201) {
        User.deleteOne({ _id: user._id });
        throw null;
      }
      return { code: 201, message: "Account created", res: {
        _id:user.id,
        email:user.email,
        emailVerification:user.emailVerification,
        fullName:user.fullName,
        userName:user.userName
      } };
    } catch (error) {
      logger.error(`ERR_WHILE_CREATING_USER_ACCOUNT_IN_AUTH_SERVICE ${error}`);
      return { code: 500, message: "Internal Server Error", res: null };
    }
  }

  /**
   * Creates a user profile.
   * @param {UserProfileBody} data - The user profile data.
   * @returns {Promise<{code: number, message: string, res: any}>} Response object with status code, message, and result.
   */
  async createUserProfile(data: UserProfileBody) {
    const welcomeNotificationId = new Types.ObjectId()
    try {
        const response = await axios.get(data.userAvatar,{responseType:"arraybuffer"})
        const imageBuffer = Buffer.from(response.data,"binary")
        const uploadAvatar = await bucketService.uploadImage(imageBuffer,data.userId,"avatar")
        if(uploadAvatar.code==200){
          data.userAvatar = uploadAvatar.res?.imageURI as string;
          data.userAvatarId = uploadAvatar.res?.imageId as string
        }
      
      const profile = await UserProfile.create({...data,customNotifications:[welcomeNotificationId]});
      dbService.createCustomNotification(`Welcome ${data.fullName}, we are thrilled to have you as a Filogger!`,"https://cdn.filog.in/avatar/66df0d8000246519fc17",data.userId,undefined,{_id:welcomeNotificationId});
      return { code: 201, message: "Profile created", res: profile };
    } catch (error) {
      logger.error(`ERR_WHILE_CREATING_USER_PROFILE_IN_AUTH_SERVICE ${error}`);
      return { code: 500, message: "Internal Server Error", res: null };
    }
  }

  /**
   * Checks if a user already exists based on email or username.
   * @param {{ email: string; userName?: string }} data - The data containing email and optional username.
   * @returns {Promise<{exists: boolean, user: any} | null>} Object indicating existence and user details, or null on error.
   */
  async doesUserExists(data: { email: string; userName?: string }) {
    try {
      const user = await User.findOne({$or:[{email:data.email},{userName:data.userName}]}, { password: 0 }).lean();
      if (!user) return { exists: false, user };
      return { exists: true, user };
    } catch (error) {
      logger.error(
        `ERR_OCCURED_WHILE_CHECKING_USER_EXISTENCE_IN_AUTH_SERVICE ${error}`
      );
      return null;
    }
  }

  /**
   * Blacklists a JWT token.
   * @param {string} token - The token to blacklist.
   * @returns {Promise<boolean | null>} True if already blacklisted, false otherwise, or null on error.
   */
  async blacklistToken(token: string) {
    try {
      const isBlackListed = await BlackListedToken.findOne({
        _id: conf.BLACKISTED_TOKENS_DOC_ID,
        tokens: { $in: token },
      });
      if (isBlackListed) return true;
      BlackListedToken.updateOne(
        { _id: conf.BLACKISTED_TOKENS_DOC_ID },
        { $push: { tokens: token } }
      ).then(
        (res) =>
          res.modifiedCount || logger.error(`ERR_BLACKLISTING_TOKEN ${res}`)
      );
      return false;
    } catch (error) {
      logger.error(
        `ERR_CHECKING_JWT_BLACKLISTING_STATUS_IN_AUTH_SERVICE ${error}`
      );
      return null;
    }
  }

  /**
   * Verifies a user's email.
   * @param {string} _id - The user ID.
   * @returns {Promise<{code: number, message: string, res: any}>} Response object with status code, message, and result.
   */
  async verifyEmail(_id: string) {
    try {
      const res = await User.updateOne(
        { _id: _id },
        { emailVerification: true }
      );
      if (!res.modifiedCount)
        return { code: 404, message: "Account does not exists", res: null };
      return { code: 200, message: "Email verified successfully", res: null };
    } catch (error) {
      logger.error(`ERR_VERIFYING_EMAIL_IN_AUTH_SERVICE ${error}`);
      return { code: 500, message: "Internal Server Error", res: null };
    }
  }

  /**
   * Resets a user's password.
   * @param {string} _id - The user ID.
   * @param {string} pass - The new password.
   * @returns {Promise<{code: number, message: string, res: any}>} Response object with status code, message, and result.
   */
  async resetPass(_id: string, pass: string) {
    try {
      const salt = await genSalt(10);
      const hashedPass = await hash(pass, salt);
      const res = await User.updateOne({ _id }, { password: hashedPass });
      if (!res.modifiedCount)
        return { code: 404, message: "Account does not exists", res: null };
      return { code: 200, message: "Password changed successfully", res: null };
    } catch (error) {
      logger.error(`ERR_RESETING_PASS_IN_AUTH_SERVICE ${error}`);
      return { code: 500, message: "Internal Server Error", res: null };
    }
  }

  /**
   * Verifies user credentials during login.
   * @param {LoginBody} data - The login data containing email and password.
   * @returns {Promise<{code: number, message: string, res: any}>} Response object with status code, message, and result.
   */
  async verifyCreds(data: LoginBody) {
    try {
      const user = await User.findOne({ email: data.email });
      if (!user)
        return {
          code: 404,
          message: "No account found with requested email",
          res: null,
        };
      const result = await compare(data.password, user.password);
      if (result) return { code: 200, message: "Valid Credentials", res: null };
      return { code: 401, message: "Invalid credentials", res: null };
    } catch (error) {
      logger.error(`ERR_VERIFYING_CREDS_IN_AUTH_SERVICE ${error}`);
      return { code: 500, message: "Internal server error", res: null };
    }
  }
}

const authService = new AuthService();
export default authService;
