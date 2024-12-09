const router = require('express').Router();
const validateParam = require('../middleware/validateParam');
const userProfile = require('../controller/userProfiles');

router.get("/:id",validateParam,userProfile)

module.exports = router;