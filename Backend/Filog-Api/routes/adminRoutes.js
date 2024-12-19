const router = require('express').Router();
const {authenticateAdmin,validateBody} = require('../middlewares');
const {adminLoginController,logController,userController} = require('../controllers/admin');

router.post('/login',validateBody,adminLoginController);
router.get('/logs',authenticateAdmin,logController);
router.get('/users',authenticateAdmin,userController);

module.exports = router;