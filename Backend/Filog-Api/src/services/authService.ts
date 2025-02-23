
import { LoginBody, SignupBody, UserProfileBody } from '@type/request/body';
import { envLogger as logger } from '@lib'
import { BlackListedToken, User, UserProfile } from '@db/models';
import { getDiceBearAvatar } from '@utils/dbUtils';
import conf from 'config/conf';
import { compare, genSalt, hash } from 'bcrypt';

class AuthService {

    async createUser(data: SignupBody) {
        try {
            const res = await this.doesUserExists(data)
            if (res == null) {
                throw false
            }
            if (res) return { code: 409, res: null, message: "An account already exists with same email or username" }
            const user = await User.create(data)
            const profile = await this.createUserProfile({
                username: data.username,
                userId: user.id,
                userAvatar: getDiceBearAvatar(user.id)
            })
            return { code: 201, res: profile.res, message: "Account created" }
        } catch (error) {
            logger.error(`ERR_WHILE_CREATING_USER_ACCOUNT_IN_AUTH_SERVICE ${error}`)
            return { code: 500, res: null, message: "Internal Server Error" }
        }
    }

    async createUserProfile(data: UserProfileBody) {
        try {
            const profile = await UserProfile.create(data);
            return { code: 201, res: profile, message: "Profile created" }
        } catch (error) {
            logger.error(`ERR_WHILE_CREATING_USER_PROFILE_IN_AUTH_SERVICE ${error}`)
            return { code: 500, res: null, message: "Internal Server Error" }
        }
    }

    async doesUserExists(data: {email:string,username?:string}) {
        try {
            const user = await User.findOne({$or:[{ email:data.email,username:data.username }]})
            if (!user) return false;
            return true;
        } catch (error) {
            logger.error(`ERR_OCCURED_WHILE_CHECKING_USER_EXISTENCE_IN_AUTH_SERVICE ${error}`)
            return null
        }
    }

    async blacklistToken(token:string){
      try {
        const isBlackListed = await BlackListedToken.findOne({id:conf.BLACKISTED_TOKENS_DOC_ID,tokens:token});
        if(isBlackListed) return true;
        return false
      } catch (error) {
        logger.error(`ERR_CHECKING_JWT_BLACKLISTING_STATUS_IN_AUTH_SERVICE ${error}`)
        return null
      }
    }

    async verifyEmail(_id:string){
      try {
        const res = await User.updateOne({_id:_id},{emailVerification:true})
        if(!res.modifiedCount) return {code:404,res:null,message:"Account does not exists"}
        return {code:200,res:null,message:"Email verified successfully"}
      } catch (error) {
        logger.error(`ERR_VERIFYING_EMAIL_IN_AUTH_SERVICE ${error}`)
        return {code:500,res:null,message:"Internal Server Error"}
      }
    }

    async resetPass(_id:string,pass:string){
     try {
        const salt = await genSalt(10)
        const hashedPass = await hash(pass,salt)
        const res = await User.updateOne({_id},{password:hashedPass})
        if(!res.modifiedCount) return {code:404,res:null,message:"Account does not exists"}
        return {code:200,res:null,message:"Password changed successfully"}
     } catch (error) {
        logger.error(`ERR_RESETING_PASS_IN_AUTH_SERVICE ${error}`)
        return {code:500,res:null,message:"Internal Server Error"}
     }
    }
    
    async verifyCreds(data:LoginBody){
      try {
        const user = await User.findOne({email:data.email})
        if(!user) return {code:404,res:null,message:"No account found with requested email"}
        const result = await compare(data.password,user.password)
        if(result) return {res:null,code:200,message:"Valid Credentials"}
        return {res:null,code:401,message:"Invalid credentials"}
      } catch (error) {
        logger.error(`ERR_VERIFYING_CREDS_IN_AUTH_SERVICE ${error}`)
        return {code:500,res:null,message:"Internal server error"}
      }
    }


}

const authService = new AuthService();
export default authService