import React from 'react'
import EmailVerification from './EmailVerification'
import { getUserProfile, startAuthentication } from '../../utils'
import { useDispatch } from 'react-redux'
import { login, logout, setFetching } from '../../store/authSlice'
import { setProfile, clearProfile } from '../../store/userProfileSlice'
import { useNavigate } from 'react-router-dom'

function MagicUrlVerification() {
  const [verified, setVerified] = React.useState(false)
  const [userId, setUserId] = React.useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  React.useEffect(()=>{
    if(verified){
        getProfile()
    }
    async function getProfile(){
        const authRes = await startAuthentication({dispatch,login,logout,setFetching, navigate})
        console.log(authRes);
        
        if(authRes.code!==401){
           const profile = await getUserProfile({userId, setProfile, clearProfile, dispatch})
           console.log(profile);
           if(profile.ok){
            navigate("/")
           }
        }
    }
  },[verified])

  return (
    <EmailVerification setVerified={setVerified } verified={verified} setUserId={setUserId} type="magicUrlVerificaton" />
  )
}

export default MagicUrlVerification