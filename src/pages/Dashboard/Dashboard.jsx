import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getBlogPosts } from '../../utils';
import { PostCard, FollowingSecErr } from '../../Components';
import { clearBlogs, setBlogs } from '../../store/blogsSlice';
import { ID, Query } from 'appwrite';
import getUsersUtil from '../../utils/getUsersUtil';
import { clearUsers, setUsers } from '../../store/usersSlice';

function Dashboard() {
  const navigate = useNavigate()
  const [initLoading, setInitLoading] = React.useState(true);
  const [topOffset, setTopOffset] = React.useState(0);
  const [followingSectionErr,  setFollowingSectionErr] = React.useState(null)
  const tags = [React.useRef(), React.useRef()];
  const sideBar = React.useRef();
  const container = React.useRef();
  const dispatch = useDispatch();
  const { isUserLoggedIn, userData } = useSelector((state) => state.auth);
  const {following} = useSelector((state)=>state.userProfile)
  const posts = useSelector((state) => state.blogs);

  if (!isUserLoggedIn) {
    return <Navigate to="/login" />;
  }

  React.useEffect(() => {
    if (sideBar.current && container.current) {
        const topOffset =  container.current.clientHeight - sideBar.current.clientHeight
        setTopOffset(topOffset)
    }
    const evt = new Event("click",{bubbles:true})
    tags[0].current.dispatchEvent(evt)
  }, []);

  const handleClick = async ({ target }) => {
    setFollowingSectionErr(null)
    setInitLoading(true);
    tags.forEach(({ current }) => {
      current.classList.remove('btnActive');
    });
    target.classList.add('btnActive');

    const query = []
    if(target.id=="following-blogs"){
      following.length>0?query[0]=Query.equal("userId",[...following]):setFollowingSectionErr(following)
      dispatch(clearBlogs())
      setInitLoading(false);
      return;
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
      <div id='main-dashboard-posts-cont' className='h-fit w-50p  relative'>
        <div id='tag-container' className='h-fit flex text-1vw text-darkPrimary_grays dark:text-white dark:text-opacity-70 text-opacity-80 flex-start gap-6'>
          <button onClick={handleClick} ref={tags[0]} id='featured-blogs' className='px-1.5vw py-0.5vw rounded-full'>
            <i className='fa-solid fa-bolt mr-0.5vw'></i>
            Featured
          </button>
          <button onClick={handleClick} ref={tags[1]} id='following-blogs' className='px-1.5vw py-0.5vw rounded-full'>
            <i className='fa-solid fa-users mr-0.5vw'></i>
            Following
          </button>
        </div>
        
        <div id='main-post-cont' className='flex-col flex gap-8 py-2vw'>
          {initLoading
            ? Array.from({ length: 20 }, (i) => (
                <PostCard
                  key={ID.unique()}
                  classNamePostCardCont='flex-row w-fit gap-8'
                  classNamePostCardAuthorDateCont='mt-1vw'
                  loader
                />
              ))
            : followingSectionErr?
              <FollowingSecErr error={followingSectionErr} />:
             posts.map((post) => (
                <PostCard
                  onClick={()=>{
                    navigate(`/post/${post.postID}`)
                  }}
                  classNamePostCardCont='flex-row w-fit gap-8'
                  classNamePostCardAuthorDateCont='h-fit mt-1vw'
                  key={ID.unique()} 
                  title={post.title}
                  tags={post.tags}
                  coverImage={post.coverImg}
                  author={post.author}
                  authorImg={post.authorImg}
                  createdAt={post.createdAt}
                />
              ))}
        </div>
      </div>
      <div ref={sideBar} id='main-dashboard-sidebar-cont' className={`w-20p  h-fit sticky `} style={{top:`${topOffset}px`}}>
        <div className='h-100vh'>1</div>
        <div className='h-100vh'>2</div>
        <div className='h-100vh'>3</div>
      </div>
    </div>
  );
}

export default Dashboard;
