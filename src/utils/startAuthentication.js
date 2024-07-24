import { authServices } from "../backend-services";


export default async function startAuthentication({dispatch,login,logout,setFetching,setEmail,setPass,setName}){
    // dispatch(setFetching(true))
    dispatch(setFetching(true))
    const res  = await authServices.getLoggedInUser();
    dispatch(setFetching(false))
    console.log(res)
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
        dispatch(logout())
        return {message:"Create session first !",code:res.code}
    }
    // dispatch(setFetching(false))
}