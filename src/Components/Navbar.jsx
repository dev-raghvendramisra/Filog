import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Logo, Search, ProfilePic } from './index'; // Assuming these are correctly exported from './index'

function Navbar() {
  const { isUserLoggedIn } = useSelector((state) => state.auth);

  const links = [
    {
      component: <Logo />,
      status: true,
      path: '/',
      name: "logo",
      activeStyling:false
    },
    {
      component: <Search />,
      status: isUserLoggedIn, 
      path: 'pd/dashboard/search',
      name: "search",
      activeStyling:false
    },
    {
      name: "Dashboard",
      status: true, 
      path: '/pd',
      activeStyling:true
    },
    {
      name: "Write",
      status: isUserLoggedIn, // 
      path: '/pw',
      activeStyling:true
    },
    {
      name: "About",
      status: true, //
      path: '/about',
      activeStyling:true
    },
    {
      name: "Login",
      status: !isUserLoggedIn, 
      path: '/login',
      activeStyling:true
    },
    {
      name: "SignUp",
      status: !isUserLoggedIn, //
      path: '/signup',
      activeStyling:true
    },
    {
      component: <ProfilePic />,
      status: isUserLoggedIn, // 
      path: 'pd/dashboard/user-profile',
      name: "profile-pic",
      activeStyling:true
    },
  ];

  return (
    <nav className='flex justify-center items-center'>
      {links.map((link) => (
        link.status ? (
          <NavLink className={({isActive})=>{
            if(link.activeStyling) return`${isActive?"dark:linkActiveDark linkActiveLight": ""
            }`}
          } key={link.name} to={link.path}>
            {link.component ? link.component : <span className='text-lg p-2'>{link.name}</span>}
          </NavLink>
        ) : null
      ))}
    </nav>
  );
}

export default Navbar;


//exxclude active stylings from logo and search 

