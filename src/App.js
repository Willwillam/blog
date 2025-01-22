import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme } from '@mui/material';
import { UserProvider } from './context/UserContext';
import Header from './components/layout/Header';
import Home from './pages/Home';
import Articles from './pages/Articles';
import About from './pages/About';
import Login from './pages/Login';
import EditPost from './pages/EditPost';
import PostDetail from './pages/PostDetail';
import { Box } from '@mui/material';

// 创建主题
const theme = createTheme({
  palette: {
    primary: {
      main: '#667eea',
    },
    secondary: {
      main: '#764ba2',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <UserProvider>
        <Router basename={process.env.PUBLIC_URL}>
          <Header />
          <Box sx={{ pt: '60px' }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/articles" element={<Articles />} />
              <Route path="/posts/:id" element={<PostDetail />} />
              <Route path="/posts/new" element={<EditPost />} />
              <Route path="/posts/edit/:id" element={<EditPost />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </Box>
        </Router>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;
