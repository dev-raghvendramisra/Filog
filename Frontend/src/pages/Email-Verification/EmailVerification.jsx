import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { authErrHandler, getNewVerificationEmail } from '../../utils';
import { authServices } from '../../services';
import useTheme from '../../context/themeContext';
import { Button, FeedbackMessage, GenToast } from '../../components';
import toast from 'react-hot-toast';
import { ID } from 'appwrite';
import { useSelector } from 'react-redux';

function EmailVerification() {
  const [searchParams] = useSearchParams();
  const [err, setErr] = React.useState(null);
  const [successMsg, setSuccessMsg] = React.useState(null);
  const [disabled, setDisabled] = React.useState(true);
  const [resCode, setResCode] = React.useState(null);
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const { isUserLoggedIn, userData, fetching } = useSelector((state) => state.auth);
  const errMsg = ["Invalid verification link", "Email already verified"];
  
  const isVerificationExpired = React.useCallback((expire) => {
    const crrDate = new Date();
    const expireDate = new Date(expire.replace(" ", "T") + "Z");
    return crrDate >= expireDate;
  },[]);

  const handleClick = React.useCallback(async()=>{
    setDisabled(true);
    setErr(null);
    if(resCode!==401 && !isUserLoggedIn){
      setTimeout(()=>navigate("/login"),7000)
      return setErr("You need to login first");
    }
    const res = await getNewVerificationEmail({isUserLoggedIn, userData,setErr,errMsg, navigate});
    res 
    ? (()=>{
      toast.custom(<GenToast type="successMsg">Verification email sent successfully</GenToast>);
      setSuccessMsg("Verification email sent , click on the link to verify")
      })()
    : null
  },[resCode,isUserLoggedIn,userData])


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
        const didErrOccured = authErrHandler({ res, setErr, navigate, errMsg, setResCode, verification:true });
        if (!didErrOccured) {
          toast.custom(<GenToast type="success">Email verified successMsgfully</GenToast>);
          setSuccessMsg("Email verified successfully");
        }
      } catch (err) {
        console.FeedbackMessage("Verification FeedbackMessage:", err);
        setErr("An unexpected FeedbackMessage occurred");
      }
    }
  }, [searchParams]);
  

  React.useEffect(() => {
    if (err) toast.custom(<GenToast type="err">{err}</GenToast>);
  }, [err]);


  React.useEffect(()=>{
    if(!fetching){
      setDisabled(false);
    }
  },[fetching])


  





  return (
    <div className='h-100vh w-full flex items-center justify-center' id={ID.unique() + "email-verification-wrapper"}>
      <div className='w-fit h-fit flex items-center justify-start p-4vw flex-col  border-2  rounded-3xl border-gray-200 dark:border-footer_text_light' id={ID.unique() + "email-verification-cont"}>
        <div className='flex items-center flex-col' id={ID.unique() + "email-verification-header"}>
          <img className='w-8vw' src={isDark ? "/icons/filogXgmail-dark.webp" : "/icons/filogXgmail-light.webp"} />
          <p className='text-1.7vw mt-0.5vw' id={ID.unique()+"email-verification-heading"}>Email verification</p>
          <p className='text-0.5vw text-footer_text'>Verifying Your Email, You can request new link if it fails</p>
          <FeedbackMessage err={err} className='mt-1vw'>{err || successMsg}</FeedbackMessage> 
        </div>
        <div className='flex gap-4 mt-2vw' id={ID.unique() + "email-verification-buttons"}>
          <Button outline className='text-1.2vw' onClick={
            () => navigate("/")}>
            Do it later
          </Button>
          <Button primary={!disabled} disabled={disabled} onClick={handleClick} className='text-1.2vw'>
            Get new
          </Button>
        </div>
      </div>
    </div>
  );
}

export default EmailVerification;
