import { authServices } from "../services";
import toast from "react-hot-toast";
import {handleAuthObject} from ".";
import { GenToast } from "../components";
import { setProfile } from "../store/userProfileSlice";
import { login, logout, setFetching } from "../store/authSlice";

export default async function startAuthentication({dispatch,setEmail,setPass,setName,navigate,read_writeAuthObj=true}){
    
    const dispatchFetching = (val) =>{
        setFetching && dispatch(setFetching(val))
    }
    dispatchFetching(true)
 
    const timer = setTimeout(()=>{
     dispatchFetching(false);
     dispatch(logout());
     toast.custom(<GenToast type="err">Authentication failed, internal server error</GenToast>)
     return navigate("")
    },10000)

    const isAuthObjValid = read_writeAuthObj ? handleAuthObject({read:true}) : null
    if(isAuthObjValid){ 
        dispatch(login({fullName:isAuthObjValid}))
    }

    const res  = await authServices.getLoggedInUser();
    
    clearTimeout(timer)

    dispatchFetching(false)
    if(res.code!==200){
        dispatch(logout())
        return res;
    }
    else{
        dispatch(login(res.res.userData))
        dispatch(setProfile(res.res.userProfile))
        if(!isAuthObjValid && read_writeAuthObj) handleAuthObject({write:true , name:res.res.userData.fullName});
        
        setEmail? dispatch(setEmail("")):null
        setPass? dispatch(setPass("")):null
        setName? dispatch(setName("")):null
        return res;
    }
}