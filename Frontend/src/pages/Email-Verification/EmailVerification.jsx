import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { authErrHandler, getNewVerificationEmail, startAuthentication } from '../../utils';
import { authServices } from '../../services';
import useTheme from '../../context/themeContext';
import { Button, FeedbackMessage, GenToast } from '../../components';
import toast from 'react-hot-toast';
import { ID } from 'appwrite';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '../../store/authSlice';

function EmailVerification() {
  // State hooks for handling error, success message, and various other states
  const [searchParams] = useSearchParams();
  const [err, setErr] = React.useState(null);
  const [successMsg, setSuccessMsg] = React.useState(null);
  const [disabled, setDisabled] = React.useState(true);
  const [resCode, setResCode] = React.useState(null);
  const [timer, setTimer] = React.useState(0);
  const [initLoading, setInitLoading] = React.useState(true);
  const [btnText, setBtnText] = React.useState("Get new");  
  const [btnLoading, setBtnLoading] = React.useState(false);
  
  // Redux and other hooks
  const { isUserLoggedIn, userData, fetching } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const dispatch = useDispatch();
  const id = ID.unique();
  
  // Error messages
  const errMsg = ["Invalid verification link", "Email already verified"];
  
  // Function to check if the verification link has expired
  const isVerificationExpired = React.useCallback((expire) => {
    const crrDate = new Date();
    const expireDate = new Date(expire.replace(" ", "T") + "Z");
    return crrDate >= expireDate;
  }, []);
  
  // Function to handle the "Get new" button click
  const handleClick = React.useCallback(async () => {
    setDisabled(true);
    setBtnLoading(true);
    setBtnText("Sending...");
    setErr(null);
    
    if (resCode == 401 && !isUserLoggedIn) {
      const timer = setTimeout(() => navigate("/login"), 7000);
      setTimer(timer);
      return setErr("You need to login first");
    }
    
    const res = await getNewVerificationEmail({
      isUserLoggedIn,
      userData,
      setErr,
      errMsg,
      navigate,
      timer,
      setTimer
    });
    
    if (res) {
      toast.custom(<GenToast type="successMsg">Verification email sent successfully</GenToast>);
      setSuccessMsg("Verification email sent, click on the link to verify");
      setErr(null);
    }
    setBtnLoading(false);
    setBtnText("Get new");
  }, [resCode, isUserLoggedIn, userData]);
  
  // Function to verify the email using userId and secret
  const verification = React.useCallback(async (userId, secret) => {
    const res = await authServices.verifyEmail(userId, secret);

    const didErrOccured = authErrHandler({
      res,
      setErr,
      navigate,
      errMsg,
      setResCode,
      verification: true,
      setTimer
    });
    
    if (!didErrOccured) {
      toast.custom(<GenToast type="success">Email verified successfully</GenToast>);
      setSuccessMsg("Email verified successfully");
      setErr(null);
      clearTimeout(timer);
      const newTimer = setTimeout(() => navigate("/"), 5000);
      startAuthentication({ dispatch, login, logout, navigate });
      return setTimer(newTimer);
    } setDisabled(false)
  }, []);
  
  // Effect to handle the email verification process on component mount
  React.useEffect(() => {
    if(initLoading) return;
    setDisabled(true);
    setBtnLoading(true);
    setBtnText("Verifying...");
    const userId = searchParams.get('userId');
    const secret = searchParams.get('secret');
    const expire = searchParams.get('expire');
    if(userData?.emailVerification){
      return setErr("Email already verified");
    }
    
    if (userId && secret && !isVerificationExpired(expire)) {
      verification(userId, secret);
    } else if (userId && secret) {
      setErr("Verification link expired");
      setDisabled(false);
      setBtnLoading(false);
      setBtnText("Get new");
    } else {
      setErr("Verification link broken");
      setDisabled(false);
      setBtnLoading(false);
      setBtnText("Get new");
    }
  }, [searchParams,initLoading]);
  
  // Effect to handle error messages and cleanup timer
  React.useEffect(() => {
    if (err) {
      setSuccessMsg(null);
      toast.custom(<GenToast type="err">{err}</GenToast>); 
    }
    return () => clearTimeout(timer);
  }, [err]);
  
  // Effect to handle disabling of button based on fetching state
  React.useEffect(() => {
    if(userData?.emailVerification) return setDisabled(true);
  }, [initLoading]);

  React.useEffect(() => {
   setInitLoading(fetching);
  }, [fetching]);
  
  return (
    <div className='h-100vh w-full flex items-center justify-center' id={id + "email-verification-wrapper"}>
      <div className='w-fit h-fit flex items-center justify-start p-4vw flex-col border-2 rounded-3xl border-gray-200 dark:border-footer_text_light' id={id + "email-verification-cont"}>
        <div className='flex items-center flex-col' id={id + "email-verification-header"}>
          <img className='w-8vw' src={isDark ? "/icons/filogXgmail-dark.webp" : "/icons/filogXgmail-light.webp"} />
          <p className='text-1.7vw mt-0.5vw' id={id + "email-verification-heading"}>Email verification</p>
          <p className='text-0.5vw text-footer_text'>Verifying Your Email, You can request new link if it fails</p>
          {err && <FeedbackMessage err={err} className='mt-1vw'>{err}</FeedbackMessage>} 
          {successMsg && <FeedbackMessage err={false} className='mt-1vw'>{successMsg}</FeedbackMessage>}
        </div>
        <div className='flex gap-4 mt-2vw' id={id + "email-verification-buttons"}>
          <Button outline className='text-1.2vw' onClick={() => {
            clearTimeout(timer);
            navigate("/");
          }}>
            Do it later
          </Button>
          <Button primary={!disabled} disabled={disabled} loading={btnLoading} onClick={handleClick} className='text-1.2vw'>
            {btnText}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default EmailVerification;
