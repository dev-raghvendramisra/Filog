import { authServices } from "../services";
import {authErrHandler} from "../utils";

export default async function getNewVerificationEmail({ userData, setErr, navigate, errMsg, setTimer, timer}){
    if(userData.emailVerification){
      timer && clearTimeout(timer);
      const newTimer = setTimeout(() => navigate("/"), 7000);
      setTimer && setTimer(newTimer)
      setErr("Email already verified")
      return ;
    }
    
    const res = await authServices.createEmailVerification(userData.email,userData._id);
    const didErrOccured = authErrHandler({res});
    return didErrOccured
}