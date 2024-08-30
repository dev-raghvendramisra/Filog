import { authServices } from "../services";
import {authErrHandler} from "../utils";

export default async function getNewVerificationEmail({isUserLoggedIn, userData, setErr, navigate, errMsg}){
    if(isUserLoggedIn && userData.emailVerification){
      setTimeout(() => navigate("/"), 7000);
      return setErr("Email already verified");
    }
    const res = await authServices.createEmailVerification();
    const didErrOccured = authErrHandler({res,setErr,navigate,errMsg, verification:true});
    return didErrOccured || res;
}