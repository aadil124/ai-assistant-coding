'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { MdTimeline, MdTrendingUp, MdSwapHoriz, MdDomain } from 'react-icons/md';
import SectionHeader from '@/components/SectionHeader';
import GlassCard from '@/components/GlassCard';

export default function About() {
  const stats = [
    { 
      value: '4+', 
      label: 'Years Experience', 
      desc: 'Frontend & MERN web development', 
      color: '#818CF8', 
      bgColor: 'rgba(129, 140, 248, 0.08)',
      icon: <MdTimeline size={22} />
    },
    { 
      value: '30%', 
      label: 'UI Speedup', 
      desc: 'Average performance optimization', 
      color: '#34D399', 
      bgColor: 'rgba(52, 211, 153, 0.08)',
      icon: <MdTrendingUp size={22} />
    },
    { 
      value: '20+', 
      label: 'API Integrations', 
      desc: 'REST workflows & secure routes', 
      color: '#F59E0B', 
      bgColor: 'rgba(245, 158, 11, 0.08)',
      icon: <MdSwapHoriz size={22} />
    },
    { 
      value: '5+', 
      label: 'Industry Domains', 
      desc: 'Banking, Gaming, Healthcare, HRMS', 
      color: '#EC4899', 
      bgColor: 'rgba(236, 72, 153, 0.08)',
      icon: <MdDomain size={22} />
    },
  ];

  return (
    <Box 
      id="about" 
      className="bg-dot"
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
          label="About"
          title="About Me"
          subtitle="A summary of my professional journey, philosophy, and engineering metrics."
        />

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: { xs: 5, md: 6 },
            alignItems: 'center',
          }}
        >
          {/* Biography with left accent border and modern quotes feel */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <Box
              sx={{
                borderLeft: (theme) => `3px solid ${theme.palette.primary.main}`,
                pl: { xs: 2.5, md: 3 },
                py: 0.5,
                mb: 3,
              }}
            >
              <Typography 
                variant="h4" 
                sx={{ 
                  fontWeight: 800, 
                  mb: 1.5, 
                  fontSize: { xs: '1.45rem', md: '1.75rem' },
                  fontFamily: 'var(--font-outfit), sans-serif',
                  letterSpacing: '-0.02em',
                }}
              >
                Engineering <span className="text-gradient">Robust & Scalable</span> Web Solutions
              </Typography>
            </Box>
            
            <Typography variant="body1" color="text.secondary" sx={{ mb: 2.5, lineHeight: 1.8, fontSize: { xs: '0.875rem', md: '0.9375rem' } }}>
              I am a passionate Full Stack Developer with an engineering background (M.Tech in Structural Engineering). I transitioned into software development out of a deep love for logic and system design, translating complex workflows into fluid web interfaces.
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 2.5, lineHeight: 1.8, fontSize: { xs: '0.875rem', md: '0.9375rem' } }}>
              My core strength lies in frontend orchestration with <strong>React</strong> and <strong>TypeScript</strong>, combined with backend services in <strong>Node.js</strong> and <strong>Express</strong>. At NeoSoft, I build module screens for the Bank of Maharashtra&apos;s HRMS Portal. Previously, I designed responsive interfaces for high-traffic gaming portals handling 4000+ games.
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8, fontSize: { xs: '0.875rem', md: '0.9375rem' }, mb: { xs: 2, md: 0 } }}>
              Whether it is building custom data-tables with client-side caching, structuring secure role-based access control, or engineering responsive dashboard grids — I focus on <strong>web performance, clean architecture, and high usability.</strong>
            </Typography>
          </motion.div>

          {/* Stats Grid */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 2.5,
            }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                style={{ display: 'flex' }}
              >
                <GlassCard
                  sx={{
                    p: { xs: 2.25, md: 3 },
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    position: 'relative',
                    overflow: 'hidden',
                    minHeight: 160,
                    alignItems: 'flex-start',
                    '&:hover': {
                      borderColor: stat.color,
                      boxShadow: (theme) =>
                        theme.palette.mode === 'dark'
                          ? `0 8px 24px rgba(0,0,0,0.5), 0 0 12px ${stat.color}25`
                          : `0 8px 24px rgba(0,0,0,0.06), 0 0 12px ${stat.color}15`,
                    }
                  }}
                >
                  {/* Icon Container - Tinted background */}
                  <Box
                    sx={{
                      width: { xs: 38, md: 44 },
                      height: { xs: 38, md: 44 },
                      borderRadius: '10px',
                      bgcolor: stat.bgColor,
                      color: stat.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 2.5,
                      boxShadow: `0 2px 8px ${stat.color}15`,
                    }}
                  >
                    {stat.icon}
                  </Box>

                  {/* Value and Labels */}
                  <Box>
                    <Typography
                      variant="h3"
                      sx={{
                        fontWeight: 800,
                        fontSize: { xs: '2.1rem', md: '2.6rem' },
                        mb: 0.5,
                        color: stat.color,
                        letterSpacing: '-0.03em',
                        fontFamily: 'var(--font-outfit), sans-serif',
                        lineHeight: 1.1,
                      }}
                    >
                      {stat.value}
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      sx={{ fontWeight: 700, mb: 0.5, color: 'text.primary', fontSize: { xs: '0.875rem', md: '0.825rem' } }}
                    >
                      {stat.label}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1.45, fontSize: { xs: '0.75rem', md: '0.725rem' }, display: 'block' }}>
                      {stat.desc}
                    </Typography>
                  </Box>
                </GlassCard>
              </motion.div>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
