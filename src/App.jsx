import React from 'react';
import { AlertWrapper, Footer, InfinitePogressbar, Navbar } from './Components';
import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'material-symbols/outlined.css';

import { Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { login, logout, setFetching } from './store/authSlice';
import { setAlert } from './store/alertSlice';
import { useNavigate } from 'react-router-dom';
import startAuthentication from './utils/startAuthentication';


function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isUserLoggedIn, fetching,userData } = useSelector((state) => state.auth);


  React.useEffect(() => {

    if (isUserLoggedIn) {
      navigate("/dashboard",{replace:true});
      dispatch(setAlert({type:"welcome",message:`Welcome, ${userData.name}`}))

    } else {
      navigate("/",{replace:true});
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
      {fetching? <InfinitePogressbar /> : null}
      <Navbar />
      <AlertWrapper />
      <div className='min-h-56vh'>
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default App;
