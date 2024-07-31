import { Query } from "appwrite";
import { dbServices } from "../backend-services";

export default async function getUserProfile({userId="#",setProfile,clearProfile,dispatch}){
    const res = await dbServices.getUsers([Query.equal("userId",[userId])])
    if(res.documents.length>0){
        console.log(res.documents[0]);
        dispatch(clearProfile())
        dispatch(setProfile(res.documents[0]))
        return {ok:true,res:res}
    }
    else{
        dispatch(clearProfile())
        return {ok:false,res:res,message:"Nothing to show here !"}
    } 
}