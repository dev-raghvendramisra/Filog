import { Query } from "appwrite";
import { dbServices } from "../backend-services";


export default async function getBlogPosts({userId="#",query=[],offset=0,limit=10,dispatch,clearBlogs,setBlogs}){
    const queries = [
        Query.equal("status",[true]),
        Query.orderAsc("randomIndex"), //temporary query just to scramble the data
        Query.limit(limit),
        Query.offset(offset)
    ]
     query.length==0?
     queries.push(Query.notEqual("userId",[userId]))
     :queries.push(...query)
   
    const res =  await dbServices.getBlogs(queries)
    
    if(offset==0){
        console.log(res.documents);
            if(res.documents && res.documents.length>0){
               dispatch(clearBlogs());
              dispatch(setBlogs(res.documents))
              return {ok:true,res:res}
            }
            else{
                return {ok:false,res:res,message:"Nothing to show here !"}
            }    
        } 
    if(offset>0){
         console.log(res.documents);
         if(res.documents.length>0){
            dispatch(setBlogs(res.documents))
            return {ok:true,res:res,pagination:true}
         }
         else{
            return {ok:false,res:res,pagination:true,message:"Nothing to show here !"}
         }
    }
}

