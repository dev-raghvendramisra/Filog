import conf from "../conf/conf";
import dbServices from "../Services/dbService";
export default async function updateFollowers({targetUserId, userId}){
  const targteUserProfile = await dbServices.getTargteProfile(targetUserId)
  if(targteUserProfile.ok){
     const existingFollowers = targteUserProfile.followers;
     const updatedAttribute = [...existingFollowers,userId]
     const res = await dbServices.updateProfileDocument({profileId:targteUserProfile.userId,updatedAttribute})
  }
  else return targteUserProfile
} 