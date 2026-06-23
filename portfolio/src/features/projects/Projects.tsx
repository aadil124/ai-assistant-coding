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
      icon: <MdComputer size={24} />,
      highlights: [
        'Developed core modules for Appraisal Management, Promotion cycles, and Talent Pipelines.',
        'Engineered dynamic forms with custom validation schemas for employee self-evaluations.',
        'Created modular, reusable data table views with built-in export actions and client filtering.'
      ],
      metrics: ['Used by bank employees state-wide', 'Validated dynamic forms', 'Enterprise appraisal workflows'],
      skills: ['React.js', 'Redux Toolkit', 'Bootstrap', 'Recharts', 'Axios'],
      color: '#3B82F6', // Blue
    },
    {
      title: 'White Label 2.0 (Gaming Platform)',
      category: 'High-Traffic Web App',
      company: 'HKB Development',
      icon: <MdTrendingUp size={24} />,
      highlights: [
        'Designed mobile-first UI modules for a system hosting 4000+ online games.',
        'Built full operator dashboards, showing master admin configurations and game metrics.',
        'Decoupled heavy data-fetching components, minimizing rendering bottlenecks.'
      ],
      metrics: ['30% loading speed increase', '15% user retention gain', '4000+ games integrated'],
      skills: ['React.js', 'Redux Saga', 'JavaScript', 'Bootstrap', 'Axios'],
      color: '#10B981', // Emerald
    },
    {
      title: 'Edjobster (Job Portal Platform)',
      category: 'Full-Stack Web Portal',
      company: 'Wow InfoBiz',
      icon: <MdAccountTree size={24} />,
      highlights: [
        'Built MongoDB collections, schemas, and Express controllers for job boards.',
        'Structured candidate registration, recruiter dashboard, and admin review modules.',
        'Programmed role-based access control (RBAC) to separate portal functionality.'
      ],
      metrics: ['Full-stack MERN stack', '3 distinct user roles', 'JWT session tokens'],
      skills: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'JWT', 'Postman'],
      color: '#A78BFA', // Purple
    },
    {
      title: 'Gulf Pharmacy (Healthcare App)',
      category: 'E-commerce & Dispatch',
      company: 'Wow InfoBiz',
      icon: <MdSecurity size={24} />,
      highlights: [
        'Implemented secure route guards, forgot-password templates, and login states.',
        'Utilized code-splitting (React.lazy) and memoization hooks to improve render speed.',
        'Set up index layouts and structural markup for search engines to crawl.'
      ],
      metrics: ['30% loading time cut', '20% organic traffic gain', 'SEO optimized markup'],
      skills: ['React.js', 'Redux', 'React Router', 'Bootstrap', 'Lazy Loading'],
      color: '#EC4899', // Pink
    },
  ];

  return (
    <Box id="projects" sx={{ py: { xs: 10, md: 14 }, bgcolor: 'background.default' }}>
      <Container maxWidth="lg">
        <SectionHeader
          title="Featured Projects"
          subtitle="A selection of high-volume web portals and enterprise applications built for banking, healthcare, and gaming clients."
        />

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: 4,
          }}
        >
          {projectsList.map((project, idx) => (
            <Box key={project.title} sx={{ display: 'flex' }}>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.7, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] as const }}
                style={{ width: '100%', display: 'flex' }}
              >
                <GlassCard
                  sx={{
                    p: 4,
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    borderTop: `4px solid ${project.color}`,
                  }}
                >
                  {/* Category Header */}
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      mb: 2.5,
                    }}
                  >
                    <Typography
                      variant="caption"
                      sx={{
                        bgcolor: `${project.color}15`,
                        color: project.color,
                        px: 1.5,
                        py: 0.6,
                        borderRadius: 1.5,
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                      }}
                    >
                      {project.category}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                      {project.company}
                    </Typography>
                  </Box>

                  {/* Project Title */}
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 700,
                      fontSize: { xs: '1.25rem', md: '1.5rem' },
                      mb: 2,
                      fontFamily: 'var(--font-outfit), sans-serif',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1.5,
                    }}
                  >
                    <Box sx={{ color: project.color, display: 'flex' }}>{project.icon}</Box>
                    {project.title}
                  </Typography>

                  {/* Highlights Bullet List */}
                  <Box component="ul" sx={{ pl: 2, mb: 3.5, color: 'text.secondary', flexGrow: 1 }}>
                    {project.highlights.map((highlight, index) => (
                      <Box
                        component="li"
                        key={index}
                        sx={{
                          mb: 1.2,
                          fontSize: '0.9rem',
                          lineHeight: 1.6,
                          '&::marker': { color: project.color },
                        }}
                      >
                        {highlight}
                      </Box>
                    ))}
                  </Box>

                  {/* Key Metrics / Achievements */}
                  <Box
                    sx={{
                      bgcolor: (theme) =>
                        theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.15)' : 'rgba(0,0,0,0.02)',
                      border: (theme) =>
                        `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)'}`,
                      p: 2,
                      borderRadius: 3,
                      mb: 3.5,
                    }}
                  >
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', mb: 1, display: 'block' }}
                    >
                      Key Performance Metrics
                    </Typography>
                    <Stack spacing={1}>
                      {project.metrics.map((metric) => (
                        <Box
                          key={metric}
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                          }}
                        >
                          <Box
                            sx={{
                              width: 6,
                              height: 6,
                              borderRadius: '50%',
                              bgcolor: project.color,
                              flexShrink: 0,
                            }}
                          />
                          <Typography
                            variant="body2"
                            sx={{
                              fontSize: '0.85rem',
                              fontWeight: 600,
                              color: 'text.primary',
                            }}
                          >
                            {metric}
                          </Typography>
                        </Box>
                      ))}
                    </Stack>
                  </Box>

                  {/* Tech stack chips */}
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {project.skills.map((skill) => (
                      <Chip
                        key={skill}
                        label={skill}
                        size="small"
                        sx={{
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          bgcolor: 'transparent',
                          border: (theme) =>
                            `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
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
