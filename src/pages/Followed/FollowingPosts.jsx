import React from 'react'
import {PostCont} from '../../Components'
import { useSelector } from 'react-redux';
import { getBlogPosts } from '../../utils';
import { setBlogs,clearBlogs } from '../../store/blogsSlice';
import { useDispatch } from 'react-redux';
import { Query } from 'appwrite';

function FollowedPosts() {
  const [paginationLoad, setPaginationLoad] = React.useState(true);
  const [initLoading, setInitLoading] = React.useState(true);
  const [postLoading, setPostLoading] = React.useState(true)
  const [offset,setOffset] = React.useState(0);
  const [limit,setLimit] = React.useState(10);
  const [query,setQuery] = React.useState([]);
  const [err, setErr] = React.useState(null);
  const [fetching, setFetching] = React.useState(false)
  const userProfile = useSelector(state=>state.userProfile);
  const posts = useSelector(state=>state.blogs);
  const dispatch = useDispatch();
  let container;
  

  const fetchPosts = async() =>{
    if(!userProfile.following.length){
      setErr("user")
      setPaginationLoad(false)
      return;
    }
    setFetching(true);
    setErr(null)
    const res = await getBlogPosts({query,limit,offset,dispatch,setBlogs,clearBlogs})
    if(res.pagination && !res.ok){
      setPaginationLoad(false)
    }
    else if(!res.ok){
      setErr("post")
      setPaginationLoad(false)
    }
    setFetching(false)
    setPostLoading(false);
  }

  const handlePagination = React.useCallback(() =>{
    if(
      paginationLoad &&
      !postLoading &&
      !fetching &&
      container.clientHeight + container.scrollTop + 1 > container.scrollHeight
    ){
      setOffset(prev=>limit==3?prev+3:prev+10)
      setLimit(3)
    }
  },[fetching,paginationLoad,postLoading])

  React.useEffect(()=>{
    if(userProfile.$id!==""){
      setInitLoading(false);
      setQuery([Query.equal("userId",userProfile.following)])
      console.log(query);
      
    }
  },[userProfile.$id])


  React.useEffect(()=>{
    if(!initLoading){//--------
      fetchPosts()
    }
  },[initLoading,offset,limit])


  React.useEffect(()=>{
   container = document.getElementById("main-dashboard-cont")
   container.addEventListener("scroll",handlePagination)
   return () =>{
    container.removeEventListener("scroll",handlePagination)
   }
  },[handlePagination])


  return (
    <PostCont
    initLoading={initLoading}
    posts={posts}
    paginationLoad={paginationLoad}
    postLoading={postLoading} 
    dashboardErr={err}
     />
  )
}

export default FollowedPosts