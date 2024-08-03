import React from 'react'
import {FollowSuggestionsCard} from "../../Components"
import { useSelector } from 'react-redux'

function SideBarDash({contRef,userData}) {
 const sideBar = React.useRef()
 const [topOffset, setTopOffset] = React.useState("")

 React.useEffect(() => {
    if (sideBar.current && contRef.current) {
        const topOffset =  contRef.current.clientHeight - sideBar.current.clientHeight
        setTopOffset(topOffset)
    }
  }, [sideBar.current?sideBar.current.clientHeight:null]);

  return (
    <div ref={sideBar} id='main-dashboard-sidebar-cont' className={`w-22p  h-fit sticky border-white border-2 py-1.5vw`} style={{top:`${topOffset}px`}}>
        <h1 className='bg-blue-600 text-1.2vw'>You may follow</h1>
        <div id="sidebar-suggestion-cont" className='h-60vh bg-sate-200  overflow-scroll py-1vw px-0 '>
          <FollowSuggestionsCard userId={userData.userId} userProfileId={userData.$id} suggestedUser={{userName:"Raghvendra Misra", userAvatar:`${userData.userAvatar}`}} />
        </div>
        <div id="footer-cont-sidebar" className='h-60vh'></div>
      </div>
  )
}

export default SideBarDash