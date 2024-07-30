import React from 'react';
import { Footer, InfinitePogressbar, Navbar } from './Components';
import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'material-symbols/outlined.css';

import { Outlet, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { login, logout, setFetching } from './store/authSlice';
import { useNavigate } from 'react-router-dom';
import startAuthentication from './utils/startAuthentication';
import toast,{Toaster} from 'react-hot-toast'


function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isUserLoggedIn, fetching,userData } = useSelector((state) => state.auth);
  const {pathname} = useLocation()
  

  React.useEffect(() => {

    if (isUserLoggedIn) {
      if(pathname=="/login" || pathname=="/signup" || pathname=="/"){
        navigate("/dashboard",{replace:true});
      }
      else navigate(pathname)
      // dispatch(setAlert({type:"welcome",message:`Welcome, ${userData.name}`}))
      toast(`Welcome, ${userData.name}`, {
        icon: '👋',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
    } 
    else {
      if(pathname=="/dashboard" || pathname=="/write" || pathname=="/"){
        navigate("/",{replace:true});
      }
      else navigate(pathname)
    }

    const startLoginSequence = async () => {
      const res = await startAuthentication({ dispatch, login, logout, setFetching });
    };

    if (!isUserLoggedIn) {
      startLoginSequence();
    }
  }, [isUserLoggedIn]);


  return (
    <>
      {fetching? <InfinitePogressbar className={`${pathname==""?"bg-opacity-0 dark:bg-opacity-0":""}`} /> : null}
      <Navbar />
      <Toaster containerStyle={{marginTop:"5%"}} />
      <div className='min-h-56vh'>
        <Outlet />
      </div>
      {pathname=="/login" || pathname=="/signup" || pathname=="/about"?
      <Footer />
      :null
      }
    </>
  );
}

export default App;
