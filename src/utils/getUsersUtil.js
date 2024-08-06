import { Query } from "appwrite";
import { dbServices } from "../backend-services";


export default async function getUsersUtil({userId="#",offset=0,limit=10,dispatch,clearUsers,setUsers,query=[]}){
    let queries=[]
    if(query.length==0){
        queries=[Query.notEqual("userId",[userId])]
    }
    else queries=[...query]

    const res =  await dbServices.getUsers([...queries,Query.offset(offset),Query.limit(limit)])
    
    if(offset==0){
            if(res.documents.length>=0){
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

