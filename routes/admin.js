const express = require('express');
const router = express.Router();
const { verify, verifyAdmin } = require('../auth');

// Use existing controller files
const blogController = require('../controllers/blog');
const userController = require('../controllers/user');
const commentController = require('../controllers/comment');

// Admin Dashboard Stats
router.get('/blog-count', verify, verifyAdmin, blogController.countBlogs);
router.get('/user-count', verify, verifyAdmin, userController.countUsers);
router.get('/comment-count', verify, verifyAdmin, commentController.countComments);

// Recent Blogs for Admin Dashboard
router.get('/recent-blogs', verify, verifyAdmin, blogController.getRecentBlogs);

module.exports = router;
