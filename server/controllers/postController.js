const Post = require('../models/Post');

exports.createPost = async (req, res) => {
  try {
    const { title, content, summary, tags, category, coverImage } = req.body;
    
    const post = await Post.create({
      title,
      content,
      summary,
      tags,
      category,
      coverImage,
      author: req.user._id
    });

    await post.populate('author', 'username');
    
    res.status(201).json(post);
  } catch (error) {
    console.error('创建文章失败:', error);
    res.status(500).json({ message: '创建文章失败' });
  }
};

exports.getPosts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || '';
    const sort = req.query.sort || '-createdAt';
    const category = req.query.category || '';
    const skip = (page - 1) * limit;

    const query = {};
    
    if (category) {
      query.category = category;
    }
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    const posts = await Post.find(query)
      .populate('author', 'username')
      .sort(sort)
      .skip(skip)
      .limit(limit);

    const total = await Post.countDocuments(query);

    res.json({
      posts,
      pagination: {
        page,
        pages: Math.ceil(total / limit),
        total,
      },
    });
  } catch (error) {
    res.status(500).json({ message: '服务器错误' });
  }
};

exports.getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('author', 'username')
      .populate('comments.user', 'username');

    if (!post) {
      return res.status(404).json({ message: '文章不存在' });
    }

    // 增加浏览量
    post.views += 1;
    await post.save();

    res.json(post);
  } catch (error) {
    res.status(500).json({ message: '服务器错误' });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ message: '文章不存在' });
    }

    // 检查是否是作者或管理员
    if (post.author.toString() !== req.user._id.toString() && 
        req.user.role !== 'admin') {
      return res.status(403).json({ message: '没有权限编辑此文章' });
    }

    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate('author', 'username');

    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: '更新文章失败' });
  }
};

exports.addComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ message: '文章不存在' });
    }

    const comment = {
      user: req.user._id,
      content: req.body.content,
      createdAt: new Date()
    };

    post.comments.push(comment);
    await post.save();

    // 重新获取带有用户信息的完整文章
    const updatedPost = await Post.findById(req.params.id)
      .populate('author', 'username avatar')
      .populate('comments.user', 'username avatar');

    res.json(updatedPost);
  } catch (error) {
    console.error('添加评论失败:', error);
    res.status(500).json({ message: '添加评论失败' });
  }
}; 