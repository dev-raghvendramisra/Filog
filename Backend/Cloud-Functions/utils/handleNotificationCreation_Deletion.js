import dbServices from "../Services/dbService.js";

export default async function handleNotificationCreation_Deletion({ type="create",notification, notificationId, log }) {
    try {
      const res =  type=="create" 
       ? await dbServices.createNotification({log,type:"custom",notification})
       : await dbServices.deleteNotification("custom",notificationId,log);
        if(type=="create" && res.$id ){
            return {ok:true};
        }
        if(type=="delete" && res.message.length == 0){
            return {ok:true};
        }
        throw new Error("Failed to create notification");
    } catch (error) {
        log("Error updating document database:", error.message);
        return { ok: false, error: error.message };
        
    }
}