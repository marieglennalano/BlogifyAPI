const Comment = require('../models/Comment');
const { errorHandler } = require('../auth');

// Create a comment on a blog post
exports.addComment = async (req, res) => {
  try {
    const { comment } = req.body;
    const blogId = req.params.blogId;

    const newComment = new Comment({
      blog: blogId,
      user: req.user.id,
      comment
    });

    const savedComment = await newComment.save();
    res.status(201).json(savedComment);
  } catch (err) {
    errorHandler(err, req, res);
  }
};

// Get all comments for a blog post
exports.getCommentsByBlog = async (req, res) => {
  try {
    const blogId = req.params.blogId;

    const comments = await Comment.find({ blog: blogId })
      .populate('user', 'firstName lastName email')
      .sort({ createdAt: -1 });

    res.status(200).json(comments);
  } catch (err) {
    errorHandler(err, req, res);
  }
};

// Admin delete comment
exports.deleteComment = async (req, res) => {
  try {
    const commentId = req.params.commentId;

    const comment = await Comment.findById(commentId);
    if (!comment) return res.status(404).json({ message: 'Comment not found' });

    await comment.deleteOne();

    res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (err) {
    errorHandler(err, req, res);
  }
};
