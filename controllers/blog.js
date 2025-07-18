const Blog = require('../models/Blog');
const { errorHandler } = require('../auth');

// Create Blog Post
exports.createBlog = async (req, res) => {
  try {
    const { title, content } = req.body;

    const newBlog = new Blog({
      title,
      content,
      author: req.user.id
    });

    const savedBlog = await newBlog.save();
    res.status(201).json(savedBlog);
  } catch (err) {
    errorHandler(err, req, res);
  }
};

// Get All Blog Posts
exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate('author', 'firstName lastName email');
    res.status(200).json(blogs);
  } catch (err) {
    errorHandler(err, req, res);
  }
};

// Get Single Blog Post
exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate('author', 'firstName lastName email');

    if (!blog) return res.status(404).json({ message: 'Blog not found' });

    res.status(200).json(blog);
  } catch (err) {
    errorHandler(err, req, res);
  }
};

// Update Blog Post
exports.updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    if (blog.author.toString() !== req.user.id && !req.user.isAdmin) {
      return res.status(403).json({ message: 'Unauthorized to update this blog' });
    }

    blog.title = req.body.title || blog.title;
    blog.content = req.body.content || blog.content;
    blog.updatedAt = Date.now();

    const updatedBlog = await blog.save();
    res.status(200).json(updatedBlog);
  } catch (err) {
    errorHandler(err, req, res);
  }
};

// Delete Blog Post
exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    if (blog.author.toString() !== req.user.id && !req.user.isAdmin) {
      return res.status(403).json({ message: 'Unauthorized to delete this blog' });
    }

    await blog.deleteOne();
    res.status(200).json({ message: 'Blog deleted successfully' });
  } catch (err) {
    errorHandler(err, req, res);
  }
};

// Count all blogs
exports.countBlogs = async (req, res) => {
  try {
    const count = await Blog.countDocuments();
    res.json({ count });
  } catch (err) {
    res.status(500).json({ message: 'Error counting blogs' });
  }
};

// Get latest 5 blogs
exports.getRecentBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find()
      .populate('author', 'firstName lastName')
      .sort({ createdAt: -1 })
      .limit(5);
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching recent blogs' });
  }
};
