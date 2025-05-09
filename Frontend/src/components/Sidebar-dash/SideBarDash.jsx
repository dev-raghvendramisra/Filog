import React, {  useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ErrorPlaceHolderImage, FollowSuggestionsCard, Footer, GenToast } from '../../components';
import { Query } from '../../services';
import { updateFollowing } from '../../store/userProfileSlice';
import useFetchUsers from '../../hooks/useFetch';
import { usePagination, useEmailAlertModal } from '../../hooks';
import { toast } from 'react-hot-toast';

function SideBarDash({ contRef }) {

  // Refs for sidebar and suggestions container
  const sideBar = useRef();
  const suggestionCont = useRef(null);

  // State variables
  const [topOffset, setTopOffset] = useState("");
  const [initLoading, setInitLoading] = useState(true);
  const [offset, setOffset] = useState(0);
  const [query, setQuery] = useState([]);
  const [limit, setLimit] = useState(10);
  
  

  
  // Redux state and dispatch
  const { following } = useSelector(state => ({
    following: state.userProfile.following,
    userProfileId: state.userProfile._id
  }), (prev, next) => prev.following === next.following && prev.userProfileId === next.userProfileId);
  
  const suggestedUsers = useSelector(state => state.users);
  const {userData} = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Custom hooks
  const setOpenAlert = useEmailAlertModal()
  const [sideBarLoading, paginationLoad, isFetching, errInFetching] = useFetchUsers({type:"user",initLoading,offset,limit,query,container:suggestionCont.current})
  const handlePagination = usePagination({paginationLoad,containerLoading:sideBarLoading, isFetching,container:suggestionCont.current,limit,setLimit,setOffset})



  // Set top offset for sidebar
  useEffect(() => {
    if (sideBar.current && contRef.current) {
      const topOffset = contRef.current.clientHeight - sideBar.current.clientHeight;
      setTopOffset(topOffset);
    }
  }, [contRef]);


  useEffect(() => {
    if (following!==null) {
      setInitLoading(false);
      const queries = new Query().$nin("userId",[userData._id,...following])
      setQuery(queries)
    }
  }, [following]);


  // Add scroll event listener for pagination
  useEffect(() => {
    const element = suggestionCont.current;
    element.addEventListener("scroll", handlePagination);

    return () => {
      element.removeEventListener("scroll", handlePagination);
    };
  }, [handlePagination]);


  return (
    <>
    <div
      ref={sideBar}
      id='main-dashboard-sidebar-cont'
      className='w-20p h-fit sticky py-1.8vw'
      style={{ top: `${topOffset}px` }}
    >
      <h1 className='font-medium text-1.2vw'>You may follow</h1>
      <div
        ref={suggestionCont}
        id="sidebar-suggestion-cont"
        className='max-h-60vh bg-sate-200 overflow-hidden pb-1vw mt-1vw px-0 flex flex-col gap-4 hideScrollbar relative border-light-mode scrollScrim'
      >
        {initLoading || sideBarLoading
          ? Array.from({ length: 7 }).map((_, index) => (
              <FollowSuggestionsCard loader key={index} />
            ))
          : errInFetching
            ? <ErrorPlaceHolderImage
                type="user"
                classNameImg='h-14vw opacity-70 dark:opacity-80'
                classNameText='text-0.9vw w-80p'
                userErrMsg='No users found. Please try again later or adjust your search criteria.'
              />
            : suggestedUsers.map((user) => (
                <FollowSuggestionsCard
                  key={user.profileId}
                  navigate={navigate}
                  userId={userData._id}
                  suggestedUser={user}
                  setFollowing={(type) => { dispatch(updateFollowing({type,val:user.userId})) }}
                  openAlert={()=>{
                    toast.custom(<GenToast type='err'>Please verify your email to follow users</GenToast>)
                    return setOpenAlert(true)
                  }}
                  userData={userData}
                  isSuggestedUserFilogVerified={user.isFilogVerified}
                />
              ))
        }
        { !sideBarLoading && !errInFetching && paginationLoad
          ? <FollowSuggestionsCard suggestionCont={suggestionCont} loader />
          : !sideBarLoading && !errInFetching
            ? <p className='text-center dark:text-footer_text_light text-footer_text'>Nothing more to display</p>
            : null
        }
      </div>
      <Footer
        classNameWrapper='p-1.2vw border-2 pt-0 dark:border-0 rounded-xl bg-lightPrimary_grays_darker dark:bg-darkPrimary_grays_darker mt-1vw'
        classNameUpperSec='flex-col'
        classNameAboutSec='w-100p'
        classNameQuickLinkSec='hidden'
        classNameForm='hidden'
        classNameEmail='mt-2vw'
        classNameEmailLink='pl-0.5vw text-0.9vw'
        classNameAboutText="text-0.9vw"
        classNameLogo='w-4vw'
        classNameCopyrightText='text-0.7vw pl-0'
        classNameLowerSec='justify-start'
        dashboardFooter
      />
    </div>
    </>
  );
}

export default SideBarDash;
