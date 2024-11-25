const router = require('express').Router();
const {authController} = require('../controllers');
const validateBody = require('../middlewares/validateBody');

router.post('/auth-service',validateBody, authController);   

module.exports = router;
