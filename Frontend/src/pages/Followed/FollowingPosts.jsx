import React from 'react'
import {PostCont} from '../../components'
import { useSelector } from 'react-redux';
import { useFetch as useFetchPosts , usePagination } from '../../hooks';
import { Query } from '../../services';

function FollowedPosts() {
    const [initLoading, setInitLoading] = React.useState(true);
    const [offset,setOffset] = React.useState(0);
    const [limit,setLimit] = React.useState(5);
    const [query,setQuery] = React.useState([]);
    const [err, setErr] = React.useState(null);

    const following = useSelector(state=>state.userProfile.following);
    const posts = useSelector(state=>state.blogs);
    let container;
  
    const [containerLoading, paginationLoad, isFetching] = useFetchPosts({initLoading,
      type:"post",
      offset,
      limit,
      query,
      setErr,
      following,
      id:"main-dashboard-cont"
    })

  const handlePagination = usePagination({
    paginationLoad,
    id:"main-dashboard-cont",
    containerLoading,
    isFetching,
    limit,
    setLimit,
    setOffset
  })

   React.useEffect(()=>{
      if(following!==null){
        setInitLoading(false);
        setQuery(new Query().$in("userId",following))
     }
   },[following])


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
      postLoading={containerLoading} 
      dashboardErr={err}
       />
    )
  }

  export default FollowedPosts