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
  MdStorage 
} from 'react-icons/md';
import SectionHeader from '@/components/SectionHeader';
import GlassCard from '@/components/GlassCard';

export default function Skills() {
  const skillCategories = [
    {
      title: 'Frontend Technologies',
      icon: <MdCode size={28} />,
      skills: ['React.js', 'NextJS', 'TypeScript', 'JavaScript (ES6+)', 'HTML5', 'CSS3'],
      color: '#3B82F6', // Blue
    },
    {
      title: 'Backend Engineering',
      icon: <MdStorage size={28} />,
      skills: ['Node.js', 'Express.js', 'MongoDB', 'Mongoose', 'REST API Design', 'JWT Auth', 'RBAC (Access Control)'],
      color: '#10B981', // Emerald
    },
    {
      title: 'State Management',
      icon: <MdSettings size={28} />,
      skills: ['Redux Toolkit', 'Redux Saga', 'Context API', 'Redux (Core)'],
      color: '#A78BFA', // Purple
    },
    {
      title: 'UI Frameworks',
      icon: <MdLayers size={28} />,
      skills: ['Material UI (MUI)', 'Tailwind CSS', 'Bootstrap', 'Ant Design'],
      color: '#F59E0B', // Amber
    },
    {
      title: 'Developer Tools',
      icon: <MdBuild size={28} />,
      skills: ['Git & GitHub', 'GitLab', 'Jira', 'Postman', 'VS Code', 'Chrome DevTools'],
      color: '#EC4899', // Pink
    },
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: i * 0.1,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    }),
  };

  return (
    <Box id="skills" sx={{ py: { xs: 10, md: 14 } }}>
      <Container maxWidth="lg">
        <SectionHeader
          title="Skills & Toolkit"
          subtitle="A categorized summary of the frontend systems, backend servers, libraries, and DevOps tools I use."
        />

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
            gap: 3.5,
          }}
        >
          {skillCategories.map((category, idx) => (
            <motion.div
              key={category.title}
              custom={idx}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              variants={cardVariants}
              style={{ width: '100%', display: 'flex' }}
            >
              <GlassCard
                sx={{
                  p: 3.5,
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  overflow: 'hidden',
                  '&:hover': {
                    '& .category-icon': {
                      transform: 'scale(1.15) rotate(5deg)',
                      color: category.color,
                    },
                  },
                }}
              >
                {/* Decorative corner color bar */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '4px',
                    height: '100%',
                    bgcolor: category.color,
                  }}
                />

                {/* Icon & Title */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
                  <Box
                    className="category-icon"
                    sx={{
                      color: 'text.secondary',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    {category.icon}
                  </Box>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      fontFamily: 'var(--font-outfit), sans-serif',
                      fontSize: '1.15rem',
                    }}
                  >
                    {category.title}
                  </Typography>
                </Box>

                {/* Skills List */}
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.2, mt: 'auto' }}>
                  {category.skills.map((skill) => (
                    <Box
                      key={skill}
                      sx={{
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        bgcolor: (theme) =>
                          theme.palette.mode === 'dark'
                            ? 'rgba(255, 255, 255, 0.03)'
                            : 'rgba(0, 0, 0, 0.03)',
                        border: (theme) =>
                          `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`,
                        color: 'text.secondary',
                        px: 1.5,
                        py: 0.8,
                        borderRadius: 2,
                        transition: 'all 0.25s ease',
                        '&:hover': {
                          color: 'white',
                          bgcolor: category.color,
                          borderColor: category.color,
                          transform: 'translateY(-2px)',
                          boxShadow: `0 4px 12px ${category.color}30`,
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
