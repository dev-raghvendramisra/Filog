export default function errHandler({res,dispatch,navigate,setEmail,setPass,setName,setFormErr}){
    if(res.code==401){
        setFormErr("Invalid credentials. Re-check your email and password!")
        return true;
    }
    else if(res.code==429){
        setFormErr("Too many attempts. Please try again later!")
        setTimeout(()=>{
            dispatch(setEmail(""))    //setting the form slice's state to default 
            dispatch(setPass(""))
            setName?dispatch(setName("")):null
            navigate("/") //redirecting user to landing page to avoid further requests
        },7000)
        return true;  
    }
    else if(res.code==409){
        setFormErr("An account already exists with same email!")
        return true;
    }
    else if(res.code==500){
        setFormErr("Internal server error, Please try again later!")
        setTimeout(()=>{
            dispatch(setEmail(""))    //setting the form slice's state to default 
            dispatch(setPass(""))
            setName?dispatch(setName("")):null
            navigate("/") //redirecting user to landing page to avoid further requests
        },7000)
        return true;
    }
    else if(res.code==503){
        setFormErr("Service unavailable, Please try again later!")
        setTimeout(()=>{
            dispatch(setEmail(""))    //setting the form slice's state to default 
            dispatch(setPass(""))
            setName?dispatch(setName("")):null
            navigate("/") //redirecting user to landing page to avoid further requests
        },7000)
        return true;
    }

    else return false

}