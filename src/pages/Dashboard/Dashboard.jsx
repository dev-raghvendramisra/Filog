import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getBlogPosts } from '../../utils';
import { clearBlogs, setBlogs } from '../../store/blogsSlice';
import { Query } from 'appwrite';
import { PostCont, SideBarDash } from '../../Components';

function Dashboard() {
  const [initLoading, setInitLoading] = React.useState(true);
  const [followingSectionErr, setFollowingSectionErr] = React.useState(null);
  const tags = [React.useRef(), React.useRef()];
  const container = React.useRef();
  const dispatch = useDispatch();
  const { isUserLoggedIn, userData } = useSelector((state) => state.auth);
  const userProfile = useSelector((state) => state.userProfile);
  const posts = useSelector((state) => state.blogs);

  if (!isUserLoggedIn) {
    return <Navigate to="/login" />;
  }

  React.useEffect(() => {
    const evt = new Event('click', { bubbles: true });
    tags[0].current.dispatchEvent(evt);
  }, []);

  const handleClick = async ({ target }) => {
    setInitLoading(true);
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
        setFollowingSectionErr(userProfile.following);//here following is empty this means user is not following anyone ,this is first type of following sec err
        dispatch(clearBlogs());
        setInitLoading(false);
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

    setFollowingSectionErr(res.ok ? null : userProfile.following);//here following is either null or an array with some length which determines the second type of following sec err
    setInitLoading(false);
  };

  return (
    <div ref={container} className="h-100vh overflow-y-scroll justify-center flex pt-10vh" id="main-dashboard-cont">
      <PostCont
        handleClick={handleClick}
        refs={tags}
        initLoading={initLoading}
        posts={posts}
        followingSectionErr={followingSectionErr}
      />
      <SideBarDash userData={userProfile} contRef={container} />
    </div>
  );
}

export default Dashboard;
