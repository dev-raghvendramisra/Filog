import { authServices } from "../services";
import toast from "react-hot-toast";
import {handleAuthObject} from ".";
import { GenToast } from "../components";

export default async function startAuthentication({dispatch,login,logout,setFetching,setEmail,setPass,setName,navigate}){

    dispatch(setFetching(true))

    const timer = setTimeout(()=>{
     dispatch(setFetching(false));
     dispatch(logout());
     toast.custom(<GenToast type="err">Authentication failed, internal server error</GenToast>)
     navigate("")
     return null
    },10000)

    const isAuthObjValid = handleAuthObject({read:true})
    if(isAuthObjValid){ dispatch(login({name:isAuthObjValid}))}

    const res  = await authServices.getLoggedInUser();
    
    clearTimeout(timer)

    dispatch(setFetching(false))
    if(res.err){
        dispatch(logout())
        return res.err
    }
    else if(res.code!==401){
        dispatch(login(res))
        if(!isAuthObjValid) console.log(handleAuthObject({write:true , name:res.name}));
        
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