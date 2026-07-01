'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import { motion } from 'framer-motion';
import { MdTrendingUp, MdComputer, MdAccountTree, MdSecurity, MdLaunch, MdChevronRight } from 'react-icons/md';

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
  liveUrl?: string;
}

export default function Projects() {
  const projectsList: ProjectItem[] = [
    {
      title: 'Bank of Maharashtra – HRMS Portal',
      category: 'Enterprise Fintech',
      company: 'NeoSoft Pvt Ltd',
      icon: <MdComputer size={20} />,
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
      icon: <MdTrendingUp size={20} />,
      highlights: [
        'Designed mobile-first UI modules for a system hosting 4000+ online games.',
        'Built full operator dashboards, showing master admin configurations and game metrics.',
        'Decoupled heavy data-fetching components, minimizing rendering bottlenecks.'
      ],
      metrics: ['30% loading speed increase', '15% user retention gain', '4000+ games integrated'],
      skills: ['React.js', 'Redux Saga', 'JavaScript', 'Bootstrap', 'Axios'],
      color: '#34D399',
      liveUrl: 'https://horasbet.com/',
    },
    {
      title: 'Edjobster (Job Portal Platform)',
      category: 'Full-Stack Portal',
      company: 'Wow InfoBiz',
      icon: <MdAccountTree size={20} />,
      highlights: [
        'Built MongoDB collections, schemas, and Express controllers for job boards.',
        'Structured candidate registration, recruiter dashboard, and admin review modules.',
        'Programmed role-based access control (RBAC) to separate portal functionality.'
      ],
      metrics: ['Full-stack MERN stack', '3 distinct user roles', 'JWT session tokens'],
      skills: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'JWT', 'Postman'],
      color: '#C4B5FD',
      liveUrl: 'https://edjobster.com/',
    },
    {
      title: 'Gulf Pharmacy (Healthcare App)',
      category: 'E-commerce & Dispatch',
      company: 'Wow InfoBiz',
      icon: <MdSecurity size={20} />,
      highlights: [
        'Implemented secure route guards, forgot-password templates, and login states.',
        'Utilized code-splitting (React.lazy) and memoization hooks to improve render speed.',
        'Set up index layouts and structural markup for search engines to crawl.'
      ],
      metrics: ['30% loading time cut', '20% organic traffic gain', 'SEO optimized markup'],
      skills: ['React.js', 'Redux', 'React Router', 'Bootstrap', 'Lazy Loading'],
      color: '#F9A8D4',
      liveUrl: 'https://gulfpharmacy.com/',
    },
  ];

  // Map metrics text to split numeric values from labels for key stat callouts
  const projectDashboardStats: Record<string, Array<{ value: string; label: string }>> = {
    'Bank of Maharashtra – HRMS Portal': [
      { value: 'State-wide', label: 'Deployment' },
      { value: 'Appraisal', label: 'Workflows' },
      { value: 'Dynamic', label: 'Forms Engine' }
    ],
    'White Label 2.0 (Gaming Platform)': [
      { value: '+30%', label: 'UI Load Speed' },
      { value: '+15%', label: 'User Retention' },
      { value: '4000+', label: 'Games Hosted' }
    ],
    'Edjobster (Job Portal Platform)': [
      { value: 'MERN', label: 'Full-Stack' },
      { value: '3 Roles', label: 'RBAC Access' },
      { value: 'JWT', label: 'Token Sessions' }
    ],
    'Gulf Pharmacy (Healthcare App)': [
      { value: '+30%', label: 'UI Speedup' },
      { value: '+20%', label: 'Organic SEO' },
      { value: 'SEO', label: 'Meta Schema' }
    ]
  };

  // Generate beautiful background gradients for card covers based on project accent color
  const getCoverGradient = (color: string) => {
    switch (color) {
      case '#818CF8': // Bank of Maharashtra
        return 'linear-gradient(135deg, #1e1b4b 0%, #312e81 60%, #4338ca 100%)';
      case '#34D399': // White Label
        return 'linear-gradient(135deg, #022c22 0%, #064e3b 60%, #0f766e 100%)';
      case '#C4B5FD': // Edjobster
        return 'linear-gradient(135deg, #2e1065 0%, #4c1d95 60%, #6d28d9 100%)';
      case '#F9A8D4': // Gulf Pharmacy
        return 'linear-gradient(135deg, #500724 0%, #831843 60%, #9d174d 100%)';
      default:
        return 'linear-gradient(135deg, #09090b 0%, #1e293b 100%)';
    }
  };

  return (
    <Box 
      id="projects" 
      className="bg-dot"
      sx={{ 
        py: { xs: 8, md: 12 },
        position: 'relative',
        overflowX: 'hidden',
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
      {/* Background Glow */}
      <Box
        className="animate-glow-pulse"
        sx={{
          position: 'absolute',
          top: '30%',
          left: '5%',
          width: 450,
          height: 450,
          borderRadius: '50%',
          bgcolor: (theme) =>
            theme.palette.mode === 'dark'
              ? 'rgba(129, 140, 248, 0.04)'
              : 'rgba(79, 70, 229, 0.02)',
          filter: 'blur(120px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <SectionHeader
          label="Work"
          title="Featured Projects"
          subtitle="High-volume web portals and enterprise applications built for banking, healthcare, and gaming clients."
        />

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: 4,
          }}
        >
          {projectsList.map((project, idx) => {
            const stats = projectDashboardStats[project.title] || [];
            return (
              <Box key={project.title} sx={{ display: 'flex' }}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  style={{ width: '100%', display: 'flex' }}
                >
                  <GlassCard
                    sx={{
                      width: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      p: 0, // Zero padding for styled card cover
                      borderTop: `3px solid ${project.color}`,
                    }}
                  >
                    {/* Cover / Banner Area */}
                    <Box
                      sx={{
                        height: 120,
                        background: getCoverGradient(project.color),
                        position: 'relative',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        px: 3,
                        overflow: 'hidden',
                        '&::before': {
                          content: '""',
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          backgroundImage: 'radial-gradient(rgba(255,255,255,0.15) 1px, transparent 1px)',
                          backgroundSize: '16px 16px',
                          opacity: 0.35,
                        }
                      }}
                    >
                      <Box sx={{ zIndex: 1 }}>
                        <Typography
                          variant="caption"
                          sx={{
                            color: 'rgba(255,255,255,0.7)',
                            fontSize: '0.7rem',
                            fontWeight: 700,
                            letterSpacing: '0.08em',
                            textTransform: 'uppercase',
                            display: 'block',
                            mb: 0.5,
                          }}
                        >
                          {project.category}
                        </Typography>
                        <Typography
                          variant="h4"
                          sx={{
                            color: '#FFFFFF',
                            fontFamily: 'var(--font-outfit), sans-serif',
                            fontWeight: 800,
                            fontSize: { xs: '1.2rem', md: '1.4rem' },
                            letterSpacing: '-0.02em',
                          }}
                        >
                          {project.title.split(' – ')[0]}
                        </Typography>
                      </Box>

                      {/* Icon overlay */}
                      <Box
                        sx={{
                          width: 48,
                          height: 48,
                          borderRadius: '12px',
                          bgcolor: 'rgba(255, 255, 255, 0.1)',
                          backdropFilter: 'blur(8px)',
                          border: '1px solid rgba(255,255,255,0.15)',
                          color: '#FFFFFF',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          zIndex: 1,
                          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                        }}
                      >
                        {project.icon}
                      </Box>
                    </Box>

                    {/* Content Area */}
                    <Box sx={{ p: { xs: 2.25, md: 3.5 }, display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                      {/* Meta info bar */}
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2.5 }}>
                        <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 650, letterSpacing: '0.04em', textTransform: 'uppercase', fontSize: '0.7rem' }}>
                          Client: {project.company}
                        </Typography>
                        {project.title.includes(' – ') && (
                          <Typography variant="caption" sx={{ fontWeight: 700, color: 'primary.main', bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(129,140,248,0.08)' : 'rgba(79,70,229,0.06)', px: 1, py: 0.5, borderRadius: '4px', fontSize: '0.65rem' }}>
                            {project.title.split(' – ')[1]}
                          </Typography>
                        )}
                      </Box>

                      {/* Case Study Highlights */}
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25, mb: 3.5, flexGrow: 1 }}>
                        {project.highlights.map((highlight, index) => (
                          <Box
                            key={index}
                            sx={{
                              display: 'flex',
                              alignItems: 'flex-start',
                              gap: 1.25,
                            }}
                          >
                            <Box sx={{ display: 'flex', mt: '3px', color: project.color, flexShrink: 0 }}>
                              <MdChevronRight size={16} />
                            </Box>
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              sx={{
                                fontSize: { xs: '0.875rem', md: '0.9rem' },
                                lineHeight: 1.6,
                              }}
                            >
                              {highlight}
                            </Typography>
                          </Box>
                        ))}
                      </Box>

                      {/* Stats Dashboard Block */}
                      <Box
                        sx={{
                          display: 'grid',
                          gridTemplateColumns: 'repeat(3, 1fr)',
                          gap: 1.5,
                          mb: 3.5,
                        }}
                      >
                        {stats.map((stat, sIdx) => (
                          <Box
                            key={sIdx}
                            sx={{
                              bgcolor: (theme) =>
                                theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)',
                              border: (theme) =>
                                `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)'}`,
                              p: { xs: 1, md: 1.5 },
                              borderRadius: '8px',
                              textAlign: 'center',
                              transition: 'all 0.2s ease',
                              '&:hover': {
                                bgcolor: (theme) =>
                                  theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)',
                                borderColor: project.color + '30',
                              }
                            }}
                          >
                            <Typography
                              variant="h6"
                              sx={{
                                fontWeight: 800,
                                color: project.color,
                                fontSize: { xs: '0.85rem', md: '0.95rem' },
                                fontFamily: 'var(--font-outfit), sans-serif',
                                mb: 0.25,
                              }}
                            >
                              {stat.value}
                            </Typography>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                              sx={{
                                fontSize: { xs: '0.6875rem', md: '0.725rem' },
                                fontWeight: 600,
                                textTransform: 'uppercase',
                                letterSpacing: '0.04em',
                                display: 'block',
                                lineHeight: 1.2,
                              }}
                            >
                              {stat.label}
                            </Typography>
                          </Box>
                        ))}
                      </Box>

                      {/* Tech Stack Chips */}
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75, mb: 3 }}>
                        {project.skills.map((skill) => (
                          <Chip
                            key={skill}
                            label={skill}
                            size="small"
                            sx={{
                              fontSize: '0.725rem',
                              fontWeight: 600,
                              height: 24,
                              bgcolor: 'transparent',
                              border: (theme) =>
                                `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`,
                              color: 'text.secondary',
                            }}
                          />
                        ))}
                      </Box>

                      {/* Footer Actions (Live Demo Link) */}
                      <Box
                        sx={{
                          pt: 2.25,
                          borderTop: (theme) => `1px solid ${theme.palette.divider}`,
                          display: 'flex',
                          alignItems: 'center',
                        }}
                      >
                        {project.liveUrl && (
                          <Button
                            component="a"
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            variant="text"
                            size="small"
                            startIcon={<MdLaunch size={14} />}
                            sx={{
                              color: 'text.primary',
                              fontSize: '0.75rem',
                              fontWeight: 700,
                              p: 0,
                              minWidth: 0,
                              minHeight: { xs: 44, md: 'auto' },
                              display: 'inline-flex',
                              alignItems: 'center',
                              '&:hover': {
                                color: project.color,
                                bgcolor: 'transparent',
                              }
                            }}
                          >
                            Live Demo
                          </Button>
                        )}
                      </Box>
                    </Box>
                  </GlassCard>
                </motion.div>
              </Box>
            );
          })}
        </Box>
      </Container>
    </Box>
  );
}
