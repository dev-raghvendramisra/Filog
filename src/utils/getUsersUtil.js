import { Query } from "appwrite";
import { dbServices } from "../backend-services";


export default async function getUsersUtil({userId="#",offset=0,dispatch,clearUsers,setUsers}){
    const res =  await dbServices.getUsers([Query.notEqual("userId",[userId]),Query.offset(offset)])
    if(offset==0){
            if(res.documents.length>0){
               dispatch(clearUsers());
              dispatch(setUsers(res.documents))
              return {ok:true,res:res}
            }
            else{
                return {ok:false,res:res,message:"Nothing to show here !"}
            }    
        } 
    if(offset>0){
         if(res.documents.length>0){
            dispatch(setUsers(res.documents))
         }
         else{
            return {ok:false,res:res,message:"Nothing to show here !"}
         }
    }
}

