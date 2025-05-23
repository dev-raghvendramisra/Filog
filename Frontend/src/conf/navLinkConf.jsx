import React from 'react';
import LoginBtn from '../components/Button/LoginBtn.jsx';
import  ProfileNavlink from '../components/Profile-navlink/ProfileNavlink.jsx';
import Notification from '../components/Notification/Notification.jsx';

// Link configuration with components directly included
const linkConfig = [
    {
        name: "Dashboard",
        status:true,
        path: '/dashboard',
        activeStyling: true,
        hoverAnim: true,
        defaultStyling: true,
        isRestricted: false,
        selfNavigate: false
    },
    {
        name: "Write",
        path: '/write',
        status:true,
        activeStyling: true,
        hoverAnim: true,
        defaultStyling: true,
        icon: <span style={{ marginRight: "0.3vw" }} className="fa-regular fa-pen-to-square"></span>,
        isRestricted: false,
        selfNavigate: false
    },
    {
        name: "Privacy Policy",
        path: '/privacy-policy',
        status:true,
        activeStyling: true,
        hoverAnim: true,
        defaultStyling: true,
        isRestricted: false,
        selfNavigate: false
    },
    {
        name: "Github",
        status:true,
        path: 'https://github.com/dev-raghvendramisra',
        activeStyling: true,
        hoverAnim: true,
        defaultStyling: true,
        isRestricted: false,
        selfNavigate: false
    },
    {
        component: <LoginBtn>Login</LoginBtn>,
        name: "Login",
        status: false,
        path: '/login',
        activeStyling: true,
        border: true,
        hoverAnim: true,
        defaultStyling: true,
        isRestricted: true,
        restrictedForAuthUsers: true,
        selfNavigate: false
    },
    {
        component:<Notification />,
        name: "Notification",
        status: false,
        activeStyling: false,
        defaultStyling: false,
        isRestricted: true,
        restrictedForAuthUsers: false,
        selfNavigate: true
    },
    {
        component: <ProfileNavlink />,
        status: false,
        name: "profile-pic",
        activeStyling: false,
        defaultStyling: false,
        isRestricted: true,
        restrictedForAuthUsers: false,
        selfNavigate: true
    }
];

export default linkConfig;
