import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { errHandler} from '../../utils'
import { authServices } from '../../services';

function EmailVerification() {
  const [searchParams] = useSearchParams();
  const [err, setErr] = React.useState(null);
  const [resCode , setResCode] = React.useState(null);
  const navigate = useNavigate()
  const errMsg = ["Invalid verification link","Verification link expired"]

  useEffect(() => {

    const userId = searchParams.get('userId');
    const secret = searchParams.get('secret');
    const expire = searchParams.get('expire');
    console.log({ userId, secret, expire });

    if(userId && secret && isVerificationExpired(expire))verification();
    else {
    console.log("Verification link broken")
    setErr("Verification link expired")
   };

    async function verification(){
      const res = await authServices.verifyEmail(userId,secret); 
      console.log(res.code);
      const didErrOccured = errHandler({res,setErr,navigate,errMsg,setResCode})
    }
  }, [searchParams]);

 const isVerificationExpired = (expire) => {
  const crrDate = new Date();
  const expireDate = new Date(expire.replace(" ","T")+"Z");
  console.log(crrDate<expireDate);
  
  if(crrDate<expireDate){
    return true;
  }
  else false
 }
  return (
    <div className='pt-20p'>
      Email Verification
      <br />
      <p>{err}</p>
    </div>
  );
}

export default EmailVerification;
