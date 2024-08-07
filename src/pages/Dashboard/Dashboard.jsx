import React from 'react';
import { Navigate, NavLink, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';


function Dashboard() {
  
  const {isUserLoggedIn} = useSelector((state)=>state.auth)
  const container = React.useRef(null)

  if (!isUserLoggedIn) {
    return <Navigate to="/login" />;
  }

  return (
    <div ref={container} className="min-h-100vh overflow-y-scroll justify-center flex pt-10vh" id="main-dashboard-cont">
   
     <div id="dashboard-post-section" className='w-50p py-1vw'>
      <div id="tag-container"
       className="h-fit flex text-1vw text-darkPrimary_grays dark:text-white dark:text-opacity-70 text-opacity-80 flex-start gap-3"
        >
          <NavLink to="./featured"
            id="featured-blogs"
            className={({isActive})=>`px-1.5vw py-0.5vw rounded-full hover:text-black hover:bg-slate-100 hover:dark:bg-blue-950 transition-all hover:dark:text-white ${isActive?"btnActive":""}`}
          >
            <i className="fa-solid fa-bolt mr-0.5vw"></i>
            Featured
          </NavLink>
          <NavLink to="./following"
            className={({isActive})=>`px-1.5vw py-0.5vw rounded-full hover:text-black hover:bg-slate-100 hover:dark:bg-blue-950 transition-all hover:dark:text-white ${isActive?"btnActive":""}`}
          >
            <i className="fa-solid fa-users mr-0.5vw"></i>
            Following
          </NavLink>
      </div>
      <Outlet />
     </div>
     {/* <SideBarDash initLoading={initLoading} userData={userProfile} sideBarLoading={sideBarLoading} suggestedUsers={users} contRef={container} /> */}
    
    </div>
  );
}

export default Dashboard;

{/* <PostCont
handleClick={handleClick}
refs={tags}
initLoading={initLoading}
posts={posts}
dashboardErr={dashboardErr}
query={query}
setDashboardErr = {setDashboardErr}
/> */}