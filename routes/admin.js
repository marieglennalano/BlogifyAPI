const router = require('express').Router();
const { verify, verifyAdmin } = require('../middleware/auth');
const blogController = require('../controllers/blogController');
const userController = require('../controllers/userController');
const commentController = require('../controllers/commentController');

// Admin Dashboard Stats
router.get('/blog-count', verify, verifyAdmin, blogController.countBlogs);
router.get('/user-count', verify, verifyAdmin, userController.countUsers);
router.get('/comment-count', verify, verifyAdmin, commentController.countComments);

// Recent Blogs for Admin Dashboard
router.get('/recent-blogs', verify, verifyAdmin, blogController.getRecentBlogs);

module.exports = router;
