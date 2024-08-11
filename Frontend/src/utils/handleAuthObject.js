import CryptoJS from 'crypto-js';
import conf from "../Conf/conf";
import { authServices } from '../backend-services';

const generateSignature = (data, key) => {
    return CryptoJS.HmacSHA256(data, key).toString();
};

const verifySignature = (data, signature, key) => {
    const expectedSignature = generateSignature(data, key);
    return expectedSignature === signature;
};

export default function handleAuthObject({ read = false, write = false, clear = false, name }) {
    const authObjAccessKey = conf.authObjKey; 
    const authObj = localStorage.getItem("authObj");
    const EXPIRY_DATE_MS = 30 * 24 * 60 * 60 * 1000; // 30 days in milliseconds
    const CRR_DATE_MS = new Date().getTime();
    const signatureKey = conf.signatureKey; // Add your signature key here

    if (authObj && read) {
        const objectToVerify = JSON.parse(authObj);
        try {
            if (CRR_DATE_MS >= objectToVerify.expiryDateMs) {
                localStorage.removeItem("authObj");
                authServices.logout();
                return false;
            } 
            else if (objectToVerify.authStatus) {
                const decryptedBytes = CryptoJS.AES.decrypt(objectToVerify.authStatus, authObjAccessKey);
                const decryptedObject = JSON.parse(decryptedBytes.toString(CryptoJS.enc.Utf8));
                const { name: decryptedName, signature } = decryptedObject;

                if (verifySignature(decryptedName, signature, signatureKey)) {
                    return decryptedName;
                } else {
                    return false;
                }
            } 
            else {
                return false;
            }
        } catch (error) {
            localStorage.removeItem("authObj");
            authServices.logout();
            return false; 
        }
    } 
    else if (write) {
        const signature = generateSignature(name, signatureKey);
        const authObject = {
            authStatus: CryptoJS.AES.encrypt(JSON.stringify({ name, signature }), authObjAccessKey).toString(),
            expiryDateMs: CRR_DATE_MS + EXPIRY_DATE_MS
        };
        localStorage.setItem("authObj", JSON.stringify(authObject));
        return true;
        
    } else if (clear) {
        localStorage.removeItem("authObj");
        return true;
    } else return false;
}
