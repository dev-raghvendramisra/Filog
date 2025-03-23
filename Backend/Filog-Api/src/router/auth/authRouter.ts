import { Router } from "express";
const router = Router();
import { requestValidator } from "@middleware";
import { generateEmailVerification, verifyEmailVerification } from "@controller/auth/emailVerification";
import { signup, login, getUserDetails, logout, resetPassword, launchOauth, googleOAuth } from "@controller/auth/session";
import { generateMagicUrl, verifyMagicUrl } from "@controller/auth/magicUrl";
import authenticateUser from "middlewares/authenticateUser";

// Authentication routes
router.put("/register", requestValidator, signup);
router.post("/login", requestValidator, login);
router.delete("/logout", authenticateUser, logout);
router.get("/users/me", authenticateUser, getUserDetails);

// OAuth routes
router.get("/oauth/init/:provider", launchOauth);
router.get("/oauth/google", googleOAuth);

// Email verification routes
router.get('/email-verification', authenticateUser, generateEmailVerification);
router.patch('/email-verification', authenticateUser, requestValidator, verifyEmailVerification);

// Magic URL routes
router.post('/magic-url', requestValidator, generateMagicUrl);
router.patch('/magic-url', requestValidator, verifyMagicUrl);

// Password reset route
router.patch('/reset-password', authenticateUser, requestValidator, resetPassword);

export default router;
