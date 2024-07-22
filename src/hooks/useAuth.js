import { useState, useEffect } from "react";
import {authServices} from '../backend-services'
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../store/authSlice";

const useAuth = () => {
    const dispatch = useDispatch();
    const { isLoginInitiated } = useSelector((state) => state.auth);
    const [loading, setLoading] = useState(true);
    const [err, setErr]  = useState("")
    

    useEffect(() => {
        const fetchUserData = async () => {
            setLoading(true);
            try {
                const res = await authServices.getLoggedInUser();
                if (res.email) {
                    dispatch(login(res));
                } else {
                    dispatch(logout());
                    setErr(res)
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
                dispatch(logout());
                setErr(error) // Handle error scenario, logout user
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [ isLoginInitiated]);

    return { loading,err };
};

export default useAuth;
