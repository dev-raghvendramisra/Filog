import React from 'react';
import { NavLink } from 'react-router-dom';
import { Logo, SearchBar, ToggleBtn } from '../index'; 
import useLinks from '../../hooks/useLinks';
import { useSelector } from 'react-redux';

export default function Navbar({className='',style={},...props}) {
   const links = useLinks()
   const {isUserLoggedIn} = useSelector((state)=>state.auth)

  

  return (
   <div className={`flex  z-50 justify-center items-center sticky top-0 ${className}`} style={{top:"2vh",...style}}{...props}>
    <nav style={{padding:"0.7vw 0"}} className='transition-all flex justify-between items-center w-80vw p-0.5vw  bg-white outline outline-1 outline-gray-300 rounded-full backdrop-blur-lg nav_light_Shadow dark:nav_dark_Shadow bg-opacity-50 dark:bg-darkPrimary_grays dark:outline-darkPrimary dark:outline-4 dark:bg-opacity-50' id="mainNav">
            
           
            <div id="wrapper_logo_searchbar " className='rounded-full pl-1vw w-40p h-100p flex justify-between items-center'>
              <NavLink to={isUserLoggedIn?"/dashboard":"/"} className="block w-24p h-100p">
               <Logo navLogoStyling='bg-primary dark:bg-white'/>
              </NavLink>
              <SearchBar id="search-bar" className_input='text-1vw pl-1vw pr-1vw w-100p dark:bg-darkPrimary_grays_darker dark:text-lightPrimary_grays'className_icon='dark:bg-darkPrimary_grays_darker text-0.9vw' />
            </div>

            <div id="wrapper_links_profile" className='flex w-50p gap-4 justify-end pr-1vw items-center'>

                  {links.map((link)=>{
                    return (
                      link.status?
                       <NavLink to={link.path} key={link.name} id={`link_to_"${link.name}"`} 
                       className={({isActive})=>{
                         return(
                          `transition-all 
                          ${link.defaultStyling?"flex justify-center items-center text-1vw overflow-hidden rounded-full text-blackColor p-0.4vw pl-1vw pr-1vw dark:text-lightPrimary_grays_darker ":""} 
                          ${link.activeStyling?isActive?"linkActiveLight dark:linkActiveDark relative after:h-100p after:w-100p after:top-0 after:left-0 after:inset-0 after:bg-primary after:-z-10 after:absolute":"":""} 
                          ${link.hoverAnim?isActive?"":"hover:hoverAnim ":""} 
                          ${link.border?isActive?"border-primary border-2":" border-2 border-opacity-100 dark:border-lightPrimary_grays border-darkPrimary_grays":""}`
                        )
                       }}>
                       { 
                          link.component?(
                          <div className=' justify-center items-center gap-1'>
                          {link.icon}
                          {link.component}
                          </div>)
                          :(
                          <div className=' justify-center items-center gap-1'>
                          {link.icon}
                          <span>{link.name}</span>
                          </div>)
                          
                      }
                       </NavLink>
                      :null
                    )
                  })}

          <ToggleBtn className='ml-1vw'>
          <i style={{fontSize:"0.5vw"}} className=" fa-solid fa-moon text-black"></i>
          </ToggleBtn>
            </div>

         </nav>

         </div>
         
  );
}




