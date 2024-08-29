export default function errHandler({res,dispatch,navigate,setEmail,setPass,setName,setErr,errMsg=[],setResCode}){
    if(res.code==401){
        setErr(errMsg[0] || "Invalid credentials!")
        setResCode && setResCode(res.code)
        return true;
    }
    if(res.code==429){
        setErr("Too many attempts. Please try again later!")
        setTimeout(()=>{
            setEmail && dispatch(setEmail(""))    //setting the form slice's state to default 
            setPass && dispatch(setPass(""))
            setName && dispatch(setName(""))
            navigate("/") //redirecting user to landing page to avoid further requests
        },7000)
        return true;  
    }
    if(res.code==409){
        setErr(errMsg[1] || "An account already exists with same email!")
        setResCode && setResCode(res.code)
        return true;
    }
    if(res.code==500){
        setErr("Internal server error, Please try again later!")
        setTimeout(()=>{
            setEmail && dispatch(setEmail(""))    //setting the form slice's state to default 
            setPass && dispatch(setPass(""))
            setName && dispatch(setName(""))
            navigate("/") //redirecting user to landing page to avoid further requests
        },7000)
        return true;
    }
    if(res.code==503){
        setErr("Service unavailable, Please try again later!")
        setTimeout(()=>{
            setEmail && dispatch(setEmail(""))    //setting the form slice's state to default 
            setPass && dispatch(setPass(""))
            setName && dispatch(setName(""))
            navigate("/") //redirecting user to landing page to avoid further requests
        },7000)
        return true;
    }

     return false

}