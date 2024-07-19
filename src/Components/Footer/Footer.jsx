import React from 'react'
import { NavLink } from 'react-router-dom'
import useLinks from '../../hooks/useLinks'


function Footer() {

  const links = useLinks()

  return (
    <div className='bg-darkPrimary_grays_darker h-30vh '>
     <div>
      <div id='footer-about-section'>
        <p id="footer-about-heading"><strong>About</strong></p>
        <p id='footer-about-content'>
        Filog is a dynamic blogging platform designed to empower writers and readers alike. Our mission is to provide a space where users can create engaging articles, share their stories, and connect with a community of like-minded individuals. Whether you're an avid blogger, a curious reader, or someone looking to share your unique perspective, Filog offers the tools and audience to amplify your voice. Join us today and be part of a growing community that values creativity, knowledge, and the power of words.
        </p>
        <p id="footer-email">
          <strong>Email</strong> : <NavLink to="mailto:teamfilog@gmail.com">teamfilog@gmail.com</NavLink>
        </p>
      </div>
      <div id="footer-quicklink-section">
        {links.map((link)=>(link.status?<NavLink key={link.name} id={`link to: ${link.name}`} to={link.path} >{link.name}</NavLink>:null))}
      </div>
     </div>
    </div>
  )
}

export default Footer