import { Router } from "express";
const router = Router()
import { requestValidator } from "@middleware";
import {generateEmailVerification, verifyEmailVerification} from "@controller/auth/emailVerification";
import { signup, login, getUserDetails, logout, resetPassword } from "@controller/auth/session";
import { generateMagicUrl, verifyMagicUrl } from "@controller/auth/magicUrl";
import authenticateUser from "middlewares/authenticateUser";



router.put("/signup",requestValidator,signup)
router.post("/login",requestValidator,login)
router.post("/logout",authenticateUser,logout)
router.get("/user",authenticateUser,getUserDetails)
router.get('/email-verification/generate',authenticateUser,generateEmailVerification);   
router.patch('/email-verification/verify',authenticateUser,requestValidator, verifyEmailVerification);   
router.post('/magic-url/generate',requestValidator, generateMagicUrl);   
router.post('/magic-url/verify',requestValidator, verifyMagicUrl);   
router.patch('/reset-password',authenticateUser,requestValidator, resetPassword);

export default router