import React from 'react';
import { Container, Grid, Typography, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { BlogCard } from '../components/blog/BlogCard';

const mockArticles = [
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
  },
  // 可以添加更多文章...
];

const Articles = () => {
  return (
    <Container sx={{ py: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom>
            所有文章
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="搜索文章..."
            sx={{ mb: 4 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        {mockArticles.map(article => (
          <Grid item xs={12} md={6} key={article.id}>
            <BlogCard post={article} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Articles; 