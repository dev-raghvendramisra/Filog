export default function authErrHandler({res, errMsg = []}) {
    const errMsgMap = {
        400:errMsg[0] || "Invalid request!",
        401: errMsg[0] || "Invalid credentials!",
        429:  errMsg[2] || "Too many attempts. Please try again later!",
        404:"No account found with this email!",
        409: "An account already exists with the same email!",
        500: "Internal server error, Please try again later!",
        503: "Service unavailable, Please try again later!",
    };

    
    if (errMsgMap[res.code]) {
        return {occured:true, errMsg: errMsgMap[res.code]};
    }

    return {occured:false};
}
