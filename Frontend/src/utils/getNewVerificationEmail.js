import { authServices } from "../services";
import errHandler from "./errHandler";

export default async function getNewVerificationEmail({isUserLoggedIn, userData, setErr, navigate, errMsg}){
    if(isUserLoggedIn && userData.emailVerification){
      return setErr("Email already verified");
    }
    const res = await authServices.createEmailVerification();
    errHandler({res,setErr,navigate,errMsg});
}