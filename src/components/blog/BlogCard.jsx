import React from 'react';
import { Card, CardContent, CardMedia, Typography, Box, Chip } from '@mui/material';
import { AccessTime, Bookmark, Comment } from '@mui/icons-material';
import styled from 'styled-components';
import { getDefaultCoverImage } from '../../config/images';

const StyledCard = styled(Card)`
  display: flex;
  flex-direction: row;
  transition: transform 0.2s;
  margin-bottom: 20px;
  &:hover {
    transform: translateY(-5px);
  }
`;

const CardImageContainer = styled.div`
  flex: 0 0 200px;
  @media (max-width: 600px) {
    flex: 0 0 120px;
  }
`;

const CardContentContainer = styled(CardContent)`
  flex: 1;
  padding: 16px !important;
`;

const TagContainer = styled(Box)`
  display: flex;
  gap: 8px;
  margin-top: 12px;
`;

const StatsContainer = styled(Box)`
  display: flex;
  align-items: center;
  gap: 20px;
  color: #666;
  margin-top: 10px;
`;

export const BlogCard = ({ post, onClick }) => {
  return (
    <StyledCard onClick={onClick} sx={{ cursor: 'pointer' }}>
      <CardImageContainer>
        <CardMedia
          component="img"
          sx={{ height: '100%', objectFit: 'cover' }}
          image={post.coverImage || getDefaultCoverImage(post.category)}
          alt={post.title}
        />
      </CardImageContainer>
      <CardContentContainer>
        <Typography variant="h6" gutterBottom>
          {post.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          {post.summary}
        </Typography>
        <TagContainer>
          {post.tags?.map(tag => (
            <Chip key={tag} label={tag} size="small" />
          ))}
        </TagContainer>
        <StatsContainer>
          <Box display="flex" alignItems="center" gap={1}>
            <AccessTime fontSize="small" />
            <Typography variant="body2">
              {new Date(post.createdAt).toLocaleDateString()}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={1}>
            <Comment fontSize="small" />
            <Typography variant="body2">
              {post.comments?.length || 0} 评论
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={1}>
            <Bookmark fontSize="small" />
            <Typography variant="body2">
              {post.views || 0} 阅读
            </Typography>
          </Box>
        </StatsContainer>
      </CardContentContainer>
    </StyledCard>
  );
}; 