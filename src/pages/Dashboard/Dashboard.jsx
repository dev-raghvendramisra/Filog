import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getBlogPosts, getUsersUtil } from '../../utils';
import { clearBlogs, setBlogs } from '../../store/blogsSlice';
import { Query } from 'appwrite';
import { PostCont, SideBarDash } from '../../Components';
import {setUsers, clearUsers} from '../../store/usersSlice'

function Dashboard() {
  const [initLoading, setInitLoading] = React.useState(true);
  const [postLoading, setPostLoading] = React.useState(true);
  const [sideBarLoading, setSideBarLoading] = React.useState(true);
  const [followingSectionErr, setFollowingSectionErr] = React.useState(null);
  const tags = [React.useRef(), React.useRef()];
  const container = React.useRef();
  const dispatch = useDispatch();
  const { isUserLoggedIn, userData } = useSelector((state) => state.auth);
  const userProfile = useSelector((state) => state.userProfile);
  const posts = useSelector((state) => state.blogs);
  const users = useSelector((state)=>state.users)

  React.useEffect(() => {
    if(!isUserLoggedIn) return
    if(userProfile.$id!==""){
      setInitLoading(false)
      const evt = new Event('click', { bubbles: true });
      tags[0].current.dispatchEvent(evt);
    }
  }, [userProfile.$id]);


  React.useEffect(()=>{
    const fetchUsers = async(query)=>{
        if(users.length<0)setSideBarLoading(true)
        const res = await getUsersUtil({userId:userProfile.userId,query:query,dispatch,setUsers,clearUsers})
        setSideBarLoading(false)
    }
    
    if(userProfile.$id){
      const query = userProfile.following.map((user)=>{
       return Query.notEqual("userId",[user])
      })
      fetchUsers(query)
    }
  },[userProfile.following])

  const handleClick = async ({ target }) => {
    setPostLoading(true);
    tags.forEach(({ current }) => {
      current.classList.remove('btnActive');
    });

    const activeTarget = target.tagName === 'I' ? target.parentElement : target;
    activeTarget.classList.add('btnActive');

    const query = [];
    if (activeTarget.id === 'following-blogs') {
      if (userProfile.following.length > 0) {
        query.push(Query.equal('userId', userProfile.following));
      } else {
        setFollowingSectionErr("user");//here following is empty this means user is not following anyone ,this is first type of following sec err
        dispatch(clearBlogs());
        setPostLoading(false);
        return;
      }
    }

    const res = await getBlogPosts({
      userId: userData.$id,
      dispatch: dispatch,
      setBlogs: setBlogs,
      clearBlogs: clearBlogs,
      query: query,
    });

    

    setFollowingSectionErr(res.ok ? null : "post");//here following is either null or an array with some length which determines the second type of following sec err
    setPostLoading(false);
  };



  if (!isUserLoggedIn) {
    return <Navigate to="/login" />;
  }
  return (
    <div ref={container} className="h-100vh overflow-y-scroll justify-center flex pt-10vh" id="main-dashboard-cont">
      <PostCont
        handleClick={handleClick}
        refs={tags}
        initLoading={initLoading}
        posts={posts}
        followingSectionErr={followingSectionErr}
        postLoading={postLoading}
      />
      <SideBarDash initLoading={initLoading} userData={userProfile} sideBarLoading={sideBarLoading} suggestedUsers={users} contRef={container} />
    </div>
  );
}

export default Dashboard;
