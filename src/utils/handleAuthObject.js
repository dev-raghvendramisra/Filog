import { authServices } from "../backend-services";
import CryptoJS from 'crypto-js';
import conf from "../Conf/conf";

export default function handleAuthObject({ read = false, write = false, clear = false, name }) {
    const authObjAccessKey = conf.authObjKey; 
    const authObj = localStorage.getItem("authObj");
    const EXPIRY_DATE_MS = 30 * 24 * 60 * 60 * 1000; // 30 days in milliseconds
    const CRR_DATE_MS = new Date().getTime();

    if (authObj && read) {
        const objectToVerify = JSON.parse(authObj);
        try {
            if (CRR_DATE_MS >= objectToVerify.expiryDateMs) {
                localStorage.removeItem(authObj);
                authServices.logout();
                return false;
            } 
            else if (objectToVerify.authStatus) {
                const decryptedBytes = CryptoJS.AES.decrypt(objectToVerify.authStatus, authObjAccessKey);
                const decryptedStatus = decryptedBytes.toString(CryptoJS.enc.Utf8);
                return decryptedStatus === '1';
            } 
            else {
                return false;
            }
        } catch (error) {
            localStorage.removeItem("authObj");
            authServices.logout()
            return false 
        }
    } else if (write) {
        const authObject = {
            authStatus: CryptoJS.AES.encrypt('1', authObjAccessKey).toString(),
            name: name,
            expiryDateMs: CRR_DATE_MS + EXPIRY_DATE_MS
        };
        localStorage.setItem("authObj", JSON.stringify(authObject));
        return true;
    } else if (clear) {
        localStorage.removeItem("authObj");
        return true;
    } else {
        const appwriteLocalStorageFallback = localStorage.getItem("cookieFallback")
        if(appwriteLocalStorageFallback){
            authServices.logout()
        }
        
        return false;
    }
}
