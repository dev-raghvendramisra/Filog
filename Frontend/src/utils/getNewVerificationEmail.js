import { authServices } from "../services";
import {authErrHandler} from "../utils";

export default async function getNewVerificationEmail({ userData, setErr, navigate, errMsg, setTimer, timer}){
    if(userData.emailVerification){
      timer && clearTimeout(timer);
      const newTimer = setTimeout(() => navigate("/"), 7000);
      setTimer && setTimer(newTimer)
      return setErr("Email already verified");
    }
    const res = await authServices.createEmailVerification();
    const didErrOccured = authErrHandler({res,setErr,navigate,errMsg, verification:true, setTimer,timer:timer && undefined});
    return !didErrOccured ;
}