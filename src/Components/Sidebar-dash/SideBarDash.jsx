import React from 'react'

function SideBarDash({contRef}) {
 const sideBar = React.useRef()
 const [topOffset, setTopOffset] = React.useState("")

 React.useEffect(() => {
    if (sideBar.current && contRef.current) {
        const topOffset =  contRef.current.clientHeight - sideBar.current.clientHeight
        setTopOffset(topOffset)
    }
  }, [sideBar.current?sideBar.current.clientHeight:null]);

  return (
    <div ref={sideBar} id='main-dashboard-sidebar-cont' className={`w-20p  h-fit sticky `} style={{top:`${topOffset}px`}}>
        <div className='h-100vh'>1</div>
      </div>
  )
}

export default SideBarDash