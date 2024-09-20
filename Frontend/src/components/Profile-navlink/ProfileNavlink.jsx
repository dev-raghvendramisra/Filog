import React from 'react'
import { useSelector } from 'react-redux'
import ProfilePic from '../ProfilePic/ProfilePic'
import { Dropdown } from '../../components'
import { authServices } from '../../services'
import { useNavigate } from 'react-router-dom'

function ProfileNavlink() {
  const { userAvatar } = useSelector(state => state.userProfile)
  const [openDropDown, setOpenDropDown] = React.useState(false)
  const [timer, setTimer] = React.useState(null)
  const navigate = useNavigate()
  
  const options = [
    { 
      icon: <i className="fa-solid fa-user"></i>, 
      text: "Account", 
      onClick: () => navigate("/profile") 
    },
    { 
      icon: <i className="fa-solid fa-image-portrait"></i>, 
      text: "Change Avatar", 
      onClick: () => {
        // Implement avatar change functionality here
      } 
    },
    { 
      icon: <i className="fa-solid fa-arrow-right-from-bracket"></i>, 
      text: "Logout", 
      onClick: async () => { 
        try {
          await authServices.logout()
          location.reload()
        } catch (error) {
          console.error("Logout failed:", error)
          // Optionally show an alert to the user
        }
      }, 
      danger: true 
    }
  ]

  return (
    <div className='relative cursor-pointer' 
      onMouseEnter={() => {
        timer && clearTimeout(timer)
        setOpenDropDown(true)
        setTimer(null)
      }}
      onMouseLeave={() => {
        clearTimeout(timer)
        const newTimer = setTimeout(() => setOpenDropDown(false), 200)
        setTimer(newTimer)
      }}
    >
      <ProfilePic src={userAvatar} onClick={() => navigate("/profile")} />
      
      <Dropdown 
        onMouseEnter={() => setOpenDropDown(true)}
        onMouseLeave={() => setOpenDropDown(false)} 
        setOpenDropdown={setOpenDropDown} 
        className={`absolute top-100p transition-all mt-30p right-0 z-20 drop-shadow-2xl border-2 dark:border-footer_text rounded-2xl rounded-tr-none rounded-tl-none dark:border-t-0 dark:border-opacity-0 overflow-hidden whitespace-nowrap h-fit dark:bg-darkPrimary_grays ${openDropDown ? "opacity-100 pointer-events-all" : "opacity-0 pointer-events-none"}`} 
        style={{ fontSize: "1vw" }}
        role="menu"
        aria-expanded={openDropDown}
        aria-haspopup="true"
      >
        {options}
      </Dropdown>
    </div>
  )
}

export default ProfileNavlink
