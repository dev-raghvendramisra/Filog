import { Query } from "appwrite";
import { dbServices } from "../backend-services";


export default async function getBlogPosts({userId="#",offset=0,dispatch,clearBlogs,setBlogs}){
    const res =  await dbServices.getBlogs([Query.equal("status",[true]),Query.notEqual("userId",[userId]),Query.offset(offset)])
    // console.log(res)
    if(offset==0){
            if(res.documents.length>0){
               dispatch(clearBlogs());
              dispatch(setBlogs(res.documents))
              return {ok:true,res:res}
            }
            else{
                return {ok:false,res:res,message:"Nothing to show here !"}
            }    
        } 
    if(offset>0){
         if(res.documents.length>0){
            dispatch(setBlogs(res.documents))
         }
         else{
            return {ok:false,res:res,message:"Nothing to show here !"}
         }
    }
}

