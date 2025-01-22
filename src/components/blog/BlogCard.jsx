import React from 'react';
import { Card, CardContent, CardMedia, Typography, Box, Chip } from '@mui/material';
import { AccessTime, Bookmark, Comment } from '@mui/icons-material';
import styled from 'styled-components';

const StyledCard = styled(Card)`
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: transform 0.2s;
  &:hover {
    transform: translateY(-5px);
  }
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

export const BlogCard = ({ post }) => {
  return (
    <StyledCard>
      <CardMedia
        component="img"
        height="200"
        image={post.image}
        alt={post.title}
      />
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {post.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          {post.summary}
        </Typography>
        <TagContainer>
          {post.tags.map(tag => (
            <Chip key={tag} label={tag} size="small" />
          ))}
        </TagContainer>
        <StatsContainer>
          <Box display="flex" alignItems="center" gap={1}>
            <AccessTime fontSize="small" />
            <Typography variant="body2">{post.date}</Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={1}>
            <Comment fontSize="small" />
            <Typography variant="body2">{post.comments} 评论</Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={1}>
            <Bookmark fontSize="small" />
            <Typography variant="body2">{post.views} 阅读</Typography>
          </Box>
        </StatsContainer>
      </CardContent>
    </StyledCard>
  );
}; 