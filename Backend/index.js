
import conf from "./conf/conf.js";
import updateFollowers from './Update-Followers/updateFollowers.js'

export default async function handler({req,res,log}){

  
  const trigger = req.headers["x-appwrite-trigger"];
  if(trigger=="event"){
    const evtType = req.headers["x-appwrite-event"];
    if(evtType.includes(conf.userProfilesCollectionID) && evtType.includes("update")){
      const updatedAttrJson = req.body.updatedAttribute?req.body.updatedAttribute:null
      if(!updatedAttrJson) {log("This is not the event to perform operations") ;return null}
        const updatedAttribute = JSON.parse(updatedAttrJson)
        log(updatedAttribute)
        if(updatedAttribute.type=="following" || updatedAttribute.type=="unfollowing"){
        log(updatedAttrJson,"yha tak chl rha hai")
           const res =await updateFollowers({
            targetUserId:updatedAttribute.value,
            userId:req.body.userId,
            type:updatedAttribute.type,
            log:log
          })
          log(res)
          if(res.ok){
            log(req.body.userName,"-",req.body.userId,"started following",updatedAttribute.value)
            return res.empty()
          }
          else{
            log("failed to unfollow")
            return res.empty()
          }
        }
    }
    else{
      log("This is not the event to perform operations") ;
      return null
    }
  }

  
  
  
  
} 

handler({req:{},res:{},log:""})
