const router = require('express').Router();
const {authenticateAdmin} = require('../middlewares');
const {adminLoginController,logController} = require('../controllers/admin');

router.post('/login',adminLoginController);
router.get('/logs',authenticateAdmin,logController);

module.exports = router;