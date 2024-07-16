import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Logo, SearchBar, ProfilePic } from './index'; 
import LoginBtn from './LoginBtn';

function Navbar() {
  const { isUserLoggedIn } = useSelector((state) => state.auth);

  const links = [
    {
      name: "Dashboard",
      status: true, 
      path: '/pd',
      activeStyling:true,
      hoverAnim:true
    },
    {
      name: "Write",
      status: true, // 
      path: '/pw',
      activeStyling:true,
      hoverAnim:true
    },
    {
      name: "About",
      status: true, //
      path: '/about',
      activeStyling:true,
      hoverAnim:true
    },
    {
      name: "Github",
      status: true, 
      path: 'https://github.com/dev-raghvendramisra',
      activeStyling:true,
      hoverAnim:true
    },
    {
      component:<LoginBtn className='p-2 text-md'>Login</LoginBtn>,
      name: "Login",
      status: !isUserLoggedIn, 
      path: '/login',
      activeStyling:true,
      border:true,
      hoverAnim:true
    },
    {
      component: <ProfilePic />,
      status: isUserLoggedIn, // 
      path: 'pd/dashboard/user-profile',
      name: "profile-pic",
      activeStyling:false
    },
  ];

  return (
    <nav className='flex justify-between items-center gap-28 bg-white bg-opacity-50 border-2 border-gray-200 rounded-full p-1 pl-8 pr-8 backdrop-blur-xl'>
      <div className='flex gap-10 items-center justify-center'>
      <NavLink to="/">
         <Logo />
      </NavLink>
      <SearchBar className='pl-5 pr-5 '/>
      </div>
      <div className='flex gap-3'>
      {links.map((link) => (
        link.status ? (
          <div key={link.name} className={`flex items-center overflow-hidden rounded-full ${link.border?"border-primary border-opacity-35 border-2 rounded-full":""} ${link.hoverAnim?" hover:hoverAnim overflow-hidden":""}`}>
            <NavLink className={({isActive})=>{
            if(link.activeStyling) return` transition-all pr-2 pl-2 rounded-full flex items-center justify-center dark:text-white ${isActive?"dark:linkActiveDark linkActiveLight": ""
            }`}
          }  to={link.path}>
            {link.component ? link.component : <span className='text-md p-2'>{link.name}</span>}
          </NavLink>
          </div>
        ) : null
      ))}
      </div>
    </nav>
  );
}

export default Navbar;


//exxclude active stylings from logo and search 

