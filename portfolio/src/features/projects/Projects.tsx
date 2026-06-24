'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { motion } from 'framer-motion';
import { MdTrendingUp, MdComputer, MdAccountTree, MdSecurity } from 'react-icons/md';
import SectionHeader from '@/components/SectionHeader';
import GlassCard from '@/components/GlassCard';

interface ProjectItem {
  title: string;
  category: string;
  company: string;
  icon: React.ReactNode;
  highlights: string[];
  metrics: string[];
  skills: string[];
  color: string;
}

export default function Projects() {
  const projectsList: ProjectItem[] = [
    {
      title: 'Bank of Maharashtra – HRMS Portal',
      category: 'Enterprise Fintech',
      company: 'NeoSoft Pvt Ltd',
      icon: <MdComputer size={18} />,
      highlights: [
        'Developed core modules for Appraisal Management, Promotion cycles, and Talent Pipelines.',
        'Engineered dynamic forms with custom validation schemas for employee self-evaluations.',
        'Created modular, reusable data table views with built-in export actions and client filtering.'
      ],
      metrics: ['Used by bank employees state-wide', 'Validated dynamic forms', 'Enterprise appraisal workflows'],
      skills: ['React.js', 'Redux Toolkit', 'Bootstrap', 'Recharts', 'Axios'],
      color: '#818CF8',
    },
    {
      title: 'White Label 2.0 (Gaming Platform)',
      category: 'High-Traffic Web App',
      company: 'HKB Development',
      icon: <MdTrendingUp size={18} />,
      highlights: [
        'Designed mobile-first UI modules for a system hosting 4000+ online games.',
        'Built full operator dashboards, showing master admin configurations and game metrics.',
        'Decoupled heavy data-fetching components, minimizing rendering bottlenecks.'
      ],
      metrics: ['30% loading speed increase', '15% user retention gain', '4000+ games integrated'],
      skills: ['React.js', 'Redux Saga', 'JavaScript', 'Bootstrap', 'Axios'],
      color: '#34D399',
    },
    {
      title: 'Edjobster (Job Portal Platform)',
      category: 'Full-Stack Portal',
      company: 'Wow InfoBiz',
      icon: <MdAccountTree size={18} />,
      highlights: [
        'Built MongoDB collections, schemas, and Express controllers for job boards.',
        'Structured candidate registration, recruiter dashboard, and admin review modules.',
        'Programmed role-based access control (RBAC) to separate portal functionality.'
      ],
      metrics: ['Full-stack MERN stack', '3 distinct user roles', 'JWT session tokens'],
      skills: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'JWT', 'Postman'],
      color: '#C4B5FD',
    },
    {
      title: 'Gulf Pharmacy (Healthcare App)',
      category: 'E-commerce & Dispatch',
      company: 'Wow InfoBiz',
      icon: <MdSecurity size={18} />,
      highlights: [
        'Implemented secure route guards, forgot-password templates, and login states.',
        'Utilized code-splitting (React.lazy) and memoization hooks to improve render speed.',
        'Set up index layouts and structural markup for search engines to crawl.'
      ],
      metrics: ['30% loading time cut', '20% organic traffic gain', 'SEO optimized markup'],
      skills: ['React.js', 'Redux', 'React Router', 'Bootstrap', 'Lazy Loading'],
      color: '#F9A8D4',
    },
  ];

  return (
    <Box id="projects" sx={{ py: { xs: 8, md: 12 } }}>
      <Container maxWidth="lg">
        <SectionHeader
          label="Work"
          title="Featured Projects"
          subtitle="High-volume web portals and enterprise applications built for banking, healthcare, and gaming clients."
        />

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: 2.5,
          }}
        >
          {projectsList.map((project, idx) => (
            <Box key={project.title} sx={{ display: 'flex' }}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                style={{ width: '100%', display: 'flex' }}
              >
                <GlassCard
                  sx={{
                    p: 3.5,
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    borderTop: `2px solid ${project.color}`,
                  }}
                >
                  {/* Header */}
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      mb: 2,
                    }}
                  >
                    <Typography
                      component="span"
                      sx={{
                        fontSize: '0.6875rem',
                        fontWeight: 500,
                        letterSpacing: '0.06em',
                        textTransform: 'uppercase',
                        color: project.color,
                      }}
                    >
                      {project.category}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500, fontSize: '0.6875rem' }}>
                      {project.company}
                    </Typography>
                  </Box>

                  {/* Title */}
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                    <Box sx={{ color: project.color, display: 'flex' }}>
                      {project.icon}
                    </Box>
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 600,
                        fontSize: { xs: '1.05rem', md: '1.15rem' },
                        fontFamily: 'var(--font-outfit), system-ui, sans-serif',
                      }}
                    >
                      {project.title}
                    </Typography>
                  </Box>

                  {/* Highlights */}
                  <Box component="ul" sx={{ pl: 2, mb: 2.5, color: 'text.secondary', flexGrow: 1 }}>
                    {project.highlights.map((highlight, index) => (
                      <Box
                        component="li"
                        key={index}
                        sx={{
                          mb: 0.8,
                          fontSize: '0.8125rem',
                          lineHeight: 1.65,
                          '&::marker': { color: project.color, fontSize: '0.7rem' },
                        }}
                      >
                        {highlight}
                      </Box>
                    ))}
                  </Box>

                  {/* Metrics */}
                  <Box
                    sx={{
                      bgcolor: (theme) =>
                        theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)',
                      border: (theme) =>
                        `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)'}`,
                      p: 2,
                      borderRadius: 2,
                      mb: 2.5,
                    }}
                  >
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', mb: 1.25, display: 'block', fontSize: '0.625rem' }}
                    >
                      Key Metrics
                    </Typography>
                    <Stack spacing={1}>
                      {project.metrics.map((metric) => (
                        <Box
                          key={metric}
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1.25,
                          }}
                        >
                          <Box
                            sx={{
                              width: 5,
                              height: 5,
                              borderRadius: '50%',
                              bgcolor: project.color,
                              flexShrink: 0,
                              opacity: 0.8,
                            }}
                          />
                          <Typography
                            variant="caption"
                            sx={{
                              fontSize: '0.75rem',
                              fontWeight: 500,
                              color: 'text.primary',
                            }}
                          >
                            {metric}
                          </Typography>
                        </Box>
                      ))}
                    </Stack>
                  </Box>

                  {/* Tech Stack */}
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
                    {project.skills.map((skill) => (
                      <Chip
                        key={skill}
                        label={skill}
                        size="small"
                        sx={{
                          fontSize: '0.6875rem',
                          fontWeight: 500,
                          height: 24,
                          bgcolor: 'transparent',
                          border: (theme) =>
                            `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`,
                          color: 'text.secondary',
                        }}
                      />
                    ))}
                  </Box>
                </GlassCard>
              </motion.div>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
