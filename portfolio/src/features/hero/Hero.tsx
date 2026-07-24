'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { motion } from 'framer-motion';
import { MdArrowForward } from 'react-icons/md';
import { SiJson, SiMarkdown } from 'react-icons/si';
import { VscFiles, VscSearch, VscSourceControl, VscSettingsGear, VscTerminal } from 'react-icons/vsc';
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
      className="bg-grid"
      sx={{
        minHeight: { xs: 'auto', md: '80vh', lg: '75vh' },
        display: 'flex',
        alignItems: 'center',
        pt: { xs: 8, md: 10 },
        pb: { xs: 4, md: 6 },
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Ambient background glow mesh */}
      <Box
        className="animate-glow-pulse"
        sx={{
          position: 'absolute',
          top: '-15%',
          left: '10%',
          width: { xs: 350, md: 600 },
          height: { xs: 350, md: 600 },
          borderRadius: '50%',
          bgcolor: (theme) =>
            theme.palette.mode === 'dark'
              ? 'rgba(129, 140, 248, 0.08)'
              : 'rgba(79, 70, 229, 0.05)',
          filter: 'blur(130px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      <Box
        className="animate-glow-pulse"
        sx={{
          position: 'absolute',
          bottom: '-10%',
          right: '5%',
          width: { xs: 300, md: 500 },
          height: { xs: 300, md: 500 },
          borderRadius: '50%',
          bgcolor: (theme) =>
            theme.palette.mode === 'dark'
              ? 'rgba(52, 211, 153, 0.06)'
              : 'rgba(5, 150, 105, 0.04)',
          filter: 'blur(130px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '6.5fr 5.5fr' },
            gap: { xs: 6, md: 7 },
            alignItems: 'center',
          }}
        >
          {/* Left Text */}
          <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
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
                    py: 0.75,
                    borderRadius: '30px',
                    fontWeight: 600,
                    fontSize: '0.725rem',
                    letterSpacing: '0.04em',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 1.25,
                    mb: 3,
                    bgcolor: (theme) =>
                      theme.palette.mode === 'dark'
                        ? 'rgba(52, 211, 153, 0.06)'
                        : 'rgba(5, 150, 105, 0.05)',
                    border: (theme) =>
                      `1px solid ${theme.palette.mode === 'dark' ? 'rgba(52, 211, 153, 0.18)' : 'rgba(5, 150, 105, 0.15)'}`,
                    boxShadow: (theme) =>
                      theme.palette.mode === 'dark'
                        ? '0 2px 10px rgba(52, 211, 153, 0.08)'
                        : '0 2px 10px rgba(5, 150, 105, 0.05)',
                  }}
                >
                  <Box
                    sx={{
                      width: 7,
                      height: 7,
                      borderRadius: '50%',
                      bgcolor: '#10B981',
                      boxShadow: '0 0 8px #10B981',
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
                    fontSize: { xs: '2.15rem', sm: '3.25rem', md: '4.25rem' },
                    fontWeight: 900,
                    lineHeight: 1.1,
                    mb: 2,
                    fontFamily: 'var(--font-outfit), system-ui, sans-serif',
                    letterSpacing: '-0.035em',
                  }}
                >
                  Hi, I&apos;m <span className="text-gradient">Mohd Adil Ansari</span>
                </Typography>
              </motion.div>

              {/* Subtitle */}
              <motion.div variants={itemVariants}>
                <Typography
                  variant="h3"
                  component="h2"
                  sx={{
                    fontSize: { xs: '1.35rem', sm: '1.65rem', md: '1.85rem' },
                    fontWeight: 650,
                    color: 'text.secondary',
                    mb: 3,
                    lineHeight: 1.3,
                    letterSpacing: '-0.015em',
                  }}
                >
                  Frontend Developer (React Js Developer)
                </Typography>
              </motion.div>

              {/* Description */}
              <motion.div variants={itemVariants}>
                <Typography
                  variant="body1"
                  component="p"
                  color="text.secondary"
                  sx={{
                    fontSize: { xs: '0.875rem', md: '0.975rem' },
                    mb: 4.5,
                    maxWidth: 540,
                    lineHeight: 1.8,
                  }}
                >
                  Frontend Engineer with 4+ years of professional experience specializing in building responsive, high-performance web applications with React, TypeScript, Redux Toolkit, and Material UI.
                </Typography>
              </motion.div>

              {/* CTAs */}
              <motion.div variants={itemVariants}>
                <Stack
                  direction={{ xs: 'column', sm: 'row' }}
                  spacing={2}
                  sx={{
                    alignItems: 'center',
                    justifyContent: { xs: 'center', md: 'flex-start' },
                    width: '100%'
                  }}
                >
                  <Button
                    onClick={() => scrollToSection('contact')}
                    variant="contained"
                    size="large"
                    endIcon={<MdArrowForward />}
                    sx={{
                      px: 3.5,
                      py: 1.625,
                      fontSize: '0.875rem',
                      letterSpacing: '-0.01em',
                      width: { xs: '100%', sm: 'auto' },
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
                      px: 3.5,
                      py: 1.625,
                      fontSize: '0.875rem',
                      letterSpacing: '-0.01em',
                      width: { xs: '100%', sm: 'auto' },
                    }}
                  >
                    View Projects
                  </Button>
                </Stack>
              </motion.div>
            </motion.div>
          </Box>

          {/* Right Polished IDE */}
          <Box sx={{ position: 'relative', minWidth: 0 }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <GlassCard
                sx={{
                  overflow: 'hidden',
                  display: 'flex',
                  width: '100%',
                  minWidth: 0,
                  '&:hover': { transform: 'none', boxShadow: (theme) => theme.palette.mode === 'dark' ? '0 16px 40px rgba(0,0,0,0.6)' : '0 16px 40px rgba(0,0,0,0.08)' },
                  bgcolor: (theme) => theme.palette.mode === 'dark' ? '#0D0D11' : '#FFFFFF',
                  border: (theme) => theme.palette.mode === 'dark' ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(0,0,0,0.06)',
                  boxShadow: (theme) => theme.palette.mode === 'dark' ? '0 10px 30px rgba(0,0,0,0.5)' : '0 10px 30px rgba(0,0,0,0.04)',
                }}
              >
                {/* Visual Sidebar */}
                <Box
                  sx={{
                    width: 48,
                    bgcolor: (theme) => theme.palette.mode === 'dark' ? '#08080A' : '#F1F5F9',
                    borderRight: (theme) => `1px solid ${theme.palette.divider}`,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    py: 2,
                    justifyContent: 'space-between',
                  }}
                >
                  <Stack spacing={2.5} sx={{ alignItems: 'center' }}>
                    <Box sx={{ color: 'primary.main', opacity: 0.95, cursor: 'pointer', display: 'flex' }}>
                      <VscFiles size={20} />
                    </Box>
                    <Box sx={{ color: 'text.secondary', opacity: 0.6, cursor: 'pointer', display: 'flex', '&:hover': { opacity: 0.9 } }}>
                      <VscSearch size={20} />
                    </Box>
                    <Box sx={{ color: 'text.secondary', opacity: 0.6, cursor: 'pointer', display: 'flex', '&:hover': { opacity: 0.9 } }}>
                      <VscSourceControl size={20} />
                    </Box>
                  </Stack>
                  <Box sx={{ color: 'text.secondary', opacity: 0.5, cursor: 'pointer', display: 'flex', '&:hover': { opacity: 0.8 } }}>
                    <VscSettingsGear size={18} />
                  </Box>
                </Box>

                {/* Code Window Area */}
                <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                  {/* Window Header */}
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      bgcolor: (theme) =>
                        theme.palette.mode === 'dark' ? '#09090C' : '#F8FAFC',
                      borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
                      px: 2,
                      py: 0,
                      height: 38,
                    }}
                  >
                    {/* Window Controls */}
                    <Box sx={{ display: 'flex', gap: 0.75, alignItems: 'center', mr: 3 }}>
                      <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#EF4444' }} />
                      <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#F59E0B' }} />
                      <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#22C55E' }} />
                    </Box>

                    {/* Tabs */}
                    <Box
                      sx={{
                        display: 'flex',
                        gap: 0.5,
                        height: '100%',
                        alignItems: 'flex-end',
                        overflowX: 'auto',
                        whiteSpace: 'nowrap',
                        width: '100%',
                        '&::-webkit-scrollbar': { display: 'none' },
                        msOverflowStyle: 'none',
                        scrollbarWidth: 'none',
                      }}
                    >
                      {(['profile.json', 'experience.md', 'tech.sh'] as const).map((tab) => {
                        const isActive = activeTab === tab;
                        return (
                          <Box
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            sx={{
                              px: 1.75,
                              height: 30,
                              display: 'flex',
                              alignItems: 'center',
                              gap: 1.25,
                              flexShrink: 0,
                              borderTopLeftRadius: '6px',
                              borderTopRightRadius: '6px',
                              cursor: 'pointer',
                              fontFamily: 'monospace',
                              fontSize: '0.725rem',
                              fontWeight: isActive ? 600 : 400,
                              bgcolor: (theme) =>
                                isActive
                                  ? theme.palette.mode === 'dark' ? '#0D0D11' : '#FFFFFF'
                                  : 'transparent',
                              color: (theme) =>
                                isActive
                                  ? theme.palette.mode === 'dark' ? '#FAFAFA' : '#0F172A'
                                  : theme.palette.mode === 'dark' ? '#64748B' : '#94A3B8',
                              border: (theme) =>
                                isActive
                                  ? `1px solid ${theme.palette.divider}`
                                  : '1px solid transparent',
                              borderBottom: (theme) =>
                                isActive
                                  ? `1px solid ${theme.palette.mode === 'dark' ? '#0D0D11' : '#FFFFFF'}`
                                  : '1px solid transparent',
                              transition: 'all 0.15s ease',
                              '&:hover': {
                                color: (theme) =>
                                  theme.palette.mode === 'dark' ? '#E2E8F0' : '#475569',
                              },
                            }}
                          >
                            {/* File icon */}
                            {tab === 'profile.json' && <SiJson size={11} color="#F59E0B" />}
                            {tab === 'experience.md' && <SiMarkdown size={11} color="#38BDF8" />}
                            {tab === 'tech.sh' && <VscTerminal size={11} color="#4ADE80" />}

                            {tab}
                          </Box>
                        );
                      })}
                    </Box>
                  </Box>

                  {/* Code Body with Line Numbers */}
                  <Box
                    sx={{
                      p: 2.5,
                      minHeight: 270,
                      overflowX: 'auto',
                      display: 'flex',
                      bgcolor: (theme) => theme.palette.mode === 'dark' ? '#0D0D11' : '#FFFFFF',
                    }}
                  >
                    {/* Line numbers column */}
                    <Box
                      sx={{
                        pr: 2,
                        borderRight: (theme) => `1px solid ${theme.palette.divider}`,
                        textAlign: 'right',
                        color: 'text.secondary',
                        opacity: 0.35,
                        userSelect: 'none',
                        fontFamily: '"JetBrains Mono", "Fira Code", monospace',
                        fontSize: { xs: '0.725rem', md: '0.775rem' },
                        lineHeight: 1.7,
                      }}
                    >
                      {activeTab === 'profile.json' && ['1', '2', '3', '4', '5', '6', '7', '8', '9'].map(n => <div key={n}>{n}</div>)}
                      {activeTab === 'experience.md' && ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'].map(n => <div key={n}>{n}</div>)}
                      {activeTab === 'tech.sh' && ['1', '2', '3', '4', '5', '6', '7', '8', '9'].map(n => <div key={n}>{n}</div>)}
                    </Box>

                    {/* Actual code snippets */}
                    <Box sx={{ pl: 2, minWidth: 0, overflowX: 'auto', whiteSpace: 'pre' }}>
                      {activeTab === 'profile.json' && (
                        <Typography
                          component="pre"
                          sx={(theme) => ({
                            fontFamily: '"JetBrains Mono", "Fira Code", monospace',
                            fontSize: { xs: '0.725rem', md: '0.775rem' },
                            lineHeight: 1.7,
                            m: 0,
                            color: theme.palette.mode === 'dark' ? '#E2E8F0' : '#334155',
                            '& .key': {
                              color: theme.palette.mode === 'dark' ? '#F43F5E' : '#E11D48',
                              fontWeight: 500,
                            },
                            '& .string': {
                              color: theme.palette.mode === 'dark' ? '#34D399' : '#059669',
                            },
                            '& .number': {
                              color: theme.palette.mode === 'dark' ? '#FB923C' : '#EA580C',
                            },
                            '& .bracket': {
                              color: theme.palette.mode === 'dark' ? '#94A3B8' : '#64748B',
                            },
                          })}
                        >
                          <span className="bracket">{'{'}</span>
                          {'\n  '}
                          <span className="key">{'"name"'}</span>: <span className="string">{'"Mohd Adil Ansari"'}</span>,
                          {'\n  '}
                          <span className="key">{'"role"'}</span>: <span className="string">{'"Frontend Developer (React Js Developer)"'}</span>,
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
                            fontSize: { xs: '0.725rem', md: '0.775rem' },
                            lineHeight: 1.7,
                            m: 0,
                            color: theme.palette.mode === 'dark' ? '#E2E8F0' : '#334155',
                            '& .title': {
                              color: theme.palette.mode === 'dark' ? '#818CF8' : '#4F46E5',
                              fontWeight: 700,
                            },
                            '& .bullet': {
                              color: theme.palette.mode === 'dark' ? '#F43F5E' : '#E11D48',
                              fontWeight: 650,
                            },
                            '& .highlight': {
                              color: theme.palette.mode === 'dark' ? '#34D399' : '#059669',
                              fontWeight: 600,
                            },
                          })}
                        >
                          <span className="title"># Experience Highlights</span>
                          {'\n\n'}
                          <span className="bullet">*</span> <span className="highlight">NeoSoft (Present)</span>
                          {'\n  '}
                          - Built core HRMS modules for a leading public sector bank.
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
                            fontSize: { xs: '0.725rem', md: '0.775rem' },
                            lineHeight: 1.7,
                            m: 0,
                            color: theme.palette.mode === 'dark' ? '#E2E8F0' : '#334155',
                            '& .cmd': {
                              color: theme.palette.mode === 'dark' ? '#818CF8' : '#4F46E5',
                              fontWeight: 600,
                            },
                            '& .success': {
                              color: theme.palette.mode === 'dark' ? '#34D399' : '#059669',
                              fontWeight: 600,
                            },
                            '& .warning': {
                              color: theme.palette.mode === 'dark' ? '#FB923C' : '#EA580C',
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
                  </Box>
                </Box>
              </GlassCard>
            </motion.div>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
