import React from 'react'
import { NavLink } from 'react-router-dom'
import useLinks from '../../hooks/useLinks'
import { Logo } from '../../Components'


function Footer() {

  const links = useLinks()

  return (
    <div className=' h-30vh w-100p' id="main-footer-wrapper">
      <div id='footer-upper-section' className='flex gap-10 bg-lightPrimary_grays dark:bg-darkPrimary_grays_darker justify-center items-start pt-1vw pb-1vw'>
        <div id='footer-about-section' className='w-20p text-0.7vw' >
          <p id="footer-about-heading" className='text-0.9vw'><strong>About</strong></p>
          <p id='footer-about-content' className='font-extralight text-footer_text_light dark:text-footer_text leading-6 pt-0.5vw'>
            Filog is a dynamic blogging platform empowering writers and readers. Our mission is to provide a space for engaging articles, story sharing, and community connection.Join us and be part of a community that values creativity, knowledge, and the power of words.
          </p>
          <p id="footer-email" className='pt-0.5vw text-0.9vw'>
            <strong className=''>Email</strong> : <NavLink to="mailto:teamfilog@gmail.com" className="text-footer_text_light dark:text-footer_text text-0.7vw hover:underline underline-offset-4">teamfilog@gmail.com</NavLink>
          </p>
        </div>
        <div id="footer-quicklink-section" className='w-20p'>
          <p id="footer-quicklink-heading"><strong>Quick links</strong></p>
          <div id="footer-link-wrapper" className='flex flex-col text-footer_text_light dark:text-footer_text gap-2 pt-0.8vw text-0.7vw'>
            {links.map((link) => (link.status ? <NavLink className='hover:underline underline-offset-4' key={link.name} id={`link to: ${link.name}`} to={link.path} >{link.name}</ NavLink> : null))}
          </div>
        </div>
        {/* {add the form for email subscription} */}
      </div>
      <div id='footer-lower-section' className='flex justify-center items-center pt-1vw pb-1vw  bg-lightPrimary_grays dark:bg-darkPrimary_grays_darker border-t-footer_text border-opacity-50 dark:border-opacity-100 dark:border-t-darkPrimary_grays border-t-2'>
        <div>
          < Logo logoClass='maskLogoFooter' footerLogoStylings='dark:bg-white bg-darkPrimary_grays_darker' className='h-2vw w-6vw' />
          <p id="footer-copyright-text" className='pl-0.5vw text-footer_text_light dark:text-footer_text'>© Filog 2024. All Rights Reserved.</p>
        </div>
      </div>
    </div>
  )
}

export default Footer