import conf from "../conf/conf.js";
import dbServices from "../Services/dbService.js";
export default async function updateFollowers({targetUserId, userId,type,context}){
  const targteUserProfile = await dbServices.getTargteProfile(targetUserId)
  context.log(targteUserProfile)
  if(targteUserProfile.ok){
     const existingFollowers = targteUserProfile.followers;
     context.log("existing-followers :",...existingFollowers)
     let updatedAttribute;
     if(type=="following") {
       updatedAttribute = [...existingFollowers,userId]
     }
     else if(type=="unfollowing"){
       updatedAttribute = existingFollowers.filter((user)=>(user!==userId))
     }
     context.log("updated-followers :",...existingFollowers)
     const res = await dbServices.updateProfileDocument({profileId:targteUserProfile.userId,updatedAttribute})
     context.log("updated-profile: ",res)
     if(res.$id){
       return {ok:true,res}
     }
     else return {ok:false,res}
  }
  else return targteUserProfile
} 