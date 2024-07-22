import React from 'react';
import LoginBtn from '../Components/Button/LoginBtn.jsx';
import ProfilePic from '../Components/ProfilePic/ProfilePic.jsx';

// Link configuration with components directly included
const linkConfig = [
    {
        name: "Dashboard",
        status:true,
        path: '/pd/dashboard',
        activeStyling: true,
        hoverAnim: true,
        defaultStyling: true,
        isRestricted: false
    },
    {
        name: "Write",
        path: '/pw/write',
        status:true,
        activeStyling: true,
        hoverAnim: true,
        defaultStyling: true,
        icon: <span style={{ marginRight: "0.3vw" }} className="fa-regular fa-pen-to-square"></span>,
        isRestricted: false
    },
    {
        name: "About",
        path: '/about',
        status:true,
        activeStyling: true,
        hoverAnim: true,
        defaultStyling: true,
        isRestricted: false
    },
    {
        name: "Github",
        status:true,
        path: 'https://github.com/dev-raghvendramisra',
        activeStyling: true,
        hoverAnim: true,
        defaultStyling: true,
        isRestricted: false
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
        restrictedForAuthUsers: true
    },
    {
        component: <ProfilePic />,
        status: false,
        path: 'pd/dashboard/user-profile',
        name: "profile-pic",
        activeStyling: false,
        defaultStyling: false,
        isRestricted: true,
        restrictedForAuthUsers: false
    }
];

export default linkConfig;
