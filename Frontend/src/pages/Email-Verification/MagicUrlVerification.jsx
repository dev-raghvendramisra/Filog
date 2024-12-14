import React from 'react'
import { getUserProfile, startAuthentication } from '../../utils'
import { useDispatch, useSelector } from 'react-redux'
import { login, logout, setFetching } from '../../store/authSlice'
import { setProfile, clearProfile } from '../../store/userProfileSlice'
import { useNavigate, useSearchParams } from 'react-router-dom'
import useTheme from '../../context/themeContext'
import { FeedbackMessage, GenToast } from '../../components'
import toast, { LoaderIcon } from 'react-hot-toast'
import { authServices } from '../../services'
import { useResetPassModal } from '../../hooks'

function MagicUrlVerification() {
  const [successMsg, setSuccessMsg] = React.useState(false)
  const [err, setErr] = React.useState(false)
  const [verified, setVerified] = React.useState(false)
  const [verifying, setVerifying] = React.useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const errMsg = ["Invalid verification link", "Verification link expired"]
  
  const {isDark} = useTheme()
  const {userData, isFetching} = useSelector(state=>state.auth)
  const [searchParams] = useSearchParams()
  const openModal = useResetPassModal()

  React.useEffect(()=>{
     if(!verified){ 
     if(!isFetching){
       if(userData){
         setErr("You are already loggedIn");
       }
       else {const {isValid, userId, secret} = checkLinkIntegrity()
       if(isValid) startSequence(userId, secret);}
     }}
  },[isFetching,userData])


  function checkLinkIntegrity(){
    const userId = searchParams.get('userId');
    const secret = searchParams.get('secret');
    const expiry = searchParams.get('expire')
    if(userId && secret && expiry){
      const isValid = new Date().getTime()<expiry
      if(!isValid) setErr(errMsg[1])
      return {isValid, userId, secret};
    }
    else setErr("Link is broken");
    return {isValid :false, userId, secret};
  }

  async function verifySecret(userId, secret){
    const res = await authServices.verifyMagicUrl(userId,secret)
    if(res.ok){
      return res.res.jwt
    }
    if(res.code==400){
       setErr(errMsg[0])
       return false;
    }
    if(res.code==401){
       setErr(errMsg[1])
       return false;
    }
  }

  async function startSequence(userId,secret){
    setVerifying(true)
    const session_key = await verifySecret(userId, secret)
    if(session_key)  authServices.loginWithMagicUrl(session_key);
    else{
      return setVerifying(false)
    } 
    setSuccessMsg("Link verified successfully")
    setVerifying(false)
    setVerified(true)
    await startAuthentication({dispatch,login,logout,setFetching,navigate,read_writeAuthObj:false})
    await getUserProfile({userId,setProfile,clearProfile,dispatch})
    setTimeout(() => {
      openModal(true)
    }, 100);
  }

  React.useEffect(()=>{
     if(err) toast.custom(<GenToast type="err">{err}</GenToast>)
  },[err])

  React.useEffect(()=>{
     if(successMsg) toast.custom(<GenToast type="success">{successMsg}</GenToast>)
  },[successMsg])


  return (
    <div className='h-100vh w-full flex items-center justify-center' id={"email-verification-wrapper"}>
      <div className='w-fit h-fit flex items-center justify-start p-4vw flex-col ' id={"email-verification-cont"}>
        <div className='flex items-center flex-col' id={ "email-verification-header"}>
          <img  className='w-8vw' src={isDark ? "/icons/filogXgmail-dark.webp" : "/icons/filogXgmail-light.webp"} />
          <p className='text-1.7vw mt-0.5vw' id={"email-verification-heading"}>Secure Login</p>
          <p className='text-1vw text-footer_text flex-col flex items-center gap-3'>Verifying Your Email, You can request new link again if it fails
          {verifying && <LoaderIcon id="loader"/>        }
          </p>
          {err && <FeedbackMessage err={err} className='mt-1vw'>{err}</FeedbackMessage>} 
          {successMsg && <FeedbackMessage err={false} className='mt-1vw'>{successMsg}</FeedbackMessage>}
        </div>
      </div>
    </div>
  )
}

export default MagicUrlVerification