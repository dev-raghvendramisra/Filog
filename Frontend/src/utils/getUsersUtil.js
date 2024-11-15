import { Query } from "appwrite";
import { dbServices } from "../services";


export default async function getUsersUtil({userId="#",offset=0,limit=10,dispatch,clearUsers,setUsers,query=[]}){
    let queries=[
        Query.orderDesc("version"), //we use version as the first parameter to sort the users because this will list most active users first because version gets incremented upon interactions and updates
        Query.orderDesc("priority")//we use this parameter to sort the users because this will list the users with the highest priority first by default like the founder account or the admin account
    ]
    if(query.length==0){
        queries.push(Query.notEqual("userId",[userId]))
    }
    else queries=[...queries,...query]

    const res =  await dbServices.getUsers([...queries,Query.offset(offset),Query.limit(limit)])

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
            return {ok:true,res:res}
         }
         else{
            return {ok:false,pagination:true,res:res,message:"Nothing to show here !"}
         }
    }
}

