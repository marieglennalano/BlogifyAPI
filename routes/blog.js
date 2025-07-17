const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blog');
const { verify, verifyAdmin } = require('../auth');

// Blog routes
router.post('/create', verify, blogController.createBlog);
router.get('/all', blogController.getAllBlogs);
router.get('/view/:id', blogController.getBlogById);
router.patch('/edit/:id', verify, blogController.updateBlog);
router.delete('/remove/:id', verify, verifyAdmin, blogController.deleteBlog);

module.exports = router;
