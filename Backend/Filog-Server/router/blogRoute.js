const router = require('express').Router();
const validateParam = require('../middleware/validateParam');
const blogPosts = require('../controller/blogPosts');

router.get("/:slug",validateParam,blogPosts)

module.exports = router;