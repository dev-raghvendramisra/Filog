import { authServices } from "../services";
import {authErrHandler} from "../utils";

export default async function getNewVerificationEmail({ userData, setErr, navigate, errMsg}){
    if(userData.emailVerification){
      setTimeout(() => navigate("/"), 7000);
      return setErr("Email already verified");
    }
    const res = await authServices.createEmailVerification();
    const didErrOccured = authErrHandler({res,setErr,navigate,errMsg, verification:true});
    return !didErrOccured ;
}