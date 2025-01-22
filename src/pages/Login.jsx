import React, { useState } from 'react';
import { Container, Paper, TextField, Button, Typography, Box, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useUser } from '../context/UserContext';

const LoginContainer = styled(Paper)`
  padding: 32px;
  max-width: 400px;
  margin: 100px auto;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

// Mock 用户数据
const MOCK_USER = {
  username: 'wangwen',
  password: 'admin'
};

const Login = () => {
  const navigate = useNavigate();
  const { login } = useUser();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      await login(formData);
      navigate('/');
    } catch (err) {
      setError(err.message || '登录失败');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <LoginContainer elevation={3}>
        <Typography variant="h4" gutterBottom align="center">
          登录
        </Typography>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        <Form onSubmit={handleSubmit}>
          <TextField
            label="用户名"
            name="username"
            value={formData.username}
            onChange={handleChange}
            fullWidth
            required
            disabled={loading}
          />
          <TextField
            label="密码"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            fullWidth
            required
            disabled={loading}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            disabled={loading}
          >
            {loading ? '登录中...' : '登录'}
          </Button>
        </Form>
        <Box mt={2}>
          <Typography variant="body2" color="textSecondary" align="center">
            测试账号：wangwen<br />
            密码：admin
          </Typography>
        </Box>
      </LoginContainer>
    </Container>
  );
};

export default Login; 