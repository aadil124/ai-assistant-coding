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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const } },
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
        pt: { xs: 12, md: 16 },
        pb: { xs: 8, md: 10 },
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Visual background glow elements */}
      <Box
        sx={{
          position: 'absolute',
          top: '20%',
          left: '10%',
          width: 300,
          height: 300,
          borderRadius: '50%',
          bgcolor: 'rgba(59, 130, 246, 0.08)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '20%',
          right: '10%',
          width: 300,
          height: 300,
          borderRadius: '50%',
          bgcolor: 'rgba(16, 185, 129, 0.06)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '7fr 5fr' },
            gap: { xs: 5, md: 8 },
            alignItems: 'center',
          }}
        >
          {/* Left Text Column */}
          <Box>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Top Greeting Badge */}
              <motion.div variants={itemVariants} style={{ display: 'inline-block' }}>
                <Typography
                  variant="subtitle2"
                  sx={{
                    bgcolor: (theme) =>
                      theme.palette.mode === 'dark' ? 'rgba(59, 130, 246, 0.1)' : 'rgba(37, 99, 235, 0.06)',
                    color: 'primary.main',
                    px: 2,
                    py: 0.8,
                    borderRadius: 2,
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                    display: 'inline-block',
                    mb: 3,
                  }}
                >
                  Available for Senior Web & MERN Roles
                </Typography>
              </motion.div>

              {/* Main Headline */}
              <motion.div variants={itemVariants}>
                <Typography
                  variant="h1"
                  component="h1"
                  sx={{
                    fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4rem' },
                    lineHeight: 1.1,
                    mb: 2,
                    fontFamily: 'var(--font-outfit), sans-serif',
                  }}
                >
                  Hi, I&apos;m <span className="text-gradient">Mohd Adil</span>
                </Typography>
              </motion.div>

              {/* Sub-headline / Core Pitch */}
              <motion.div variants={itemVariants}>
                <Typography
                  variant="h3"
                  component="h2"
                  sx={{
                    fontSize: { xs: '1.5rem', sm: '2rem', md: '2.25rem' },
                    fontWeight: 600,
                    color: 'text.secondary',
                    mb: 3,
                    lineHeight: 1.2,
                  }}
                >
                  Full Stack Developer
                </Typography>
              </motion.div>

              {/* Summary details */}
              <motion.div variants={itemVariants}>
                <Typography
                  variant="body1"
                  component="p"
                  color="text.secondary"
                  sx={{
                    fontSize: { xs: '1rem', md: '1.125rem' },
                    mb: 5,
                    maxWidth: 600,
                    lineHeight: 1.7,
                  }}
                >
                  MERN Stack Developer with 4 years of frontend expertise and 2 years of full-stack engineering. Specialize in architecting high-performance dashboards, App Router integration, and optimizing web experiences.
                </Typography>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div variants={itemVariants}>
                <Stack
                  direction={{ xs: 'column', sm: 'row' }}
                  spacing={2}
                >
                  <Button
                    onClick={() => scrollToSection('contact')}
                    variant="contained"
                    size="large"
                    endIcon={<MdArrowForward />}
                    sx={{
                      px: 3.5,
                      py: 1.8,
                      borderRadius: 2,
                      fontSize: '1rem',
                    }}
                  >
                    Connect / Hire Me
                  </Button>
                  <Button
                    onClick={() => scrollToSection('projects')}
                    variant="outlined"
                    size="large"
                    sx={{
                      px: 3.5,
                      py: 1.8,
                      borderRadius: 2,
                      fontSize: '1rem',
                      borderColor: 'rgba(255,255,255,0.15)',
                      color: 'text.primary',
                      '&:hover': {
                        borderColor: 'primary.main',
                        bgcolor: 'rgba(59, 130, 246, 0.05)',
                      },
                    }}
                  >
                    View Featured Projects
                  </Button>
                </Stack>
              </motion.div>
            </motion.div>
          </Box>

          {/* Right Visual Console Column */}
          <Box>
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] as const }}
            >
              <GlassCard
                sx={{
                  border: (theme) =>
                    theme.palette.mode === 'dark'
                      ? '1px solid rgba(255, 255, 255, 0.06)'
                      : '1px solid rgba(0, 0, 0, 0.07)',
                  bgcolor: (theme) =>
                    theme.palette.mode === 'dark' ? 'rgba(15, 23, 42, 0.7)' : 'rgba(255, 255, 255, 0.8)',
                }}
              >
                {/* IDE Mock Window Header */}
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    bgcolor: (theme) =>
                      theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.03)',
                    px: 2.5,
                    py: 1.5,
                    borderBottom: (theme) =>
                      `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}`,
                  }}
                >
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#EF4444' }} />
                    <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#F59E0B' }} />
                    <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#10B981' }} />
                  </Box>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ fontFamily: 'monospace', fontWeight: 600, fontSize: '0.75rem' }}
                  >
                    profile.json
                  </Typography>
                  <Box sx={{ width: 36 }} /> {/* spacer */}
                </Box>

                {/* Code Editor body */}
                <Box sx={{ p: 3, overflowX: 'auto', whiteSpace: 'pre' }}>
                  <Typography
                    component="pre"
                    sx={{
                      fontFamily: 'monospace',
                      fontSize: { xs: '0.8rem', md: '0.85rem' },
                      lineHeight: 1.6,
                      m: 0,
                      color: 'text.primary',
                      '& .key': { color: '#60A5FA' },
                      '& .string': { color: '#34D399' },
                      '& .number': { color: '#F59E0B' },
                      '& .bracket': { color: '#A78BFA' },
                    }}
                  >
                    {/* Syntax highlighting via HTML injections */}
                    <span className="bracket">{'{'}</span>
                    {'\n  '}
                    <span className="key">{'"name"'}</span>: <span className="string">{'"Mohd Adil Ansari"'}</span>,
                    {'\n  '}
                    <span className="key">{'"role"'}</span>: <span className="string">{'"Full Stack Developer (MERN)"'}</span>,
                    {'\n  '}
                    <span className="key">{'"experience"'}</span>: <span className="bracket">{'{'}</span>
                    {'\n    '}
                    <span className="key">{'"frontend"'}</span>: <span className="string">{'"4 Years"'}</span>,
                    {'\n    '}
                    <span className="key">{'"backend"'}</span>: <span className="string">{'"2 Years"'}</span>,
                    {'\n    '}
                    <span className="key">{'"domains"'}</span>: <span className="bracket">{"['"}</span>
                    <span className="string">{'"Banking"'}</span>
                    <span className="bracket">{"', '"}</span>
                    <span className="string">{'"Gaming"'}</span>
                    <span className="bracket">{"', '"}</span>
                    <span className="string">{'"HRMS"'}</span>
                    <span className="bracket">{"']"}</span>
                    {'\n  '}
                    <span className="bracket">{'}'}</span>,
                    {'\n  '}
                    <span className="key">{'"coreTech"'}</span>: <span className="bracket">{"['"}</span>
                    <span className="string">{'"React"'}</span>
                    <span className="bracket">{"', '"}</span>
                    <span className="string">{'"NextJS"'}</span>
                    <span className="bracket">{"', '"}</span>
                    <span className="string">{'"Node"'}</span>
                    <span className="bracket">{"']"}</span>,
                    {'\n  '}
                    <span className="key">{'"values"'}</span>: <span className="bracket">{"['"}</span>
                    <span className="string">{'"Scalable Design"'}</span>
                    <span className="bracket">{"', '"}</span>
                    <span className="string">{'"UX Architect"'}</span>
                    <span className="bracket">{"']"}</span>
                    {'\n'}
                    <span className="bracket">{'}'}</span>
                  </Typography>
                </Box>
              </GlassCard>
            </motion.div>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
