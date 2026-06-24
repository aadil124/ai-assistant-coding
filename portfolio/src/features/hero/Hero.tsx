'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { motion } from 'framer-motion';
import { MdArrowForward } from 'react-icons/md';
import GlassCard from '@/components/GlassCard';

export default function Hero() {
  const [activeTab, setActiveTab] = React.useState<'profile.json' | 'experience.md' | 'tech.sh'>('profile.json');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const } },
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Box
      id="home"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        pt: { xs: 12, md: 14 },
        pb: { xs: 8, md: 10 },
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Ambient background glow */}
      <Box
        className="animate-glow-pulse"
        sx={{
          position: 'absolute',
          top: '-10%',
          left: '20%',
          width: 500,
          height: 500,
          borderRadius: '50%',
          bgcolor: (theme) =>
            theme.palette.mode === 'dark'
              ? 'rgba(129, 140, 248, 0.06)'
              : 'rgba(79, 70, 229, 0.04)',
          filter: 'blur(120px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      <Box
        className="animate-glow-pulse"
        sx={{
          position: 'absolute',
          bottom: '-5%',
          right: '10%',
          width: 400,
          height: 400,
          borderRadius: '50%',
          bgcolor: (theme) =>
            theme.palette.mode === 'dark'
              ? 'rgba(52, 211, 153, 0.04)'
              : 'rgba(5, 150, 105, 0.03)',
          filter: 'blur(120px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '7fr 5fr' },
            gap: { xs: 5, md: 6 },
            alignItems: 'center',
          }}
        >
          {/* Left Text */}
          <Box>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Status Badge */}
              <motion.div variants={itemVariants} style={{ display: 'inline-block' }}>
                <Box
                  sx={{
                    color: (theme) =>
                      theme.palette.mode === 'dark' ? '#34D399' : '#059669',
                    px: 2,
                    py: 0.625,
                    borderRadius: '20px',
                    fontWeight: 500,
                    fontSize: '0.75rem',
                    letterSpacing: '0.02em',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 1,
                    mb: 3,
                    bgcolor: (theme) =>
                      theme.palette.mode === 'dark'
                        ? 'rgba(52, 211, 153, 0.06)'
                        : 'rgba(5, 150, 105, 0.05)',
                    border: (theme) =>
                      `1px solid ${theme.palette.mode === 'dark' ? 'rgba(52, 211, 153, 0.15)' : 'rgba(5, 150, 105, 0.12)'}`,
                  }}
                >
                  <Box
                    sx={{
                      width: 6,
                      height: 6,
                      borderRadius: '50%',
                      bgcolor: '#10B981',
                      boxShadow: '0 0 6px #10B981',
                    }}
                  />
                  Available for Senior Web & MERN Roles
                </Box>
              </motion.div>

              {/* Headline */}
              <motion.div variants={itemVariants}>
                <Typography
                  variant="h1"
                  component="h1"
                  sx={{
                    fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4rem' },
                    fontWeight: 800,
                    lineHeight: 1.1,
                    mb: 1.5,
                    fontFamily: 'var(--font-outfit), system-ui, sans-serif',
                    letterSpacing: '-0.025em',
                  }}
                >
                  Hi, I&apos;m <span className="text-gradient">Mohd Adil</span>
                </Typography>
              </motion.div>

              {/* Subtitle */}
              <motion.div variants={itemVariants}>
                <Typography
                  variant="h3"
                  component="h2"
                  sx={{
                    fontSize: { xs: '1.25rem', sm: '1.5rem', md: '1.75rem' },
                    fontWeight: 500,
                    color: 'text.secondary',
                    mb: 2.5,
                    lineHeight: 1.3,
                    letterSpacing: '-0.01em',
                  }}
                >
                  Senior Full Stack Developer
                </Typography>
              </motion.div>

              {/* Description */}
              <motion.div variants={itemVariants}>
                <Typography
                  variant="body1"
                  component="p"
                  color="text.secondary"
                  sx={{
                    fontSize: { xs: '0.875rem', md: '0.9375rem' },
                    mb: 4,
                    maxWidth: 520,
                    lineHeight: 1.75,
                  }}
                >
                  Crafting high-performance dashboards, optimizing complex app router workflows, and engineering secure, scalable full-stack web applications.
                </Typography>
              </motion.div>

              {/* CTAs */}
              <motion.div variants={itemVariants}>
                <Stack
                  direction={{ xs: 'column', sm: 'row' }}
                  spacing={1.5}
                >
                  <Button
                    onClick={() => scrollToSection('contact')}
                    variant="contained"
                    size="large"
                    endIcon={<MdArrowForward />}
                    sx={{
                      px: 3,
                      py: 1.5,
                      fontSize: '0.875rem',
                    }}
                  >
                    Get in Touch
                  </Button>
                  <Button
                    onClick={() => scrollToSection('projects')}
                    variant="outlined"
                    size="large"
                    color="primary"
                    sx={{
                      px: 3,
                      py: 1.5,
                      fontSize: '0.875rem',
                    }}
                  >
                    View Projects
                  </Button>
                </Stack>
              </motion.div>
            </motion.div>
          </Box>

          {/* Right Console */}
          <Box sx={{ position: 'relative' }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <GlassCard
                sx={{
                  overflow: 'hidden',
                  '&:hover': { transform: 'none' },
                }}
              >
                {/* Window Header */}
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    bgcolor: (theme) =>
                      theme.palette.mode === 'dark' ? '#27272A' : '#F4F4F5',
                    px: { xs: 1.5, md: 2 },
                    py: 0.875,
                    borderBottom: (theme) =>
                      `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)'}`,
                  }}
                >
                  <Box sx={{ display: 'flex', gap: 0.75, alignItems: 'center' }}>
                    <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#EF4444' }} />
                    <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#F59E0B' }} />
                    <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#22C55E' }} />
                  </Box>

                  {/* Tabs */}
                  <Box sx={{ display: 'flex', gap: 0.25 }}>
                    {(['profile.json', 'experience.md', 'tech.sh'] as const).map((tab) => (
                      <Box
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        sx={{
                          px: 1.25,
                          py: 0.5,
                          borderRadius: '5px',
                          cursor: 'pointer',
                          fontFamily: 'monospace',
                          fontSize: '0.6875rem',
                          fontWeight: activeTab === tab ? 600 : 400,
                          bgcolor: (theme) =>
                            activeTab === tab
                              ? theme.palette.mode === 'dark' ? '#18181B' : '#FFFFFF'
                              : 'transparent',
                          color: (theme) =>
                            activeTab === tab
                              ? theme.palette.mode === 'dark' ? '#FAFAFA' : '#09090B'
                              : theme.palette.mode === 'dark' ? '#71717A' : '#A1A1AA',
                          transition: 'all 0.15s ease',
                          '&:hover': {
                            color: (theme) =>
                              theme.palette.mode === 'dark' ? '#D4D4D8' : '#52525B',
                          },
                        }}
                      >
                        {tab}
                      </Box>
                    ))}
                  </Box>

                  <Box sx={{ width: 30, display: { xs: 'none', md: 'block' } }} />
                </Box>

                {/* Code Body */}
                <Box sx={{ p: { xs: 2, md: 2.5 }, minHeight: 260, overflowX: 'auto', whiteSpace: 'pre' }}>
                  {activeTab === 'profile.json' && (
                    <Typography
                      component="pre"
                      sx={(theme) => ({
                        fontFamily: '"JetBrains Mono", "Fira Code", monospace',
                        fontSize: { xs: '0.75rem', md: '0.8125rem' },
                        lineHeight: 1.7,
                        m: 0,
                        color: theme.palette.mode === 'dark' ? '#D4D4D8' : '#3F3F46',
                        '& .key': {
                          color: theme.palette.mode === 'dark' ? '#C4B5FD' : '#7C3AED',
                          fontWeight: 500,
                        },
                        '& .string': {
                          color: theme.palette.mode === 'dark' ? '#6EE7B7' : '#059669',
                        },
                        '& .number': {
                          color: theme.palette.mode === 'dark' ? '#FCD34D' : '#D97706',
                        },
                        '& .bracket': {
                          color: theme.palette.mode === 'dark' ? '#A1A1AA' : '#71717A',
                        },
                      })}
                    >
                      <span className="bracket">{'{'}</span>
                      {'\n  '}
                      <span className="key">{'"name"'}</span>: <span className="string">{'"Mohd Adil Ansari"'}</span>,
                      {'\n  '}
                      <span className="key">{'"role"'}</span>: <span className="string">{'"Senior Full Stack Developer"'}</span>,
                      {'\n  '}
                      <span className="key">{'"focus"'}</span>: <span className="string">{'"Scalable MERN Architectures"'}</span>,
                      {'\n  '}
                      <span className="key">{'"metrics"'}</span>: <span className="bracket">{'{'}</span>
                      {'\n    '}
                      <span className="key">{'"loadingSpeed"'}</span>: <span className="string">{'"+30% Increase"'}</span>,
                      {'\n    '}
                      <span className="key">{'"gamesManaged"'}</span>: <span className="number">4000</span>
                      {'\n  '}
                      <span className="bracket">{'}'}</span>
                      {'\n'}
                      <span className="bracket">{'}'}</span>
                    </Typography>
                  )}

                  {activeTab === 'experience.md' && (
                    <Typography
                      component="pre"
                      sx={(theme) => ({
                        fontFamily: '"JetBrains Mono", "Fira Code", monospace',
                        fontSize: { xs: '0.75rem', md: '0.8125rem' },
                        lineHeight: 1.7,
                        m: 0,
                        color: theme.palette.mode === 'dark' ? '#A1A1AA' : '#52525B',
                        '& .title': {
                          color: theme.palette.mode === 'dark' ? '#C4B5FD' : '#7C3AED',
                          fontWeight: 600,
                        },
                        '& .bullet': {
                          color: theme.palette.mode === 'dark' ? '#818CF8' : '#4F46E5',
                          fontWeight: 600,
                        },
                        '& .highlight': {
                          color: theme.palette.mode === 'dark' ? '#6EE7B7' : '#059669',
                        },
                      })}
                    >
                      <span className="title"># Experience Highlights</span>
                      {'\n\n'}
                      <span className="bullet">*</span> <span className="highlight">NeoSoft (Present)</span>
                      {'\n  '}
                      - Built core HRMS modules for Bank of Maharashtra.
                      {'\n  '}
                      - Engineered dynamic appraisal forms.
                      {'\n\n'}
                      <span className="bullet">*</span> <span className="highlight">HKB Development (2024 - 2025)</span>
                      {'\n  '}
                      - Restructured microservices for gaming panels.
                      {'\n  '}
                      - Increased web vitals loading speed by 30%.
                    </Typography>
                  )}

                  {activeTab === 'tech.sh' && (
                    <Typography
                      component="pre"
                      sx={(theme) => ({
                        fontFamily: '"JetBrains Mono", "Fira Code", monospace',
                        fontSize: { xs: '0.75rem', md: '0.8125rem' },
                        lineHeight: 1.7,
                        m: 0,
                        color: theme.palette.mode === 'dark' ? '#A1A1AA' : '#52525B',
                        '& .cmd': {
                          color: theme.palette.mode === 'dark' ? '#818CF8' : '#4F46E5',
                          fontWeight: 600,
                        },
                        '& .success': {
                          color: theme.palette.mode === 'dark' ? '#6EE7B7' : '#059669',
                        },
                        '& .warning': {
                          color: theme.palette.mode === 'dark' ? '#FCD34D' : '#D97706',
                        },
                      })}
                    >
                      <span className="cmd">$</span> ./list_skills.sh
                      {'\n'}
                      Listing core stack competencies...
                      {'\n\n'}
                      <span className="success">[Frontend]</span> React.js, NextJS (App Router), TS, Redux
                      {'\n'}
                      <span className="success">[Backend] </span> Node.js, Express.js, MongoDB, JWT, RBAC
                      {'\n'}
                      <span className="success">[Libraries]</span> Material-UI (MUI), Recharts, Axios
                      {'\n\n'}
                      <span className="warning">[Status]</span> Recruiter connection channels verified.
                    </Typography>
                  )}
                </Box>
              </GlassCard>
            </motion.div>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
