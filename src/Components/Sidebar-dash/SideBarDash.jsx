import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FollowingSecErr, FollowSuggestionsCard } from '../../Components';
import { getUsersUtil } from '../../utils';
import { Query } from 'appwrite';
import { setUsers, clearUsers } from '../../store/usersSlice';
import { updateFollowing } from '../../store/userProfileSlice';

function SideBarDash({ contRef }) {
  const sideBar = useRef();
  const suggestionCont = useRef(null);
  const [topOffset, setTopOffset] = useState("");
  const [initLoading, setInitLoading] = useState(true);
  const [sideBarLoading, setSideBarLoading] = useState(true);
  const [paginationLoad, setPaginationLoad] = useState(true);
  const [offset, setOffset] = useState(0);
  const [query, setQuery] = useState([]);
  const [limit, setLimit] = useState(10);
  const [errInFetching, setErrInFetching] = useState(false);
  const [fetching, setFetching] = React.useState(false)

  const userProfile = useSelector(state => state.userProfile);
  const suggestedUsers = useSelector(state => state.users);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchUsers = async () => {
    setFetching(true)
    setErrInFetching(false);
    const res = await getUsersUtil({ offset, limit, query, dispatch, clearUsers, setUsers });

    if (res.pagination && !res.ok) {
      setPaginationLoad(false);
    } else if (!res.ok) {
      setErrInFetching(true);
    }
    setFetching(false)
    suggestionCont.current.classList.add('overflow-scroll');
    setSideBarLoading(false);
  };

  const handlePagination = useCallback(() => {
    if (
      !fetching &&
      paginationLoad &&
      !sideBarLoading &&
      suggestionCont.current &&
      suggestionCont.current.clientHeight + suggestionCont.current.scrollTop + 1 > suggestionCont.current.scrollHeight
    ) {
      setOffset(prevOffset => limit === 3 ? prevOffset + 3 : prevOffset + 10);
      setLimit(3);
    }
  }, [paginationLoad, sideBarLoading, limit,fetching]);

  useEffect(() => {
    if (sideBar.current && contRef.current) {
      const topOffset = contRef.current.clientHeight - sideBar.current.clientHeight;
      setTopOffset(topOffset);
    }
  }, [contRef]);

  useEffect(() => {
    if (userProfile.$id !== "") {
      setInitLoading(false);
      const queries = userProfile.following.map(user => Query.notEqual("userId", [user]));
      setQuery([...queries, Query.notEqual("userId", [userProfile.userId])]);
    }
  }, [userProfile.$id]);

  useEffect(() => {
    if (!initLoading) {
      fetchUsers();
    }
  }, [initLoading, offset, limit]);

  useEffect(() => {
    const element = suggestionCont.current;
    element.addEventListener("scroll", handlePagination);

    return () => {
      element.removeEventListener("scroll", handlePagination);
    };
  }, [handlePagination]);


  return (
    <div
      ref={sideBar}
      id='main-dashboard-sidebar-cont'
      className='w-18p h-fit sticky py-1.8vw'
      style={{ top: `${topOffset}px` }}
    >
      <h1 className='font-medium text-1.2vw'>You may follow</h1>
      <div
        ref = {suggestionCont}
        id="sidebar-suggestion-cont"
        className='h-60vh bg-sate-200 overflow-hidden pb-1vw mt-1vw px-0 flex flex-col gap-4 hideScrollbar relative border-light-mode scrollScrim '
      > 
        {initLoading || sideBarLoading
          ? Array.from({ length: 7 }).map((_, index) => (
              <FollowSuggestionsCard loader key={index} />
            ))
          : errInFetching?
            <FollowingSecErr type="user"  classNameImg='h-14vw opacity-70 dark:opacity-80' classNameText='text-0.9vw w-80p '
            userErrMsg='No users found. Please try again later or adjust your search criteria.'/>
          :
           suggestedUsers.map((user)=>(
            <FollowSuggestionsCard
              key={user.profileId}
              navigate={navigate}
              userId={userProfile.userId}
              userProfileId={userProfile.$id}
              suggestedUser={user}
              following={userProfile.following}
              setFollowing={(following)=>{dispatch(updateFollowing(following))}}
            />
          ))}
          { !sideBarLoading && !errInFetching? paginationLoad?
           <FollowSuggestionsCard loader /> 
           :<p className='text-center'>Nothing more to display</p>
           :null
          }
      </div>
      <div id="footer-cont-sidebar" className='h-60vh'>footer</div>
    </div>
  );
}



export default SideBarDash;