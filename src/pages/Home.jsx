import React from 'react';
import { Container, Grid, Typography, Card, CardContent, CardMedia, Box, Chip, Divider } from '@mui/material';
import styled from 'styled-components';
import { AccessTime, Bookmark, Comment } from '@mui/icons-material';

const HeroSection = styled.div`
  padding: 60px 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  margin-bottom: 40px;
  margin-top: 60px
`;

const BlogCard = styled(Card)`
  margin-bottom: 20px;
  transition: transform 0.2s;
  &:hover {
    transform: translateY(-5px);
  }
`;

const StatsContainer = styled(Box)`
  display: flex;
  align-items: center;
  gap: 20px;
  color: #666;
  margin-top: 10px;
`;

const TagContainer = styled(Box)`
  display: flex;
  gap: 8px;
  margin-top: 12px;
`;

// Mock 数据
const recentPosts = [
  {
    id: 1,
    title: "React 18 新特性解析",
    summary: "深入探讨 React 18 带来的并发渲染、自动批处理等重要更新...",
    date: "2024-03-15",
    image: "https://source.unsplash.com/random/800x400?react",
    views: 156,
    comments: 23,
    tags: ["React", "JavaScript", "前端"]
  },
  {
    id: 2,
    title: "TypeScript 最佳实践指南",
    summary: "探索 TypeScript 在大型项目中的应用，以及如何避免常见陷阱...",
    date: "2024-03-10",
    image: "https://source.unsplash.com/random/800x400?typescript",
    views: 89,
    comments: 12,
    tags: ["TypeScript", "编程", "教程"]
  }
];

const Home = () => {
  return (
    <>
      <HeroSection>
        <Container>
          <Typography variant="h2" gutterBottom>
            欢迎来到我的博客
          </Typography>
          <Typography variant="h5">
            分享技术、生活和有趣的故事
          </Typography>
        </Container>
      </HeroSection>
      
      <Container>
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Typography variant="h4" gutterBottom>
              最新文章
            </Typography>
            {recentPosts.map(post => (
              <BlogCard key={post.id}>
                <CardMedia
                  component="img"
                  height="250"
                  image={post.image}
                  alt={post.title}
                />
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    {post.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" paragraph>
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
              </BlogCard>
            ))}
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  关于我
                </Typography>
                <Typography variant="body1" paragraph>
                  你好！我是一名全栈开发者，热衷于探索新技术和分享技术见解。
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Typography variant="h6" gutterBottom>
                  技术栈
                </Typography>
                <Box display="flex" flexWrap="wrap" gap={1}>
                  {['React', 'Node.js', 'TypeScript', 'Python', 'Docker'].map(tech => (
                    <Chip key={tech} label={tech} size="small" />
                  ))}
                </Box>
              </CardContent>
            </Card>

            <Card sx={{ mt: 3 }}>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  博客统计
                </Typography>
                <Box display="flex" flexDirection="column" gap={1}>
                  <Typography variant="body1">
                    文章数量: 25
                  </Typography>
                  <Typography variant="body1">
                    评论数量: 128
                  </Typography>
                  <Typography variant="body1">
                    总访问量: 10,234
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Home; 