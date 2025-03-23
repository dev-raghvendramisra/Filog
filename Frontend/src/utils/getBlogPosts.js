import { dbServices, Query } from "../services";


export default async function getBlogPosts({userId="#",query,offset=0,limit=10,dispatch,clearBlogs,setBlogs}){

    let queries = new Query()
    .$eq("status",true)
    .$sortDesc("likeCount")
    .$limit(limit)
    .$skip(offset)

    if(query){
        queries = Query.$and(queries,query)
    }
    else queries.$ne("userId",userId)
    
    const res =  await dbServices.getBlogs(queries.build())
    
    if(offset==0){
            
            if(res.res && res.res.length>0){
               dispatch(clearBlogs());
              dispatch(setBlogs(res.res))
              return {ok:true,res:res}
            }
            else{
                return {ok:false,res:res,message:"Nothing to show here !"}
            }    
        } 
    if(offset>0){
         if(res.res.length>0){
            dispatch(setBlogs(res.res))
            return {ok:true,res:res,pagination:true}
         }
         else{
            return {ok:false,res:res,pagination:true,message:"Nothing to show here !"}
         }
    }
}

