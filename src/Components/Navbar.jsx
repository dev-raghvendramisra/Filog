import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Logo, SearchBar, ProfilePic, ToggleBtn } from './index'; 
import LoginBtn from './LoginBtn';



function Navbar({className='',style={},...props}) {
  const { isUserLoggedIn } = useSelector((state) => state.auth);

  const links = [
    {
      name: "Dashboard",
      status: true, 
      path: '/pd',
      activeStyling:true,
      hoverAnim:true,
      defaultStyling:true
    },
    {
      name: "Write",
      status: true, // 
      path: '/pw',
      activeStyling:true,
      hoverAnim:true,
      defaultStyling:true,
      icon:<i style={{marginRight:"0.3vw"}} class=" fa-regular fa-pen-to-square"></i>
    },
    {
      name: "About",
      status: true, //
      path: '/about',
      activeStyling:true,
      hoverAnim:true,
      defaultStyling:true
    },
    {
      name: "Github",
      status: true, 
      path: 'https://github.com/dev-raghvendramisra',
      activeStyling:true,
      hoverAnim:true,
      defaultStyling:true
    },
    {
      component:<LoginBtn  >Login</LoginBtn>,
      name: "Login",
      status: !isUserLoggedIn, 
      path: '/login',
      activeStyling:true,
      border:true,
      hoverAnim:true,
      defaultStyling:true,
    },
    {
      component: <ProfilePic />,
      status: isUserLoggedIn, // 
      path: 'pd/dashboard/user-profile',
      name: "profile-pic",
      activeStyling:false,
      defaultStyling:false,
    },
  ];

  return (
   <div className={`flex w-screen justify-center items-center fixed${className}`} style={{top:"2vh",...style}}{...props}>
    <nav style={{padding:"0.7vw 0"}} className='flex justify-between items-center w-80vw p-0.5vw  bg-white outline outline-1 outline-gray-300 rounded-full backdrop-blur-lg cShadow  ' id="mainNav">
            
           
            <div id="wrapper_logo_searchbar " className='rounded-full pl-1vw w-40p h-100p flex justify-between items-center'>
              <NavLink  className="block w-24p h-100p">
               <Logo />
              </NavLink>
              <SearchBar id="search-bar" className='text-1vw pl-1vw pr-1vw w-100p' />
            </div>

            <div id="wrapper_links_profile" className='flex w-50p gap-4 justify-end pr-1vw items-center'>

                  {links.map((link)=>{
                    return (
                     <NavLink to={link.path} key={link.name} id={`link_to_"${link.name}"`} 
                     className={({isActive})=>{
                      return(
                        `transition-all 
                        ${link.defaultStyling?"flex justify-center items-center text-1vw overflow-hidden rounded-full text-blackColor p-0.4vw pl-1vw pr-1vw":""} 
                        ${link.activeStyling?isActive?"linkActiveLight dark:linkActiveDark relative after:h-100p after:w-100p after:top-0 after:left-0 after:inset-0 after:bg-primary after:-z-10 after:absolute":"":""} 
                        ${link.hoverAnim?"hover:hoverAnim":""} 
                        ${link.border?" border-2 border-opacity-25 border-primary":""}`
                      )
                     }}>
                      { link.status?(
                          link.component?(
                          <div className=' justify-center items-center gap-1'>
                          {link.icon}
                          {link.component}
                          </div>)
                          :(
                          <div className=' justify-center items-center gap-1'>
                          {link.icon}
                          <span>{link.name}</span>
                          </div>))
                          :(null)
                      }
                     </NavLink>
                    )
                  })}

          <ToggleBtn>
          <i style={{fontSize:"0.5vw"}} class=" fa-solid fa-moon"></i>
          </ToggleBtn>
            </div>

         </nav>

         </div>
         
  );
}

export default Navbar;



