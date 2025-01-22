const express = require('express');
const router = express.Router();
const { 
  createPost, 
  getPosts, 
  getPost,
  updatePost,
  addComment
} = require('../controllers/postController');
const { protect, admin, checkIsWangwen } = require('../middleware/auth');

router.route('/')
  .get(getPosts)
  .post(protect, checkIsWangwen, createPost);  // 允许登录用户发布文章

router.route('/:id')
  .get(getPost)
  .put(protect, checkIsWangwen, updatePost);  // 允许作者或管理员更新文章

// 评论路由
router.post('/:id/comments', protect, addComment);

module.exports = router; 