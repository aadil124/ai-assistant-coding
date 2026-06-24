'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import SectionHeader from '@/components/SectionHeader';
import GlassCard from '@/components/GlassCard';

export default function About() {
  const stats = [
    { value: '4+', label: 'Years Experience', desc: 'Frontend & MERN web development', color: '#818CF8' },
    { value: '30%', label: 'UI Speedup', desc: 'Average performance optimization', color: '#34D399' },
    { value: '20+', label: 'API Integrations', desc: 'REST workflows & secure routes', color: '#F59E0B' },
    { value: '5+', label: 'Industry Domains', desc: 'Banking, Gaming, Healthcare, HRMS', color: '#EC4899' },
  ];

  return (
    <Box id="about" sx={{ py: { xs: 8, md: 12 } }}>
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
            gap: { xs: 4, md: 6 },
            alignItems: 'start',
          }}
        >
          {/* Biography */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <Typography variant="h4" sx={{ fontWeight: 600, mb: 2, fontSize: { xs: '1.375rem', md: '1.5rem' } }}>
              Engineering <span className="text-gradient">Robust & Scalable</span> Web Solutions
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 2, lineHeight: 1.75 }}>
              I am a passionate Full Stack Developer with an engineering background (M.Tech in Structural Engineering). I transitioned into software development out of a deep love for logic and system design, translating complex workflows into fluid web interfaces.
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 2, lineHeight: 1.75 }}>
              My core strength lies in frontend orchestration with <strong>React</strong> and <strong>TypeScript</strong>, combined with backend services in <strong>Node.js</strong> and <strong>Express</strong>. At NeoSoft, I build module screens for the Bank of Maharashtra&apos;s HRMS Portal. Previously, I designed responsive interfaces for high-traffic gaming portals handling 4000+ games.
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.75 }}>
              Whether it is building custom data-tables with client-side caching, structuring secure role-based access control, or engineering responsive dashboard grids — I focus on <strong>web performance, clean architecture, and high usability.</strong>
            </Typography>
          </motion.div>

          {/* Stats Grid */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 2,
            }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                style={{ display: 'flex' }}
              >
                <GlassCard
                  sx={{
                    p: 3,
                    width: '100%',
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                  }}
                >
                  <Typography
                    variant="h3"
                    sx={{
                      fontWeight: 700,
                      fontSize: { xs: '2rem', md: '2.5rem' },
                      mb: 0.75,
                      color: stat.color,
                      letterSpacing: '-0.02em',
                    }}
                  >
                    {stat.value}
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    sx={{ fontWeight: 600, mb: 0.5, color: 'text.primary', fontSize: '0.8125rem' }}
                  >
                    {stat.label}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1.4 }}>
                    {stat.desc}
                  </Typography>
                </GlassCard>
              </motion.div>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
