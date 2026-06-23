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
    { value: '4+', label: 'Years Experience', desc: 'Frontend & MERN web development' },
    { value: '30%', label: 'UI Speedup', desc: 'Average performance optimization' },
    { value: '20+', label: 'API Integrations', desc: 'REST workflows & secure routes' },
    { value: '5+', label: 'Industry Domains', desc: 'Banking, Gaming, Healthcare, HRMS, Job Portals' },
  ];

  return (
    <Box id="about" sx={{ py: { xs: 10, md: 14 } }}>
      <Container maxWidth="lg">
        <SectionHeader
          title="About Me"
          subtitle="A summary of my professional journey, philosophy, and engineering metrics."
        />

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: { xs: 5, md: 8 },
            alignItems: 'center',
          }}
        >
          {/* Biography Text Left Column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
          >
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 2, fontSize: '1.75rem' }}>
              Engineering <span className="text-gradient">Robust & Scalable</span> Web Solutions
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 2.5, lineHeight: 1.75 }}>
              I am a passionate Full Stack Developer with an engineering background (M.Tech in Structural Engineering). I transitioned into software development out of a deep love for logic and system design, translating complex workflows into fluid web interfaces.
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 2.5, lineHeight: 1.75 }}>
              My core strength lies in frontend orchestration with <strong>React</strong> and <strong>TypeScript</strong>, combined with backend services in <strong>Node.js</strong> and <strong>Express</strong>. In my role at NeoSoft, I build module screens for the Bank of Maharashtra&apos;s HRMS Portal. In previous roles, I designed responsive interfaces for high-traffic gaming portals handling 4000+ games and optimized healthcare portal speed by 30%.
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.75 }}>
              Whether it is building custom data-tables with client-side caching, structuring secure role-based access control, or engineering responsive dashboard grids, I focus heavily on <strong>web performance, clean folder structures, and high usability.</strong>
            </Typography>
          </motion.div>

          {/* Metrics Grid Right Column */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
              gap: 2,
            }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
                style={{ display: 'flex', height: '100%' }}
              >
                <GlassCard sx={{ p: 3, textAlign: 'center', height: '100%', width: '100%' }}>
                  <Typography
                    variant="h3"
                    sx={{
                      fontWeight: 800,
                      fontSize: { xs: '2.25rem', md: '2.75rem' },
                      mb: 0.5,
                      background: index % 2 === 0
                        ? 'linear-gradient(135deg, #3B82F6 0%, #06B6D4 100%)'
                        : 'linear-gradient(135deg, #10B981 0%, #3B82F6 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    {stat.value}
                  </Typography>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1, color: 'text.primary' }}>
                    {stat.label}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.825rem' }}>
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
