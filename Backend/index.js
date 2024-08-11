
import conf from "./conf/conf.js";
import updateFollowers from './Update-Followers/updateFollowers.js'

export default async function handler({req,res},...context){

  
  const trigger = req.headers["x-appwrite-trigger"];
  if(trigger=="event"){
    const evtType = req.headers["x-appwrite-event"];
    if(evtType.includes(conf.userProfilesCollectionID) && evtType.includes("update")){
      const updatedAttrJson = req.body.updatedAttribute?req.body.updatedAttribute:null
      if(!updatedAttrJson) 
        {context.log("This is not the event to perform operations") ;
          return null}
        const updatedAttribute = JSON.parse(updatedAttrJson)
        context.log(updatedAttribute)
        if(updatedAttribute.type=="following" || updatedAttribute.type=="unfollowing"){
        context.log(updatedAttrJson,"yha tak chl rha hai")
           const res =await updateFollowers({
            targetUserId:updatedAttribute.value,
            userId:req.body.userId,
            type:updatedAttribute.type,
            context:context
            })
          context.log(res)
          if(res.ok){
            context.log(req.body.userName,"-",req.body.userId,"started following",updatedAttribute.value)
            return res.empty()
          }
          else{
            context.log("failed to unfollow")
            return res.empty()
          }
        }
    }
    else{
      context.log("This is not the event to perform operations") ;
      return res.empty
    }
  }

  
  
  
  
} 

handler({req:{},res:{},log:""})
