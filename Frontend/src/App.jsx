import React from 'react';
import { Footer, InfinitePogressbar, Navbar, GenToast, AlertModalContainer, FormModalContainer } from './components';
import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

import {  Outlet, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { startAuthentication } from './utils';
import toast,{Toaster} from 'react-hot-toast'
import usePlatformContext from './context/platformContext';
import TemporaryProhib from './pages/TemporaryProhib';


function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isUserLoggedIn, fetching,userData } = useSelector((state) => state.auth);
  const {pathname,search} = useLocation()
  const {setPlatformAsDesktop,setPlatformAsMobile,mobile} = usePlatformContext()
  
  
  React.useEffect(() => {
    const startLoginSequence = async () => {
      await startAuthentication({ dispatch,navigate});    
    };

    
    if (!isUserLoggedIn) {
      startLoginSequence();
    }
    if (isUserLoggedIn) {
      if(pathname=="/login" || pathname=="/signup" || pathname=="/"){
        navigate("/dashboard",{replace:true});
      }
      else navigate(`${pathname}${search && search}`)
      pathname=="/verify-email" || toast.custom(<GenToast type="greet">Welcome, {userData.fullName}</GenToast>);
    } 
    else {
      if(pathname=="/dashboard" || pathname=="/dashboard/featured" || pathname=="/dashboard/following" || pathname=="/write" || pathname=="/" || pathname=="/profile"){
        navigate("/",{replace:true});    
      }
      else navigate(`${pathname}${search && search}`)
    }
  }, [isUserLoggedIn]);

  const setPlatform = ()=>{
    if(window.innerWidth<576){
      setPlatformAsMobile()
      
    }
    else setPlatformAsDesktop()
    ;
  }
   
  React.useEffect(()=>{
    window.addEventListener('resize',setPlatform)
    setPlatform()
    return ()=>{
      window.removeEventListener('resize',setPlatform)
    }
  },[])

  if(mobile){
    return <TemporaryProhib />
  }

  return (
    <>
      {fetching? pathname=="/login" || pathname=="/signup"? <InfinitePogressbar className={`${pathname==""?"bg-opacity-0 dark:bg-opacity-0":""}`} /> : null:null}
      <AlertModalContainer />
      <FormModalContainer />
      { <Navbar /> }
      {/* //pathname=="/verify-email" && */}
      <Toaster toastOptions={{duration: 7000,}} containerStyle={{marginTop:`${pathname=="/verify-email"?"5%":"5%"}`}} />
      <div className='min-h-52vh'>
        <Outlet />
      </div>
      {pathname!=="/dashboard/featured" && pathname!=="/dashboard/following"?
      <Footer />
      :null
      }
    </>
  );
}

export default App;
