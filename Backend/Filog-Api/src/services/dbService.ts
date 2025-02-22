import conf from 'config/conf';
import { envLogger as logger } from '@lib';
import { SignupBody, UserProfileBody } from '@type/request/body';
import { User, UserProfile } from '@db/models';
import { DBQuery } from '@type/request/query';

class DBService{
    async getUser(query:Partial<SignupBody>){
        try {
            const res = await User.findOne(query).lean()
            if(!res) return false
            delete ((res as any).password)
            return res;
        } catch (error) {
            logger.error(`ERR_GETTING_USER_FROM_DB ${error}`)
             return null
        }
    }
    
    async getUserProfiles(query:DBQuery){
        try {
            const users = await UserProfile.find(query.filters).skip(query.skip || 0).sort(query.sort).limit(query.limit || 10);
            return {res:users,code:200,message:"Users fetched"}
        } catch (error) {
            logger.error(`ERR_WHILE_FETCHING_USERS ${error}`)
            return {code:500,res:null,message:"Internal server error"}
        }
    }
}

const dbService = new DBService();
export default dbService