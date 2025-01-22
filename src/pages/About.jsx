import React from 'react';
import { Container, Typography, Box, Paper, Link, Chip, Grid } from '@mui/material';
import { Email, GitHub } from '@mui/icons-material';
import styled from 'styled-components';

const StyledPaper = styled(Paper)`
  padding: 32px;
  margin: 24px 0;
`;

const ContactItem = styled(Box)`
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 8px 0;
`;

const SkillsContainer = styled(Box)`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 16px 0;
`;

const About = () => {
  const skills = {
    frontend: ['React', 'Vue', 'TypeScript', 'Next.js', 'Webpack'],
    backend: ['Node.js', 'Express', 'MongoDB', 'MySQL', 'Redis'],
    tools: ['Git', 'Docker', 'Linux', 'VS Code', 'Postman']
  };

  return (
    <Container maxWidth="lg">
      <StyledPaper elevation={3}>
        <Typography variant="h4" gutterBottom>
          关于我
        </Typography>
        
        <Typography variant="body1" paragraph>
          你好！我是一名全栈开发者，热衷于探索和学习新技术，喜欢分享技术见解和开发经验。
        </Typography>

        <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
          技术栈
        </Typography>
        
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              前端开发
            </Typography>
            <SkillsContainer>
              {skills.frontend.map(skill => (
                <Chip key={skill} label={skill} />
              ))}
            </SkillsContainer>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              后端开发
            </Typography>
            <SkillsContainer>
              {skills.backend.map(skill => (
                <Chip key={skill} label={skill} />
              ))}
            </SkillsContainer>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              开发工具
            </Typography>
            <SkillsContainer>
              {skills.tools.map(skill => (
                <Chip key={skill} label={skill} />
              ))}
            </SkillsContainer>
          </Grid>
        </Grid>

        <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
          联系方式
        </Typography>
        
        <Box sx={{ mt: 2 }}>
          <ContactItem>
            <Email color="primary" />
            <Link href="mailto:475294039@qq.com" underline="hover">
              475294039@qq.com
            </Link>
          </ContactItem>
          <ContactItem>
            <GitHub color="primary" />
            <Link href="https://github.com/Willwillam" target="_blank" rel="noopener noreferrer" underline="hover">
              @Willwillam
            </Link>
          </ContactItem>
        </Box>
      </StyledPaper>
    </Container>
  );
};

export default About; 