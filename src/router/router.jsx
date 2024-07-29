import {   Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import App from "../App";
import {Write,About, SearchResult, Dashboard, Login, SignUp, UserProfile, Home}  from "../Components";

const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<App />}>
        <Route path="" element={<Home />}></Route>
        <Route path="/dashboard" element={< Dashboard />}>
          <Route path="user-profile" element={<UserProfile />}></Route>
        </Route>
        <Route path="/write" element={< Write />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/search/:query" element={<SearchResult />}></Route>
    </Route>
))

export default router;



