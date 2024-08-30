import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { errHandler, getNewVerificationEmail } from '../../utils';
import { authServices } from '../../services';
import useTheme from '../../context/themeContext';
import { Button, Error, GenToast } from '../../components';
import toast from 'react-hot-toast';
import { ID } from 'appwrite';
import { useSelector } from 'react-redux';

function EmailVerification() {
  const [searchParams] = useSearchParams();
  const [err, setErr] = React.useState(null);
  const [disabled, setDisabled] = React.useState(true);
  const [resCode, setResCode] = React.useState(null);
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const { isUserLoggedIn, userData } = useSelector((state) => state.auth);
  const errMsg = ["Invalid verification link", "Email already verified"];
  
  const isVerificationExpired = (expire) => {
    const crrDate = new Date();
    const expireDate = new Date(expire.replace(" ", "T") + "Z");
    return crrDate >= expireDate;
  };


  useEffect(() => {
    const userId = searchParams.get('userId');
    const secret = searchParams.get('secret');
    const expire = searchParams.get('expire');
    console.log({ userId, secret, expire });

    if (userId && secret && !isVerificationExpired(expire)) {
      verification();
    } else if (userId && secret) {
      setErr("Verification link expired");
    } else {
      setErr("Verification link broken");
    }

    async function verification() {
      try {
        const res = await authServices.verifyEmail(userId, secret);
        console.log(res.code);
        const didErrOccured = errHandler({ res, setErr, navigate, errMsg, setResCode });
        if (!didErrOccured) {
          toast.custom(<GenToast type="success">Email verified successfully</GenToast>);
        }
      } catch (error) {
        console.error("Verification error:", error);
        setErr("An unexpected error occurred");
      }
    }
  }, [searchParams]);


  React.useEffect(() => {
    if (err) toast.custom(<GenToast type="err">{err}</GenToast>);
  }, [err]);

  React.useEffect(()=>{
    console.log(resCode!==401, userData?.$id );
    if(resCode!==401, userData?.$id){
      setDisabled(false);
    }
    else setDisabled(true);
  },[userData,resCode])








  return (
    <div className='h-100vh w-full flex items-center justify-center' id={ID.unique() + "email-verification-wrapper"}>
      <div className='w-fit h-fit flex items-center justify-start p-4vw flex-col  border-2 rounded-3xl border-footer_text dark:border-footer_text_light' id={ID.unique() + "email-verification-cont"}>
        <div className='flex items-center flex-col' id={ID.unique() + "email-verification-header"}>
          <img className='w-8vw' src={isDark ? "/filogXgmail-dark.webp" : "/filogXgmail-light.webp"} />
          <p className='text-1.7vw mt-0.5vw'>Email verification</p>
          <Error className='mt-1vw'>{err}</Error>
        </div>
        <div className='flex gap-4 mt-2vw' id={ID.unique() + "email-verification-buttons"}>
          <Button outline className='text-1.2vw' onClick={
            () => navigate("/")}>
            Do it later
          </Button>
          <Button primary={!disabled} disabled={disabled} onClick={
            ()=>{setDisabled(true);
            getNewVerificationEmail({isUserLoggedIn, userData,setErr,errMsg})
            }} className='text-1.2vw'>
            Get new
          </Button>
        </div>
      </div>
    </div>
  );
}

export default EmailVerification;
