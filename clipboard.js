import React from 'react';
import { FollowingSecErr, FollowSuggestionsCard } from "../../Components";
import { useSelector } from 'react-redux';
import { getUsersUtil } from '../../utils';
import { Query } from 'appwrite';
import {setUsers,clearUsers} from '../../store/usersSlice'
import { useDispatch } from 'react-redux';



function SideBarDash({ contRef }) {
  const sideBar = React.useRef();
  const [topOffset, setTopOffset] = React.useState("");
  const userProfile = useSelector(state=>state.userProfile);
  const suggestedUsers = useSelector(state=>state.users);
  const [initLoading, setInitLoading] = React.useState(true);
  const [sideBarLoading, setSideBarLoading] = React.useState(true);
  const [following, setFollowing] = React.useState([]);
  const [offset, setOffset] = React.useState(0);
  const dispatch = useDispatch()
  const [contHeight,setContHeight] = React.useState(true)
  
  const query = []


  const fetchUsers = async()=>{
    const res = await getUsersUtil({offset,limit:10,query,dispatch,clearUsers,setUsers})
    setSideBarLoading(false);
    setContHeight((prev)=>!prev)
  }








  React.useEffect(() => {
    if (sideBar.current && contRef.current) {
      const topOffset = contRef.current.clientHeight - sideBar.current.clientHeight;
      setTopOffset(topOffset);
    }
  }, [contRef, sideBar, contHeight]);


  React.useEffect(()=>{
     
    if(userProfile.$id!==""){
      setInitLoading(false)
      setFollowing(userProfile.following)
      const queries = userProfile.following.map(user=>Query.notEqual("userId",[user]))
      query.push(Query.notEqual("userId",[userProfile.userId]),...queries)
    }

  },[userProfile.$id])

  React.useEffect(()=>{
    if(!initLoading){
      fetchUsers()
    }
  },[initLoading])






  return (
    <div
      ref={sideBar}
      id='main-dashboard-sidebar-cont'
      className='w-18p h-fit sticky py-1.8vw border-2 border-white'
      style={{ top: `${topOffset}px` }}
    >
      <h1 className='font-medium text-1.2vw'>You may follow</h1>
      <div
        id="sidebar-suggestion-cont"
        className='h-60vh bg-sate-200 overflow-scroll pb-1vw mt-1vw px-0 flex flex-col gap-6 hideScrollbar relative border-light-mode scrollScrim '
      > 
        {initLoading || sideBarLoading
          ? Array.from({ length: 7 }).map((_, index) => (
              <FollowSuggestionsCard loader key={index} />
            ))
          : suggestedUsers.length==0?
            <FollowingSecErr type="user"  classNameImg='h-14vw opacity-70 dark:opacity-80' classNameText='text-0.9vw w-80p '
            userErrMsg='No users found. Please try again later or adjust your search criteria.'/>
          :
           suggestedUsers.map((user)=>(
            <FollowSuggestionsCard
              key={user.profileId}
              userId={userProfile.userId}
              userProfileId={userProfile.$id}
              suggestedUser={user}
              following={following}
              setFollowing={setFollowing}
            />
          ))}
      </div>
      <div id="footer-cont-sidebar" className='h-60vh'>footer</div>
    </div>
  );
}



export default SideBarDash;



import React from 'react';
import { Navigate, NavLink, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {SideBarDash} from '../../Components'


function Dashboard() {
  
  const {isUserLoggedIn} = useSelector((state)=>state.auth)
  const container = React.useRef(null)

  if (!isUserLoggedIn) {
    return <Navigate to="/login" />;
  }

  return (
    <div ref={container} className=" relative h-100vh overflow-y-scroll justify-center flex pt-10vh" id="main-dashboard-cont">
   
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
      <SideBarDash contRef={container} /> 
    
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



import React from 'react';
import { PostCont } from '../../Components';
import { useSelector, useDispatch } from 'react-redux';
import { getBlogPosts } from '../../utils';
import { setBlogs, clearBlogs } from '../../store/blogsSlice';
import { Query } from 'appwrite';

function FeaturedPosts() {
    const posts = useSelector(state => state.blogs);
    const userProfile = useSelector(state => state.userProfile);
    
    const [paginationLoad, setPaginationLoad] = React.useState(true);
    const [postLoading, setPostLoading] = React.useState(true);
    const [offset, setOffset] = React.useState(0);
    const [initLoading, setInitLoading] = React.useState(true);
    
    const dispatch = useDispatch();
    const query = [];
    
    const paginationLoadRef = React.useRef(paginationLoad);
    const postLoadingRef = React.useRef(postLoading);
    const isFetching = React.useRef(false);

    const handlePagination = () => {
        if (
            paginationLoadRef.current &&
            !postLoadingRef.current &&
            !isFetching.current &&
            document.getElementById("main-dashboard-cont").
            clientHeight + document.getElementById("main-dashboard-cont").
            scrollTop + 1 > document.getElementById("main-dashboard-cont").scrollHeight
        ) {
            setOffset(prevOffset => prevOffset + 10);
        }
    };

    const fetchPosts = async (offset) => {
        isFetching.current = true;
        const res = await getBlogPosts({
            query,
            limit: 10,
            offset,
            dispatch,
            clearBlogs,
            setBlogs
        });
        if (!res.ok) {
            setPaginationLoad(false);
        }
        setPostLoading(false);
        isFetching.current = false;
    };

    React.useEffect(() => {
        if (!initLoading) {
            query.push(Query.notEqual("userId", [userProfile.userId]));
            fetchPosts(offset);
        }
    }, [initLoading, offset]);

    React.useEffect(() => {
        if (userProfile.$id !== "") {
            setInitLoading(false);
        }
    }, [userProfile.$id]);

    React.useEffect(() => {
        document.getElementById("main-dashboard-cont").addEventListener("scroll", handlePagination);
        return () => {
            document.getElementById("main-dashboard-cont").removeEventListener("scroll", handlePagination);
        };
    }, []);

    React.useEffect(() => {
        paginationLoadRef.current = paginationLoad;
        postLoadingRef.current = postLoading;
    }, [paginationLoad, postLoading]);


    

    return (
        <PostCont
            initLoading={initLoading}
            posts={posts}
            paginationLoad={paginationLoad}
            postLoading={postLoading}
        />
    );
}

export default FeaturedPosts;
