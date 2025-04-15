import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { authServices } from '../../services';
import useTheme from '../../context/themeContext';
import { Button, FeedbackMessage, GenToast } from '../../components';
import toast from 'react-hot-toast';
;
import { useDispatch, useSelector } from 'react-redux';

function EmailVerification() {
  // State hooks for handling error, success message, and various other states
  const [searchParams] = useSearchParams();
  const [err, setErr] = React.useState(null);
  const [successMsg, setSuccessMsg] = React.useState(null);
  const [disabled, setDisabled] = React.useState(true); 
  const [btnLoading, setBtnLoading] = React.useState(false);
  
  // Redux and other hooks
  const { isUserLoggedIn, userData, fetching } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const id = nanoid(24);
  
  // Error messages
  const errMsg = {401:"Invalid verification link", 410:"Verification link expired",500:"Internal server error"}
  async function startSequence(){
    
    const isValid = validation()
    setBtnLoading(true)
    if(!isValid){
      return ;
    }
    const res = await authServices.verifyEmailVerifcation(isValid.token)
    if(res.code==200){
      setSuccessMsg("Email verified successfully")
    }
    else{
      if(res.code!==500) {
        setDisabled(false)
      }
      else setTimeout(()=>navigate("/"),1200)
      setErr(errMsg[res.code])
    }
    setBtnLoading(false)
  }
 
  function validation(){
   const expiry = searchParams.get("expire")
   const token = searchParams.get("secret")

   if(expiry && token){
      if(userData.emailVerification){
       setErr("Email already verified")
       setTimeout(()=>navigate("/"),1200)
       return false
     }
      else if(Date.now()>=Number(expiry)){
        setErr("Token expired")
        setDisabled(false)
        return false
      }
      return {expiry , token}
   }
  }
  
  async function handleClick() {
    setBtnLoading(true)
    setDisabled(true)
    const res  = await authServices.createEmailVerification()
    if(res.code!==200){
      setErr(res.message)
      setTimeout(()=>navigate("/"),1200)
    }
    else {
      setSuccessMsg(res.message)
    }
    setBtnLoading(false)
  }
  useEffect(()=>{
    if(fetching){
      return;
    }
    if(!isUserLoggedIn){
      return setErr("You need to be logged in to verify")
    }
    startSequence()

  },[isUserLoggedIn,fetching])

  
  useEffect(()=>{
    if(successMsg){
      setErr(null)
      toast.custom(<GenToast type="success">{successMsg}</GenToast>)
      setTimeout(()=>navigate("/"),1200)
    }
  },[successMsg])

  useEffect(()=>{
    if(err){
      setSuccessMsg(null)
      toast.custom(<GenToast type="err">{err}</GenToast>)
    }
  },[err])
  
  return (
    <div className='h-100vh w-full flex items-center justify-center' id={id + "email-verification-wrapper"}>
      <div className='w-fit h-fit flex items-center justify-start p-4vw flex-col border-2 rounded-3xl border-gray-200 dark:border-footer_text_light' id={id + "email-verification-cont"}>
        <div className='flex items-center flex-col' id={id + "email-verification-header"}>
          <img  className='w-8vw' src={isDark ? "/icons/filogXgmail-dark.webp" : "/icons/filogXgmail-light.webp"} />
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
            Get new
          </Button>
        </div>
      </div>
    </div>
  );
}

export default EmailVerification;


