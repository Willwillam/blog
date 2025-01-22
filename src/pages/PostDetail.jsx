import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Box, Chip, Divider, Paper, Avatar, Button, TextField, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import { AccessTime, Bookmark, Comment, Edit as EditIcon } from '@mui/icons-material';
import MDEditor from '@uiw/react-md-editor';
import { postAPI } from '../services/api';
import styled from 'styled-components';
import { useUser } from '../context/UserContext';
import { categories } from '../config/categories';
import { getDefaultCoverImage } from '../config/images';

const StyledPaper = styled(Paper)`
  padding: 32px;
  margin: 24px 0;
`;

const MetaInfo = styled(Box)`
  display: flex;
  align-items: center;
  gap: 20px;
  color: #666;
  margin: 16px 0;
`;

const TagContainer = styled(Box)`
  display: flex;
  gap: 8px;
  margin: 16px 0;
`;

const CommentSection = styled(Box)`
  margin-top: 40px;
`;

const CommentForm = styled(Box)`
  margin-top: 20px;
  margin-bottom: 30px;
`;

const CoverImage = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 24px;
`;

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const { isLoggedIn, user } = useUser();
  const canEdit = user?.username === 'wangwen';
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data } = await postAPI.getPost(id);
        setPost(data);
      } catch (error) {
        console.error('获取文章详情失败:', error);
        navigate('/articles');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id, navigate]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    setSubmitting(true);
    try {
      const { data } = await postAPI.addComment(post._id, { content: comment });
      setPost(data);
      setComment('');
    } catch (error) {
      console.error('提交评论失败:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const getCategoryLabel = (value) => {
    const category = categories.find(c => c.value === value);
    return category ? category.label : value;
  };

  if (loading) {
    return <Typography>加载中...</Typography>;
  }

  if (!post) {
    return <Typography>文章不存在</Typography>;
  }

  return (
    <Container maxWidth="lg">
      <StyledPaper elevation={3}>
        <CoverImage
          src={post.coverImage || getDefaultCoverImage(post.category)}
          alt={post.title}
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Typography variant="h3">
            {post.title}
          </Typography>
          {canEdit && (
            <Button
              variant="outlined"
              startIcon={<EditIcon />}
              onClick={() => navigate(`/posts/edit/${post._id}`)}
            >
              编辑文章
            </Button>
          )}
        </Box>
        
        <MetaInfo>
          <Box display="flex" alignItems="center" gap={1}>
            <Avatar src={post.author?.avatar}>
              {post.author?.username[0].toUpperCase()}
            </Avatar>
            <Typography>{post.author?.username}</Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={1}>
            <AccessTime fontSize="small" />
            <Typography>
              {new Date(post.createdAt).toLocaleDateString()}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={1}>
            <Comment fontSize="small" />
            <Typography>{post.comments?.length || 0} 评论</Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={1}>
            <Bookmark fontSize="small" />
            <Typography>{post.views || 0} 阅读</Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={1}>
            <Chip
              label={getCategoryLabel(post.category)}
              color="primary"
              size="small"
            />
          </Box>
        </MetaInfo>

        <TagContainer>
          {post.tags.map(tag => (
            <Chip key={tag} label={tag} size="small" />
          ))}
        </TagContainer>

        <Divider sx={{ my: 3 }} />

        <Box data-color-mode="light">
          <MDEditor.Markdown source={post.content} />
        </Box>

        <CommentSection>
          <Typography variant="h5" gutterBottom>
            评论 ({post.comments?.length || 0})
          </Typography>

          {isLoggedIn ? (
            <CommentForm component="form" onSubmit={handleCommentSubmit}>
              <TextField
                fullWidth
                multiline
                rows={3}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="写下你的评论..."
                disabled={submitting}
              />
              <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={submitting || !comment.trim()}
                >
                  {submitting ? '提交中...' : '发表评论'}
                </Button>
              </Box>
            </CommentForm>
          ) : (
            <Typography color="textSecondary" sx={{ mb: 3 }}>
              请<Button onClick={() => navigate('/login')}>登录</Button>后发表评论
            </Typography>
          )}

          <List>
            {post.comments?.map((comment, index) => (
              <ListItem
                key={comment._id || index}
                alignItems="flex-start"
                sx={{ px: 0 }}
              >
                <ListItemAvatar>
                  <Avatar src={comment.user?.avatar}>
                    {comment.user?.username[0].toUpperCase()}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography component="span" variant="subtitle2">
                        {comment.user?.username}
                      </Typography>
                      <Typography component="span" variant="caption" color="textSecondary">
                        {new Date(comment.createdAt).toLocaleString()}
                      </Typography>
                    </Box>
                  }
                  secondary={comment.content}
                />
              </ListItem>
            ))}
          </List>
        </CommentSection>
      </StyledPaper>
    </Container>
  );
};

export default PostDetail; 