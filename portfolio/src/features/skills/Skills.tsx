'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
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
      icon: <MdCode size={22} />,
      skills: ['React.js', 'NextJS', 'TypeScript', 'JavaScript (ES6+)', 'HTML5', 'CSS3'],
      color: '#818CF8',
      bgColor: 'rgba(129, 140, 248, 0.06)',
      borderColor: 'rgba(129, 140, 248, 0.15)',
    },
    {
      title: 'Backend',
      icon: <MdStorage size={22} />,
      skills: ['Node.js', 'Express.js', 'MongoDB', 'Mongoose', 'REST API', 'JWT Auth', 'RBAC'],
      color: '#34D399',
      bgColor: 'rgba(52, 211, 153, 0.06)',
      borderColor: 'rgba(52, 211, 153, 0.15)',
    },
    {
      title: 'State Management',
      icon: <MdSettings size={22} />,
      skills: ['Redux Toolkit', 'Redux Saga', 'Context API', 'Redux'],
      color: '#C4B5FD',
      bgColor: 'rgba(196, 181, 253, 0.06)',
      borderColor: 'rgba(196, 181, 253, 0.15)',
    },
    {
      title: 'UI Frameworks',
      icon: <MdLayers size={22} />,
      skills: ['Material UI', 'Tailwind CSS', 'Bootstrap', 'Ant Design'],
      color: '#FCD34D',
      bgColor: 'rgba(252, 211, 77, 0.06)',
      borderColor: 'rgba(252, 211, 77, 0.15)',
    },
    {
      title: 'Dev Tools',
      icon: <MdBuild size={22} />,
      skills: ['Git & GitHub', 'GitLab', 'Jira', 'Postman', 'VS Code', 'DevTools'],
      color: '#F9A8D4',
      bgColor: 'rgba(249, 168, 212, 0.06)',
      borderColor: 'rgba(249, 168, 212, 0.15)',
    },
  ];

  return (
    <Box 
      id="skills" 
      className="bg-grid"
      sx={{ 
        py: { xs: 8, md: 12 },
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '1px',
          background: (theme) => `linear-gradient(to right, transparent, ${theme.palette.divider}, transparent)`,
        }
      }}
    >
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
            gap: 3,
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
                  p: { xs: 2.25, md: 3.5 },
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  overflow: 'hidden',
                  borderLeft: `3.5px solid ${category.color}`,
                  '&:hover': {
                    borderColor: category.color,
                    boxShadow: (theme) =>
                      theme.palette.mode === 'dark'
                        ? `0 12px 30px -4px rgba(0, 0, 0, 0.5), 0 0 12px ${category.color}20`
                        : `0 12px 30px -4px rgba(0, 0, 0, 0.06), 0 0 12px ${category.color}10`,
                  }
                }}
              >
                {/* Header Row */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: '10px',
                      bgcolor: category.bgColor,
                      color: category.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: `0 2px 6px ${category.color}15`,
                    }}
                  >
                    {category.icon}
                  </Box>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      fontFamily: 'var(--font-outfit), system-ui, sans-serif',
                      fontSize: '1rem',
                      letterSpacing: '-0.01em',
                      color: 'text.primary',
                    }}
                  >
                    {category.title}
                  </Typography>
                </Box>

                {/* Tinted Skills Chips */}
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 'auto' }}>
                  {category.skills.map((skill) => (
                    <Chip
                      key={skill}
                      label={skill}
                      size="small"
                      sx={{
                        fontSize: '0.725rem',
                        fontWeight: 600,
                        bgcolor: category.bgColor,
                        border: `1px solid ${category.color}20`,
                        color: (theme) => 
                          theme.palette.mode === 'dark' 
                            ? category.color === '#FCD34D' ? '#FBBF24' : category.color
                            : category.color === '#818CF8' ? '#4F46E5'
                            : category.color === '#34D399' ? '#047857'
                            : category.color === '#C4B5FD' ? '#6D28D9'
                            : category.color === '#FCD34D' ? '#D97706'
                            : category.color === '#F9A8D4' ? '#DB2777'
                            : category.color,
                        px: 0.5,
                        py: 1.5,
                        height: 26,
                        '&:hover': {
                          bgcolor: `${category.color}1a`,
                          borderColor: category.color,
                          color: (theme) => theme.palette.mode === 'dark' ? '#FAFAFA' : '#09090B',
                        },
                      }}
                    />
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
