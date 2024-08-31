import { authServices } from "../services";
import {authErrHandler} from "../utils";

export default async function getNewVerificationEmail({ userData, setErr, navigate, errMsg, setTimer}){
    if(userData.emailVerification){
      const timer = setTimeout(() => navigate("/"), 7000);
      setTimer && setTimer(timer)
      return setErr("Email already verified");
    }
    const res = await authServices.createEmailVerification();
    const didErrOccured = authErrHandler({res,setErr,navigate,errMsg, verification:true, setTimer});
    return !didErrOccured ;
}