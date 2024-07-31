import { authServices } from "../backend-services";
import toast from "react-hot-toast";

export default async function startAuthentication({dispatch,login,logout,setFetching,setEmail,setPass,setName}){

    dispatch(setFetching(true))

    const timer = setTimeout(()=>{
     dispatch(setFetching(false));
     dispatch(logout());
     toast.error("Authentication failed, internal server error")
    },10000)
 
    const res  = await authServices.getLoggedInUser();
    clearTimeout(timer)

    dispatch(setFetching(false))
    if(res.err){
        dispatch(logout())
        return res.err
    }
    else if(res.code!==401){
        dispatch(login(res))
        setEmail? dispatch(setEmail("")):null
        setPass? dispatch(setPass("")):null
        setName? dispatch(setName("")):null
        return res;
    }
    else if(res.code==401){
        console.error("Create a session first !",res.code);
        dispatch(logout())
        return {message:"Create session first !",code:res.code}
    }
}