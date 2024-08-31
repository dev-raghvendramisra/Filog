import React from 'react';
import { Footer, InfinitePogressbar, Navbar, GenToast } from './components';
import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';


import { Outlet, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { login, logout, setFetching } from './store/authSlice';
import { useNavigate } from 'react-router-dom';
import { startAuthentication } from './utils';
import toast,{Toaster} from 'react-hot-toast'
import { clearProfile, setProfile } from './store/userProfileSlice';
import getUserProfile from './utils/getUserProfile';


function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isUserLoggedIn, fetching,userData } = useSelector((state) => state.auth);
  const {pathname,search} = useLocation()
  
  
  React.useEffect(() => {
    const startLoginSequence = async () => {
      console.log("Authenticating user...");
      const res = await startAuthentication({ dispatch, login, logout, setFetching ,navigate});     
     if(res.$id){
       await getUserProfile({dispatch,setProfile,clearProfile,userId:res.$id})
     } 
    };

    if (!isUserLoggedIn) {
      startLoginSequence();
    }
    if (isUserLoggedIn) {
      if(pathname=="/login" || pathname=="/signup" || pathname=="/"){
        navigate("/dashboard",{replace:true});
      }
      else navigate(`${pathname}${search && search}`)
      pathname=="/verify-email" || toast.custom(<GenToast type="greet">Welcome, {userData.name}</GenToast>);
    } 
    else {
      if(pathname=="/dashboard" || pathname=="/dashboard/featured" || pathname=="/dashboard/following" || pathname=="/write" || pathname=="/" || pathname=="/profile"){
        navigate("/",{replace:true});    
      }
      else navigate(`${pathname}${search && search}`)
    }
  }, [isUserLoggedIn]);


  return (
    <>
      {fetching? pathname=="/login" || pathname=="/signup"? <InfinitePogressbar className={`${pathname==""?"bg-opacity-0 dark:bg-opacity-0":""}`} /> : null:null}
      { <Navbar /> }
      {/* //pathname=="/verify-email" && */}
      <Toaster toastOptions={{duration: 7000,}} containerStyle={{marginTop:`${pathname=="/verify-email"?"5%":"5%"}`}} />
      <div className='min-h-56vh'>
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
