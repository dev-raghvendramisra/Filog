const router = require('express').Router();
const {emailVerificationController, magicUrlController, resetPasswordController} = require('../controllers/auth');
const {validateBody} = require('../middlewares');

router.post('/email-verification/generate',validateBody, emailVerificationController.generateEmailVerification);   
router.patch('/email-verification/verify',validateBody, emailVerificationController.verifyEmailVerification);   
router.post('/magic-url/generate',validateBody, magicUrlController.generateMagicUrl);   
router.post('/magic-url/verify',validateBody, magicUrlController.verifyMagicUrl);   
router.patch('/reset-password',validateBody, resetPasswordController);   

module.exports = router;
