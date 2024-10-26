import React from 'react'
import { useSelector } from 'react-redux'
import ProfilePic from '../ProfilePic/ProfilePic'
import { Dropdown } from '../../components'
import { authServices } from '../../services'
import { useNavigate } from 'react-router-dom'
import { useAlertModal, useAvatarFormModal } from '../../hooks'
import { ID } from 'appwrite'
import useTheme from '../../context/themeContext'





function ProfileNavlink() {
  const { userAvatar } = useSelector(state => state.userProfile)
  const [openDropDown, setOpenDropDown] = React.useState(false)
  const [timer, setTimer] = React.useState(null)
  const [alertId] = React.useState(ID.unique())
  const navigate = useNavigate()
  const openAvatarModal = useAvatarFormModal()
  const { isDark, setIsDark } = useTheme()
  const openLogoutAlert = useAlertModal({
    ctaDanger: true,
    heading: "Logout",
    message: "You are about to log out of your account. Any unsaved changes will be lost. Are you sure you want to proceed?", primaryBtnText: "Logout",
    secondaryBtnText: "Cancel",
    modalId: alertId,
    primaryHandler: async () => {
      try {
        await authServices.logout()
        location.reload()
      } catch (error) {
        console.error("Logout failed:", error)
        // Optionally show an alert to the user
      }
    }
  })

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
        openAvatarModal(true)
      }
    },
    {
      icon: <i className={`${isDark ? "fa-solid fa-sun" : "fa-solid fa-moon"}`}></i>,
      text: `${isDark ? "Enable Light Mode" : "Enable Dark Mode"}`,
      onClick: () => {
        setIsDark(prev => !prev)
      }
    },
    {
      icon: <i className="fa-solid fa-arrow-right-from-bracket"></i>,
      text: "Logout",
      onClick: () => openLogoutAlert(true),
      danger: true
    }
  ]

  React.useEffect(() => {

    if (isDark) {
      localStorage.setItem("isDark", true)
    }
    else if (!isDark) {
      localStorage.setItem("isDark", false)
    }
  }, [isDark])

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
