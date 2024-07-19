import React from "react";
import linkConfig from '../Conf/linkConf';
import { useSelector } from "react-redux";

export default function useLinks() {
    const [links, setLinks] = React.useState(linkConfig);

    const { isUserLoggedIn } = useSelector((state) => state.auth);

    React.useEffect(() => {
        const updatedLinks = links.map(link => {
            if (link.isRestricted) {
                return {
                    ...link,
                    status: link.restrictedForAuthUsers ? !isUserLoggedIn : isUserLoggedIn
                };
            }
            return link;
        });
        setLinks(updatedLinks);
    }, [isUserLoggedIn]);

    return links;
}
