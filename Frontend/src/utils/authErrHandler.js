export default function authErrHandler({res, dispatch, navigate, setEmail, setPass, setName, setErr, errMsg = [], setResCode, verification=false}) {
    const errMsgMap = {
        401: errMsg[0] || "Invalid credentials!",
        429: "Too many attempts. Please try again later!",
        409: errMsg[1] || "An account already exists with the same email!",
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
            setTimeout(handleResetAndRedirect, 7000);
        } else if (res.code === 409 && verification) {
            setTimeout(() => navigate("/"), 7000);
        }

        return true;
    }

    return false;
}
