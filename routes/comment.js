const express = require('express');
const router = express.Router();
const commentController = require('../controllers/comment');
const { verify, verifyAdmin } = require('../auth');

// Add a comment to a blog post
router.post('/add/:blogId', verify, commentController.addComment);

// Get all comments for a blog post
router.get('/blog/:blogId', commentController.getCommentsByBlog);

// Admin deletes any comment
router.delete('/delete/:commentId', verify, verifyAdmin, commentController.deleteComment);

module.exports = router;
