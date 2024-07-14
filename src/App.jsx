import React from "react";
import {  useSelector , useDispatch} from "react-redux";
import "./App.css";
import { authServices } from "./backend-services";
import useUserData from "./hooks/useUserData";
import { iniateLoginSequence } from "./store/authSlice";

function App() {

  const userData = useSelector((state) => {
    return state.auth;
  });

  const {loading} = useUserData();
  const dispatch = useDispatch()

  const setAccount = async () => {
    const res = await authServices.createAccount({
      email: "itsraghav12@gmail.com",
      password: "raghav12",
      name: "Raghvendra Misra",
    });
    console.log("res:", res);
    dispatch(iniateLoginSequence())
    return res;
  };

  const logoutUser = async()=>{
    const res = await authServices.logout();
    console.log(res)
    dispatch(iniateLoginSequence())
  }

///--------jsx to test backend-services (temp)-----

  if (loading) return <h1>Loading....</h1>;
  else if (userData.isUserLoggedIn) {
    return (
     <div className="h-screen w-screen flex justify-center items-center bg-blue-900">
         <div className=" rounded-xl bg-white drop-shadow-xl flex flex-col p-2">
               <div className="p-3 mt-2 border-md border-gray-500 rounded-xl flex justify-center items-center gap-2"><span>Have user logged in</span><span className="p-3 bg-blue-600 rounded-xl text-white">Yes</span></div>
               <div className="p-3 mt-2 border-md border-gray-500 rounded-xl flex justify-center items-center gap-2"><span>Username</span><span className="p-3 bg-blue-600 rounded-xl text-white">{userData.userData.name}</span></div>
               <div className="p-3 mt-2 border-md border-gray-500 rounded-xl flex justify-center items-center gap-2"><span>Email address</span><span className="p-3 bg-blue-600 rounded-xl text-white">{userData.userData.email}</span></div>
         <button className="text-center p-2 bg-blue-600 text-white rounded-full" onClick={logoutUser}>Logout</button>
         </div>
     </div>
    );
  } else {
    return (
      <div>
        <h1>isUserLoggedIn: {String(userData.isUserLoggedIn)}</h1>
        <button onClick={setAccount}>Login</button>
      </div>
    )
  }
}

export default App;
