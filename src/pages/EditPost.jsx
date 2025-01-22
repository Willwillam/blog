import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, Typography, Box, Chip, Paper, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { postAPI } from '../services/api';
import MDEditor from '@uiw/react-md-editor';
import { useUser } from '../context/UserContext';
import { categories } from '../config/categories';
import { getDefaultCoverImage } from '../config/images';

const EditPost = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useUser();
  const isEditing = Boolean(id);
  const [post, setPost] = useState({
    title: '',
    content: '',
    summary: '',
    tags: [],
    category: '',
    coverImage: ''
  });
  const [tagInput, setTagInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(isEditing);

  useEffect(() => {
    if (isEditing) {
      const fetchPost = async () => {
        try {
          const { data } = await postAPI.getPost(id);
          if (user?.username !== 'wangwen') {
            navigate('/articles');
            return;
          }
          setPost(data);
        } catch (error) {
          console.error('获取文章失败:', error);
          navigate('/articles');
        } finally {
          setInitialLoading(false);
        }
      };
      fetchPost();
    }
  }, [id, navigate, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleContentChange = (value) => {
    setPost(prev => ({
      ...prev,
      content: value || ''
    }));
  };

  const handleTagInputKeyPress = (e) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      if (!post.tags.includes(tagInput.trim())) {
        setPost(prev => ({
          ...prev,
          tags: [...prev.tags, tagInput.trim()]
        }));
      }
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove) => {
    setPost(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isEditing) {
        await postAPI.updatePost(id, post);
      } else {
        await postAPI.createPost(post);
      }
      navigate('/articles');
    } catch (error) {
      console.error('发布文章失败:', error);
      // 这里可以添加错误提示
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return <Typography>加载中...</Typography>;
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          {isEditing ? '编辑文章' : '编写文章'}
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <TextField
            name="title"
            label="文章标题"
            value={post.title}
            onChange={handleChange}
            fullWidth
            required
            sx={{ mb: 3 }}
          />
          
          <TextField
            name="summary"
            label="文章摘要"
            value={post.summary}
            onChange={handleChange}
            fullWidth
            multiline
            rows={2}
            required
            sx={{ mb: 3 }}
          />

          <FormControl
            name="category"
            value={post.category}
            fullWidth
            required
            sx={{ mb: 3 }}
          >
            <InputLabel>分类</InputLabel>
            <Select
              name="category"
              value={post.category}
              onChange={handleChange}
              label="分类"
            >
              {categories.map(category => (
                <MenuItem key={category.value} value={category.value}>
                  {category.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            name="coverImage"
            label="封面图片URL"
            value={post.coverImage}
            onChange={handleChange}
            fullWidth
            helperText="如果不填写，将使用默认的分类封面图"
            sx={{ mb: 3 }}
          />

          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" gutterBottom>
              标签
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
              {post.tags.map(tag => (
                <Chip
                  key={tag}
                  label={tag}
                  onDelete={() => removeTag(tag)}
                />
              ))}
            </Box>
            <TextField
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyPress={handleTagInputKeyPress}
              placeholder="输入标签并按回车添加"
              fullWidth
            />
          </Box>

          <Typography variant="subtitle1" gutterBottom>
            文章内容
          </Typography>
          <MDEditor
            value={post.content}
            onChange={handleContentChange}
            height={400}
          />

          <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
              size="large"
            >
              {loading ? '发布中...' : '发布文章'}
            </Button>
            <Button
              variant="outlined"
              onClick={() => navigate('/articles')}
              size="large"
            >
              取消
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default EditPost; 