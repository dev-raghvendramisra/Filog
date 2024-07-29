import React, { useRef } from 'react'
import { NavLink } from 'react-router-dom'
import useLinks from '../../hooks/useLinks'
import { Button, Form, Input, Logo } from '../../Components'


function Footer() {

  const links = useLinks()
  const ref = useRef()
  const [val, setVal] = React.useState("")
  const [errMsg, setErrMsg] = React.useState("")

  const handleChange = ({target})=>{
    setVal(target.value)
    setErrMsg("")
  }

  const handleSubmit = ()=>{
     
  }

  return (
    <div className=' w-100p' id="main-footer-wrapper">
      <div id='footer-upper-section' className='flex gap-16 bg-lightPrimary_grays_darker dark:bg-darkPrimary_grays_darker justify-center items-start pt-2vw pb-2vw'>
        <div id='footer-about-section' className='w-20p text-0.7vw' >
          <p id="footer-about-heading" className='text-0.9vw'><strong>About</strong></p>
          <p id='footer-about-content' className='font-normal text-footer_text_light dark:text-footer_text leading-6 pt-0.5vw '>
            Filog is a dynamic blogging platform empowering writers and readers. Our mission is to provide a space for engaging articles, story sharing, and community connection.Join us and be part of a community that values creativity, knowledge, and the power of words.
          </p>
          <p id="footer-email" className='pt-0.5vw text-0.9vw'>
            <strong className=''>Email</strong> : 
            <NavLink to="mailto:teamfilog@gmail.com" className="text-footer_text_light dark:text-footer_text text-0.7vw hover:underline underline-offset-4">
              teamfilog@gmail.com
            </NavLink>
          </p>
        </div>
        <div id="footer-quicklink-section" className='w-8p'>
          <p id="footer-quicklink-heading"><strong>Quick links</strong></p>
          <div id="footer-link-wrapper" className='flex flex-col text-footer_text_light dark:text-footer_text gap-2 pt-0.8vw text-0.7vw'>
            {links.map((link) => (link.status ? <NavLink className='hover:underline underline-offset-4' key={link.name} id={`link to: ${link.name}`} to={link.path} >{link.name}</ NavLink> : null))}
          </div>
        </div>
        <form id="footer-form" onSubmit={handleSubmit} className="bg-white w-20p self-center rounded-2xl pb-1vw pt-1vw dark:bg-darkPrimary_grays">
            <p id="heading" className='text-center text-1.2vw font-semibold' style={{}}>Weekly updates</p>
            <p id="sub-heading" className='text-center text-0.2vw mb-1vw text-footer_text_light'>Get blog articles and offers via email</p>
            <Input 
            errMsg={errMsg} 
            placeholder="email@example.com" 
            value={val} 
            onChange={handleChange} 
            ref={ref} 
            type="email" 
            fill={true} 
            className_container="w-90p h-2vw rounded-xl ml-auto mr-auto dark:bg-darkPrimary_grays_darker" className_input_prot_el_wrapper="w-70p" className_icon_cont="w-14p" className_icon="text-1.1vw" className_pass_icon_replacement="w-14p" errClassName="justify-center" />
            <Button primary className='w-90p ml-auto mr-auto bg-opacity-80 border-opacity-70'>
               Subscribe
            </Button>
        </form>
      </div>
      <div id='footer-lower-section' className='flex justify-center items-center pt-1vw pb-1vw  bg-lightPrimary_grays_darker dark:bg-darkPrimary_grays_darker border-t-footer_text border-opacity-20 dark:border-opacity-100 dark:border-t-darkPrimary_grays border-t-2'>
        <div>
          < Logo logoClass='maskLogoFooter' footerLogoStylings='dark:bg-white bg-darkPrimary_grays_darker' className='h-2vw w-6vw' />
          <p id="footer-copyright-text" className='pl-0.5vw text-footer_text_light dark:text-footer_text'>© Filog 2024. All Rights Reserved.</p>
        </div>
      </div>
    </div>
  )
}

export default Footer