import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container, Avatar, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useUser } from '../../context/UserContext';

const StyledHeader = styled(AppBar)`
  background: linear-gradient(to right, #667eea, #764ba2);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-weight: 500;
  padding: 8px 16px;
  border-radius: 20px;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: translateY(-2px);
  }
`;

const Logo = styled(Link)`
  color: white;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 10px;
  
  &:hover {
    color: white;
  }
`;

const LogoIcon = styled.div`
  width: 40px;
  height: 40px;
  background: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: #667eea;
  font-size: 20px;
`;

const Navigation = styled.nav`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const UserSection = styled.div`
  display: flex;
  align-items: center;
  margin-left: 20px;
`;

const UserAvatar = styled(Avatar)`
  transition: transform 0.3s ease;
  
  &:hover {
    transform: scale(1.1);
  }
`;

const LoginButton = styled(Button)`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 6px 20px;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

const LogoutButton = styled(Button)`
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.7);
  border-radius: 20px;
  padding: 6px 20px;
  background: rgba(255, 255, 255, 0.1);
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    border-color: white;
  }
`;

const Header = () => {
  const { user, isLoggedIn, logout } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <StyledHeader position="fixed">
      <Container maxWidth="lg">
        <Toolbar sx={{ py: 1 }}>
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
            <Logo to="/">
              <LogoIcon>B</LogoIcon>
              <Typography variant="h6" sx={{ fontWeight: 600, ml: 1 }}>
                博客天地
              </Typography>
            </Logo>
          </Box>

          <Navigation>
            <NavLink to="/">首页</NavLink>
            <NavLink to="/articles">文章</NavLink>
            <NavLink to="/about">关于</NavLink>
          </Navigation>

          <UserSection>
            {isLoggedIn ? (
              <>
                <UserAvatar 
                  sx={{ 
                    bgcolor: 'white', 
                    color: 'primary.main',
                    marginRight: 2,
                    width: 35,
                    height: 35
                  }}
                >
                  {user.username[0].toUpperCase()}
                </UserAvatar>
                <Typography 
                  variant="subtitle1" 
                  sx={{ 
                    color: 'white',
                    mr: 2,
                    fontWeight: 500
                  }}
                >
                  {user.username}
                </Typography>
                <LogoutButton 
                  variant="contained" 
                  onClick={handleLogout}
                >
                  退出登录
                </LogoutButton>
              </>
            ) : (
              <LoginButton 
                component={Link} 
                to="/login"
                variant="contained"
                disableElevation
              >
                登录
              </LoginButton>
            )}
          </UserSection>
        </Toolbar>
      </Container>
    </StyledHeader>
  );
};

export default Header; 