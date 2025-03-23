import { dbServices,Query } from "../services";


export default async function getUsersUtil({userId="#",offset=0,limit=10,dispatch,clearUsers,setUsers,query}){
    let queries = new Query().$sortDesc("activeness").$skip(offset).$limit(limit)
    if(query){
        queries = Query.$and(queries,query)
    }
    else queries.$ne("userId",userId) 
    const res =  await dbServices.getUsers(queries.build())

    

    if(offset==0){
            if(res.res.length>0){
              dispatch(clearUsers());
              dispatch(setUsers(res.res))
              return {ok:true,res:res}
            }
            else{
                return {ok:false,res:res,message:"Nothing to show here !"}
            }    
        } 
    if(offset>0){
         if(res.res.length>0){
            dispatch(setUsers(res.res))
            return {ok:true,res:res}
         }
         else{
            return {ok:false,pagination:true,res:res,message:"Nothing to show here !"}
         }
    }
}
