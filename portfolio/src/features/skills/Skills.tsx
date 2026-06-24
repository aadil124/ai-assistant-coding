'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import {
  MdCode,
  MdSettings,
  MdLayers,
  MdBuild,
  MdStorage,
} from 'react-icons/md';
import SectionHeader from '@/components/SectionHeader';
import GlassCard from '@/components/GlassCard';

export default function Skills() {
  const skillCategories = [
    {
      title: 'Frontend',
      icon: <MdCode size={20} />,
      skills: ['React.js', 'NextJS', 'TypeScript', 'JavaScript (ES6+)', 'HTML5', 'CSS3'],
      color: '#818CF8',
    },
    {
      title: 'Backend',
      icon: <MdStorage size={20} />,
      skills: ['Node.js', 'Express.js', 'MongoDB', 'Mongoose', 'REST API', 'JWT Auth', 'RBAC'],
      color: '#34D399',
    },
    {
      title: 'State Management',
      icon: <MdSettings size={20} />,
      skills: ['Redux Toolkit', 'Redux Saga', 'Context API', 'Redux'],
      color: '#C4B5FD',
    },
    {
      title: 'UI Frameworks',
      icon: <MdLayers size={20} />,
      skills: ['Material UI', 'Tailwind CSS', 'Bootstrap', 'Ant Design'],
      color: '#FCD34D',
    },
    {
      title: 'Dev Tools',
      icon: <MdBuild size={20} />,
      skills: ['Git & GitHub', 'GitLab', 'Jira', 'Postman', 'VS Code', 'DevTools'],
      color: '#F9A8D4',
    },
  ];

  return (
    <Box id="skills" sx={{ py: { xs: 8, md: 12 } }}>
      <Container maxWidth="lg">
        <SectionHeader
          label="Expertise"
          title="Skills & Toolkit"
          subtitle="Technologies, frameworks, and tools I use to build production-grade web applications."
        />

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
            gap: 2.5,
          }}
        >
          {skillCategories.map((category, idx) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.4, delay: idx * 0.06 }}
              style={{ width: '100%', display: 'flex' }}
            >
              <GlassCard
                sx={{
                  p: 3,
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Left accent */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '2px',
                    height: '100%',
                    bgcolor: category.color,
                    opacity: 0.6,
                  }}
                />

                {/* Header */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2.5 }}>
                  <Box
                    sx={{
                      color: category.color,
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    {category.icon}
                  </Box>
                  <Typography
                    variant="body1"
                    sx={{
                      fontWeight: 600,
                      fontFamily: 'var(--font-outfit), system-ui, sans-serif',
                      fontSize: '0.9375rem',
                    }}
                  >
                    {category.title}
                  </Typography>
                </Box>

                {/* Skills */}
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75, mt: 'auto' }}>
                  {category.skills.map((skill) => (
                    <Box
                      key={skill}
                      sx={{
                        fontSize: '0.75rem',
                        fontWeight: 500,
                        bgcolor: (theme) =>
                          theme.palette.mode === 'dark'
                            ? 'rgba(255, 255, 255, 0.03)'
                            : 'rgba(0, 0, 0, 0.03)',
                        border: (theme) =>
                          `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`,
                        color: 'text.secondary',
                        px: 1.5,
                        py: 0.625,
                        borderRadius: '8px',
                        transition: 'all 0.15s ease',
                        '&:hover': {
                          color: 'text.primary',
                          borderColor: (theme) =>
                            theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.12)',
                          bgcolor: (theme) =>
                            theme.palette.mode === 'dark'
                              ? 'rgba(255, 255, 255, 0.05)'
                              : 'rgba(0, 0, 0, 0.05)',
                        },
                      }}
                    >
                      {skill}
                    </Box>
                  ))}
                </Box>
              </GlassCard>
            </motion.div>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
