import React, { useState, useEffect } from 'react';
import { 
  Container, Grid, Typography, TextField, InputAdornment, Box, Button,
  Pagination, Select, MenuItem, FormControl, InputLabel, Chip
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Add as AddIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { BlogCard } from '../components/blog/BlogCard';
import { useUser } from '../context/UserContext';
import { postAPI } from '../services/api';
import { categories } from '../config/categories';

const Articles = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useUser();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('-createdAt'); // 默认按创建时间降序
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('');

  const fetchPosts = async () => {
    try {
      const { data } = await postAPI.getPosts(
        page, 
        10, 
        search, 
        sort,
        selectedCategory
      );
      setPosts(data.posts);
      setTotalPages(data.pagination.pages);
    } catch (error) {
      console.error('获取文章列表失败:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [page, sort, selectedCategory]);

  useEffect(() => {
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }
    setSearchTimeout(
      setTimeout(() => {
        setPage(1);
        fetchPosts();
      }, 500)
    );
  }, [search]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSortChange = (e) => {
    setSort(e.target.value);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <Container sx={{ py: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
            <Typography variant="h4" gutterBottom>
              所有文章
            </Typography>
            {isLoggedIn && (
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => navigate('/posts/new')}
              >
                写文章
              </Button>
            )}
          </Box>

          <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="搜索文章..."
              value={search}
              onChange={handleSearchChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
            <FormControl sx={{ minWidth: 200 }}>
              <InputLabel>排序方式</InputLabel>
              <Select
                value={sort}
                onChange={handleSortChange}
                label="排序方式"
              >
                <MenuItem value="-createdAt">最新发布</MenuItem>
                <MenuItem value="createdAt">最早发布</MenuItem>
                <MenuItem value="-views">最多浏览</MenuItem>
                <MenuItem value="-comments">最多评论</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" gutterBottom>
              分类筛选
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              <Chip
                label="全部"
                onClick={() => setSelectedCategory('')}
                color={selectedCategory === '' ? 'primary' : 'default'}
                variant={selectedCategory === '' ? 'filled' : 'outlined'}
              />
              {categories.map(category => (
                <Chip
                  key={category.value}
                  label={category.label}
                  onClick={() => setSelectedCategory(category.value)}
                  color={selectedCategory === category.value ? 'primary' : 'default'}
                  variant={selectedCategory === category.value ? 'filled' : 'outlined'}
                />
              ))}
            </Box>
          </Box>
        </Grid>

        {loading ? (
          <Typography>加载中...</Typography>
        ) : posts.length > 0 ? (
          posts.map(post => (
            <Grid item xs={12} md={6} key={post._id}>
              <BlogCard 
                post={post} 
                onClick={() => navigate(`/posts/${post._id}`)}
              />
            </Grid>
          ))
        ) : (
          <Typography>暂无文章</Typography>
        )}

        {totalPages > 1 && (
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={handlePageChange}
                color="primary"
              />
            </Box>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default Articles; 