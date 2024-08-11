import conf from "../conf/conf.js";
import dbServices from "../Services/dbService.js";
export default async function updateFollowers({targetUserId, userId,type}){
  const targteUserProfile = await dbServices.getTargteProfile(targetUserId)
  if(targteUserProfile.ok){
     const existingFollowers = targteUserProfile.followers;
     let updatedAttribute;
     if(type=="following") {
       updatedAttribute = [...existingFollowers,userId]
     }
     else if(type=="unfollowing"){
       updatedAttribute = existingFollowers.filter((user)=>(user!==userId))
     }
     const res = await dbServices.updateProfileDocument({profileId:targteUserProfile.userId,updatedAttribute})
     if(res.$id){
       return {ok:true,res}
     }
     else return {ok:false,res}
  }
  else return targteUserProfile
} 