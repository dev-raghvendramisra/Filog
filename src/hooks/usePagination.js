import React from 'react'


export default function usePagination ({paginationLoad, containerLoading,container, isFetching, limit, setLimit, setOffset, id}) {
    container = id?document.getElementById(id):container

    return React.useCallback(() => {
        if (
            paginationLoad &&
            !containerLoading &&
            !isFetching &&
        container.clientHeight + container.scrollTop + 1 > container.scrollHeight
    ) {
        setOffset(prevOffset => limit+prevOffset);
        setLimit(3);
    }
    }, [paginationLoad, containerLoading, isFetching, limit]);
}