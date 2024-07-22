import { authServices } from "../backend-services";


export default async function startAuthentication({dispatch,login,logout,setFetching}){
    dispatch(setFetching(true))
    const res  = await authServices.getLoggedInUser();
    console.log(res)
    if(res.err){
        dispatch(logout())
        return res.err
    }
    else if(res.name){
        dispatch(login())
        return res;
    }
    else if(res.code="401"){
        dispatch(logout())
        return {message:"Create session first !",code:res.code}
    }
    dispatch(setFetching(false))
}