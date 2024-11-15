export default function authErrHandler({res, dispatch, navigate, setEmail, setPass, setName, setErr, errMsg = [], setResCode, verification=false, setTimer, timer}) {
    const errMsgMap = {
        400:errMsg[0] || "Invalid request!",
        401: errMsg[0] || "Invalid credentials!",
        429:  errMsg[2] || "Too many attempts. Please try again later!",
        409: "An account already exists with the same email!",
        500: "Internal server error, Please try again later!",
        503: "Service unavailable, Please try again later!",
    };

    const handleResetAndRedirect = () => {
        setEmail && dispatch(setEmail(""));
        setPass && dispatch(setPass(""));
        setName && dispatch(setName(""));
        navigate("/");
    };
    
    if (errMsgMap[res.code]) {
        setErr(errMsgMap[res.code]);
        setResCode && setResCode(res.code);

        if ([429, 500, 503].includes(res.code)) {
            setTimer && clearTimeout(timer)
            const newTimer = setTimeout(handleResetAndRedirect, 7000);
            setTimer && setTimer(newTimer);
        } else if (res.code === 409 && verification) {
            setTimer && clearTimeout(timer)
            const newTimer = setTimeout(handleResetAndRedirect, 7000);
            setTimer && setTimer(newTimer);
        }

        return true;
    }

    return false;
}
