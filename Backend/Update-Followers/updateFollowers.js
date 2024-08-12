import conf from "../conf/conf.js";
import dbServices from "../Services/dbService.js";
export default async function updateFollowers({targetUserId, userId,type,log}){
  const targteUserProfile = await dbServices.getTargteProfile(targetUserId)
  log(targteUserProfile)
  if(targteUserProfile.$id){
     const existingFollowers = targteUserProfile.followers;
     let updatedFollowers=[];
     if(type=="following") {
      log("existing-followers :",existingFollowers)
      updatedFollowers = [...existingFollowers,userId]
     }
     else if(type=="unfollowing"){
        log("existing-followers :",existingFollowers)
        updatedFollowers = existingFollowers.filter((user)=>(user!==userId))
     }
     log("updated-followers :",...updatedFollowers)
     const res = await dbServices.updateProfileDocument({profileId:targteUserProfile.$id,updatedFollowers,log:log})
     log("updated-profile: ",res)
     if(res.$id){
        const userProfile = await dbServices.getTargteProfile(userId)
        if(userProfile.$id){
            const resetProfile = await dbServices.updateProfileDocument({profileId:userProfile.$id,})
            if(resetProfile.$id){
                log(resetProfile)
                return {ok:true,res}  
            }else  return {ok:false,res}
        }
       else return {ok:false,res}
     }
     else return {ok:false,res}
  }
  else return targteUserProfile
} 