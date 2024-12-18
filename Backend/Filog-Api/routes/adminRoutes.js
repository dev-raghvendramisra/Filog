const router = require('express').Router();
const {authenticateAdmin,validateBody} = require('../middlewares');
const {adminLoginController,logController} = require('../controllers/admin');

router.post('/login',validateBody,adminLoginController);
router.get('/logs',authenticateAdmin,logController);

module.exports = router;