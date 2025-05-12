import {   Navigate, Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import App from "../App";
import {Write,About, SearchResult, Dashboard, Login, SignUp, UserProfile,MagicUrlVerification, Profile, Home, Blog, FeaturedPosts, FollowingPosts, UnknownRoute, EmailVerification}  from "../components";
import PlaygroundProtection from "../pages/PlaygroundProtection";
import AdminProt from "../pages/Admin/AdminProt";
import PrivacyPolicy from "../pages/Privacy-Policy/PrivacyPolicy";
import TermsOfService from "../pages/Privacy-Policy/TermsOfService";

const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<App />}>
    <Route path="" element={<Home />}></Route>
    <Route path="/dashboard" element={<Dashboard />}>
      <Route path="" element={<Navigate to="featured" />} /> {/* Redirect to FeaturedPosts by default */}
      <Route path="featured" element={<FeaturedPosts />}></Route>
      <Route path="following" element={<FollowingPosts />}></Route>
    </Route>
    <Route path="/profile" element={<Profile />}></Route>
    <Route path="/write" element={<Write />}></Route>
    <Route path="/user/:userId" element={<UserProfile />}></Route>
    <Route path="/login" element={<Login />}></Route>
    <Route path="/signup" element={<SignUp />}></Route>
    <Route path="/about" element={<About />}></Route>
    <Route path="/blog/:blogID" element={<Blog />}></Route>
    <Route path="/search/:query" element={<SearchResult />}></Route>
    <Route path="/verify-email" element={<EmailVerification />}></Route>
    <Route path="/reset-password" element={<MagicUrlVerification />}></Route>
    <Route path="/admin" element={<AdminProt />}></Route>
    <Route path="/playground" element={<PlaygroundProtection />}></Route>{/* This is a test route */}
    <Route path="/privacy-policy" element={<PrivacyPolicy />}></Route>
    <Route path="/terms-of-service" element={<TermsOfService />}></Route>
    <Route path="*" element={<UnknownRoute />}></Route>
  </Route>
))

export default router;



