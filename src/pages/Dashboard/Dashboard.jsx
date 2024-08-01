import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getBlogPosts } from '../../utils';
import { clearBlogs, setBlogs } from '../../store/blogsSlice';
import { Query } from 'appwrite';
import { PostCont, SideBarDash } from '../../Components';

function Dashboard() {
  const [initLoading, setInitLoading] = React.useState(true);
  const [followingSectionErr,  setFollowingSectionErr] = React.useState(null)
  const tags = [React.useRef(), React.useRef()];
  const container = React.useRef();
  const dispatch = useDispatch();
  const { isUserLoggedIn, userData } = useSelector((state) => state.auth);
  const {following} = useSelector((state)=>state.userProfile)
  const posts = useSelector((state) => state.blogs);

  if (!isUserLoggedIn) {
    return <Navigate to="/login" />;
  }

  React.useEffect(() => {
    const evt = new Event("click",{bubbles:true})
    tags[0].current.dispatchEvent(evt)
  }, []);

  const handleClick = async ({ target }) => {
    setFollowingSectionErr(null)
    setInitLoading(true);
    tags.forEach(({ current }) => {
      current.classList.remove('btnActive');
    });

    target.tagName=="I"?target.parentElement.classList.add('btnActive'):target.classList.add('btnActive');

    const query = []
    if(target.id=="following-blogs" || target.parentElement.id=="following-blogs"){
      if(following.length>0)query[0]=Query.equal("userId",[...following])
      else{ 
       setFollowingSectionErr(following)
       dispatch(clearBlogs())
       setInitLoading(false);
       return;
      }
    }
    const {res} = await getBlogPosts({
      userId: userData.$id,
      dispatch: dispatch,
      setBlogs: setBlogs,
      clearBlogs: clearBlogs,
      query:query
    });
    res.message==""?setFollowingSectionErr([res.message]):null
    setInitLoading(false);
  };

  return (
    <div ref={container} className='h-100vh overflow-y-scroll justify-center flex pt-10vh' id='main-dashboard-cont'>
      <PostCont
      handleClick={handleClick}
      refs={tags}
      initLoading={initLoading}
      posts={posts}
      followingSectionErr={followingSectionErr}
       />
      <SideBarDash contRef={container}/>
    </div>
  );
}

export default Dashboard;
