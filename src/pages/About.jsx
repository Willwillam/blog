import React from 'react';
import { Container, Typography, Paper, Box, Chip, Avatar } from '@mui/material';
import styled from 'styled-components';

const StyledPaper = styled(Paper)`
  padding: 32px;
  margin-top: 32px;
`;

const About = () => {
  return (
    <Container>
      <StyledPaper elevation={3}>
        <Box display="flex" flexDirection="column" alignItems="center" mb={4}>
          <Avatar
            src="https://source.unsplash.com/random/150x150"
            sx={{ width: 150, height: 150, mb: 2 }}
          />
          <Typography variant="h4" gutterBottom>
            关于我
          </Typography>
        </Box>

        <Typography variant="body1" paragraph>
          你好！我是一名全栈开发者，热衷于探索新技术和分享技术见解。
          在这个博客中，我会分享我的技术心得、学习经验和一些有趣的项目。
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
          技术栈
        </Typography>
        <Box display="flex" flexWrap="wrap" gap={1} mb={4}>
          {['React', 'Node.js', 'TypeScript', 'Python', 'Docker', 'MongoDB', 'AWS'].map(tech => (
            <Chip key={tech} label={tech} />
          ))}
        </Box>

        <Typography variant="h6" gutterBottom>
          联系方式
        </Typography>
        <Typography variant="body1">
          Email: example@example.com<br />
          GitHub: github.com/example<br />
          LinkedIn: linkedin.com/in/example
        </Typography>
      </StyledPaper>
    </Container>
  );
};

export default About; 