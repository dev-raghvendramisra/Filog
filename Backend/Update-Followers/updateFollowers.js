import conf from "../conf/conf.js";
import dbServices from "../Services/dbService.js";
export default async function updateFollowers({targetUserId, userId,type,log}){
  const targteUserProfile = await dbServices.getTargteProfile(targetUserId)
  log(targteUserProfile)
  if(targteUserProfile.ok){
     const existingFollowers = targteUserProfile.followers;
     log("existing-followers :",...existingFollowers)
     let updatedAttribute;
     if(type=="following") {
       updatedAttribute = [...existingFollowers,userId]
     }
     else if(type=="unfollowing"){
       updatedAttribute = existingFollowers.filter((user)=>(user!==userId))
     }
     log("updated-followers :",...existingFollowers)
     const res = await dbServices.updateProfileDocument({profileId:targteUserProfile.userId,updatedAttribute})
     log("updated-profile: ",res)
     if(res.$id){
       return {ok:true,res}
     }
     else return {ok:false,res}
  }
  else return targteUserProfile
} 