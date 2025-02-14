import { Router } from "express";
const router = Router()
import { validateBody } from "@middleware";
import {emailVerification as emailVerificationController, magicUrl as magicUrlController, resetPassword as resetPasswordController} from "@controller/auth";

router.post('/email-verification/generate',validateBody, emailVerificationController.generateEmailVerification);   
router.patch('/email-verification/verify',validateBody, emailVerificationController.verifyEmailVerification);   
router.post('/magic-url/generate',validateBody, magicUrlController.generateMagicUrl);   
router.post('/magic-url/verify',validateBody, magicUrlController.verifyMagicUrl);   
router.patch('/reset-password',validateBody, resetPasswordController);   

export default router