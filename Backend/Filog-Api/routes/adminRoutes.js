const router = require('express').Router();
const {authenticateAdmin,validateBody} = require('../middlewares');
const {adminLoginController,logController, blogController, profileController} = require('../controllers/admin');

router.post('/login',validateBody,adminLoginController);
router.get('/logs',authenticateAdmin,logController);
router.get('/profiles',authenticateAdmin,profileController);
router.get('/blogs',authenticateAdmin,blogController);

module.exports = router;