import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography, Card, CardContent, Box, Chip, Divider } from '@mui/material';
import styled from 'styled-components';
import { postAPI } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { BlogCard } from '../components/blog/BlogCard';

const HeroSection = styled.div`
  padding: 40px 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  margin-bottom: 30px;
`;

const ArticleSection = styled.div`
  margin-bottom: 30px;
`;

const SidebarCard = styled(Card)`
  margin-bottom: 20px;
`;

const Home = () => {
  const [recentPosts, setRecentPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalPosts: 0,
    totalComments: 0,
    totalViews: 0
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 获取最新文章
        const { data } = await postAPI.getPosts(1, 5); // 获取前5篇文章
        setRecentPosts(data.posts);
        
        // 更新统计信息
        setStats({
          totalPosts: data.pagination.total,
          totalComments: data.posts.reduce((acc, post) => acc + post.comments?.length || 0, 0),
          totalViews: data.posts.reduce((acc, post) => acc + post.views || 0, 0)
        });
      } catch (error) {
        console.error('获取文章失败:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <HeroSection>
        <Container>
          <Typography variant="h2" gutterBottom>
            欢迎来到我的博客
          </Typography>
          <Typography variant="h6">
            分享技术、生活和有趣的故事
          </Typography>
        </Container>
      </HeroSection>
      
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
              最新文章
            </Typography>
            <ArticleSection>
              {loading ? (
                <Typography>加载中...</Typography>
              ) : recentPosts.length > 0 ? (
                <Grid container spacing={2}>
                  {recentPosts.map(post => (
                    <Grid item xs={12} key={post._id}>
                      <BlogCard 
                        post={post}
                        onClick={() => navigate(`/posts/${post._id}`)}
                      />
                    </Grid>
                  ))}
                </Grid>
              ) : (
                <Typography>暂无文章</Typography>
              )}
            </ArticleSection>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <SidebarCard elevation={1}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  关于我
                </Typography>
                <Typography variant="body1" paragraph>
                  你好！我是一名全栈开发者，热衷于探索新技术和分享技术见解。
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Typography variant="subtitle1" gutterBottom>
                  技术栈
                </Typography>
                <Box display="flex" flexWrap="wrap" gap={1}>
                  {['React', 'Node.js', 'TypeScript', 'Python', 'Docker'].map(tech => (
                    <Chip key={tech} label={tech} size="small" />
                  ))}
                </Box>
              </CardContent>
            </SidebarCard>

            <SidebarCard elevation={1}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  博客统计
                </Typography>
                <Box display="flex" flexDirection="column" gap={1}>
                  <Typography variant="body1">
                    文章数量: {stats.totalPosts}
                  </Typography>
                  <Typography variant="body1">
                    评论数量: {stats.totalComments}
                  </Typography>
                  <Typography variant="body1">
                    总访问量: {stats.totalViews}
                  </Typography>
                </Box>
              </CardContent>
            </SidebarCard>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Home; 