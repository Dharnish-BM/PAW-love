import asyncHandler from "express-async-handler";
import Comment from "../models/Comment.js";
import CommunityPost from "../models/CommunityPost.js";

// @desc    Get all community posts
// @route   GET /api/community/posts
// @access  Public
export const getPosts = asyncHandler(async (req, res) => {
  const { 
    category, 
    search, 
    tags, 
    author, 
    sortBy = 'createdAt', 
    sortOrder = 'desc',
    page = 1,
    limit = 10
  } = req.query;

  const filter = {};
  
  // Category filter
  if (category && category !== 'all') {
    filter.category = category;
  }
  
  // Search filter
  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: 'i' } },
      { content: { $regex: search, $options: 'i' } }
    ];
  }
  
  // Tags filter
  if (tags) {
    const tagArray = tags.split(',').map(tag => tag.trim());
    filter.tags = { $in: tagArray };
  }
  
  // Author filter
  if (author) {
    filter.author = author;
  }

  // Build sort object
  const sort = {};
  sort[sortBy] = sortOrder === 'desc' ? -1 : 1;
  
  // Always show pinned posts first
  if (sortBy === 'createdAt') {
    sort.isPinned = -1;
  }

  const skip = (parseInt(page) - 1) * parseInt(limit);

  const posts = await CommunityPost.find(filter)
    .populate('author', 'name email picture isShelter shelterName')
    .populate('comments')
    .sort(sort)
    .skip(skip)
    .limit(parseInt(limit));

  const totalPosts = await CommunityPost.countDocuments(filter);

  res.json({
    posts,
    pagination: {
      currentPage: parseInt(page),
      totalPages: Math.ceil(totalPosts / parseInt(limit)),
      totalPosts,
      hasNext: skip + posts.length < totalPosts,
      hasPrev: parseInt(page) > 1
    }
  });
});

// @desc    Get single community post
// @route   GET /api/community/posts/:id
// @access  Public
export const getPost = asyncHandler(async (req, res) => {
  const post = await CommunityPost.findById(req.params.id)
    .populate('author', 'name email picture isShelter shelterName')
    .populate({
      path: 'comments',
      populate: {
        path: 'author',
        select: 'name email picture isShelter shelterName'
      }
    });

  if (!post) {
    res.status(404);
    throw new Error("Post not found");
  }

  // Increment view count
  post.viewCount += 1;
  await post.save();

  res.json(post);
});

// @desc    Create new community post
// @route   POST /api/community/posts
// @access  Private
export const createPost = asyncHandler(async (req, res) => {
  const { title, content, category, tags, images } = req.body;

  if (!title || !content || !category) {
    res.status(400);
    throw new Error("Title, content, and category are required");
  }

  const post = await CommunityPost.create({
    title,
    content,
    category,
    tags: tags || [],
    images: images || [],
    author: req.user._id
  });

  const populatedPost = await CommunityPost.findById(post._id)
    .populate('author', 'name email picture isShelter shelterName');

  res.status(201).json(populatedPost);
});

// @desc    Update community post
// @route   PUT /api/community/posts/:id
// @access  Private
export const updatePost = asyncHandler(async (req, res) => {
  const post = await CommunityPost.findById(req.params.id);

  if (!post) {
    res.status(404);
    throw new Error("Post not found");
  }

  // Check if user is the author
  if (post.author.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error("Not authorized to update this post");
  }

  const { title, content, category, tags, images } = req.body;

  const updatedPost = await CommunityPost.findByIdAndUpdate(
    req.params.id,
    {
      title,
      content,
      category,
      tags: tags || [],
      images: images || [],
      isEdited: true,
      editedAt: new Date()
    },
    { new: true }
  ).populate('author', 'name email picture isShelter shelterName');

  res.json(updatedPost);
});

// @desc    Delete community post
// @route   DELETE /api/community/posts/:id
// @access  Private
export const deletePost = asyncHandler(async (req, res) => {
  const post = await CommunityPost.findById(req.params.id);

  if (!post) {
    res.status(404);
    throw new Error("Post not found");
  }

  // Check if user is the author
  if (post.author.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error("Not authorized to delete this post");
  }

  // Delete all comments associated with this post
  await Comment.deleteMany({ post: req.params.id });

  await CommunityPost.findByIdAndDelete(req.params.id);

  res.json({ message: "Post deleted successfully" });
});

// @desc    Like/Unlike a post
// @route   POST /api/community/posts/:id/like
// @access  Private
export const likePost = asyncHandler(async (req, res) => {
  const post = await CommunityPost.findById(req.params.id);

  if (!post) {
    res.status(404);
    throw new Error("Post not found");
  }

  const userId = req.user._id;
  const isLiked = post.likes.includes(userId);

  if (isLiked) {
    post.likes.pull(userId);
  } else {
    post.likes.push(userId);
  }

  await post.save();

  res.json({ 
    isLiked: !isLiked, 
    likeCount: post.likes.length 
  });
});

// @desc    Get comments for a post
// @route   GET /api/community/posts/:id/comments
// @access  Public
export const getComments = asyncHandler(async (req, res) => {
  const comments = await Comment.find({ post: req.params.id })
    .populate('author', 'name email picture isShelter shelterName')
    .sort({ createdAt: 1 });

  res.json(comments);
});

// @desc    Create comment
// @route   POST /api/community/posts/:id/comments
// @access  Private
export const createComment = asyncHandler(async (req, res) => {
  const { content, parentComment } = req.body;

  if (!content) {
    res.status(400);
    throw new Error("Comment content is required");
  }

  const comment = await Comment.create({
    content,
    author: req.user._id,
    post: req.params.id,
    parentComment: parentComment || null
  });

  const populatedComment = await Comment.findById(comment._id)
    .populate('author', 'name email picture isShelter shelterName');

  // Update post comment count
  await CommunityPost.findByIdAndUpdate(req.params.id, {
    $push: { comments: comment._id }
  });

  res.status(201).json(populatedComment);
});

// @desc    Update comment
// @route   PUT /api/community/comments/:id
// @access  Private
export const updateComment = asyncHandler(async (req, res) => {
  const comment = await Comment.findById(req.params.id);

  if (!comment) {
    res.status(404);
    throw new Error("Comment not found");
  }

  // Check if user is the author
  if (comment.author.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error("Not authorized to update this comment");
  }

  const { content } = req.body;

  const updatedComment = await Comment.findByIdAndUpdate(
    req.params.id,
    {
      content,
      isEdited: true,
      editedAt: new Date()
    },
    { new: true }
  ).populate('author', 'name email picture isShelter shelterName');

  res.json(updatedComment);
});

// @desc    Delete comment
// @route   DELETE /api/community/comments/:id
// @access  Private
export const deleteComment = asyncHandler(async (req, res) => {
  const comment = await Comment.findById(req.params.id);

  if (!comment) {
    res.status(404);
    throw new Error("Comment not found");
  }

  // Check if user is the author
  if (comment.author.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error("Not authorized to delete this comment");
  }

  await Comment.findByIdAndDelete(req.params.id);

  res.json({ message: "Comment deleted successfully" });
});

// @desc    Like/Unlike a comment
// @route   POST /api/community/comments/:id/like
// @access  Private
export const likeComment = asyncHandler(async (req, res) => {
  const comment = await Comment.findById(req.params.id);

  if (!comment) {
    res.status(404);
    throw new Error("Comment not found");
  }

  const userId = req.user._id;
  const isLiked = comment.likes.includes(userId);

  if (isLiked) {
    comment.likes.pull(userId);
  } else {
    comment.likes.push(userId);
  }

  await comment.save();

  res.json({ 
    isLiked: !isLiked, 
    likeCount: comment.likes.length 
  });
});
