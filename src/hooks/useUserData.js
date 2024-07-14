import { useState, useEffect } from "react";
import {authServices} from '../backend-services'
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../store/authSlice";

const useUserData = () => {
    const dispatch = useDispatch();
    const { isLoginInitiated } = useSelector((state) => state.auth);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            setLoading(true);
            try {
                const res = await authServices.getLoggedInUser();
                if (res.email) {
                    dispatch(login(res));
                } else {
                    dispatch(logout());
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
                dispatch(logout()); // Handle error scenario, logout user
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [ isLoginInitiated]);

    return { loading };
};

export default useUserData;
