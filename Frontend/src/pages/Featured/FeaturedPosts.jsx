import React from 'react';
import { PostCont } from '../../components';
import { useSelector } from 'react-redux';
import { Query } from 'appwrite';
import {useFetch as useFetchPosts, usePagination} from '../../hooks';


function FeaturedPosts() {
    const posts = useSelector(state => state.blogs);
    const userId = useSelector(state => state.userProfile.userId)
    const [offset, setOffset] = React.useState(0);
    const [limit, setLimit] = React.useState(5);
    const [initLoading, setInitLoading] = React.useState(true);
    const [query , setQuery] = React.useState([])

    let container;
    
    const [containerLoading, paginationLoad, isFetching] = useFetchPosts({
        type:"post",
        initLoading,
        offset,
        limit,
        query,
        container:document.getElementById("main-dashboard-cont"),
        })
    
    const handlePagination = usePagination({
        paginationLoad,
        containerLoading,
        isFetching, 
        limit,
        setLimit,
        setOffset, 
        container:document.getElementById("main-dashboard-cont")})
    
    
    
    React.useEffect(() => {
        container = document.getElementById("main-dashboard-cont");
        container.addEventListener("scroll", handlePagination);
        return () => {
            container.removeEventListener("scroll", handlePagination);
        };
    }, [handlePagination]);
    
                    
    React.useEffect(() => {
        if (userId !== "") {
            setInitLoading(false);
            setQuery([Query.notEqual("userId", [userId])]);
        }
    }, [userId]);



    
    return (
        <PostCont
            initLoading={initLoading}
            posts={posts}
            paginationLoad={paginationLoad}
            postLoading={containerLoading}
        />
    );
}

export default FeaturedPosts;
