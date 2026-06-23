'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { MdWorkspacePremium, MdDateRange } from 'react-icons/md';
import SectionHeader from '@/components/SectionHeader';
import GlassCard from '@/components/GlassCard';

interface CertificationItem {
  title: string;
  issuer: string;
  year: string;
  iconColor: string;
  description: string;
}

export default function Certifications() {
  const certs: CertificationItem[] = [
    {
      title: 'Full Stack Generative & Agentic AI with Python',
      issuer: 'Advanced AI Architectures',
      year: '2026',
      iconColor: '#10B981', // Emerald
      description: 'Covers prompt engineering, tool call integration, agentic frameworks, and building system workflows with Python.',
    },
    {
      title: 'Full Stack Certification Program in Web Development',
      issuer: 'Career Advancement Program',
      year: '2022 - 2023',
      iconColor: '#3B82F6', // Blue
      description: 'Comprehensive program covering the MERN Stack (MongoDB, Express, React, Node) along with data structures and API testing.',
    },
    {
      title: 'Namaste React Course',
      issuer: 'Akshay Saini (NamasteDev)',
      year: '2023',
      iconColor: '#F59E0B', // Amber
      description: 'Advanced-level React.js training covering rendering performance, state hooks, custom hook design, and bundler configurations.',
    },
    {
      title: 'Responsive Web Design Developer Certification',
      issuer: 'Web standards curriculum',
      year: '2022',
      iconColor: '#EC4899', // Pink
      description: 'Covers core CSS layouts (Flexbox, Grid), media queries, semantic markup, and general accessibility (a11y) standards.',
    },
  ];

  return (
    <Box id="certifications" sx={{ py: { xs: 10, md: 14 } }}>
      <Container maxWidth="lg">
        <SectionHeader
          title="Certifications"
          subtitle="Accredited certifications validating my skills in AI systems, front-end architecture, and MERN full-stack development."
        />

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: 3,
          }}
        >
          {certs.map((cert, index) => (
            <Box key={cert.title} sx={{ display: 'flex' }}>
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] as const }}
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
                  }}
                >
                  <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                    {/* Badge Icon */}
                    <Box
                      sx={{
                        p: 1.5,
                        borderRadius: 3,
                        bgcolor: `${cert.iconColor}12`,
                        color: cert.iconColor,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <MdWorkspacePremium size={24} />
                    </Box>

                    {/* Content */}
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography
                        variant="h5"
                        sx={{
                          fontWeight: 700,
                          fontSize: '1.1rem',
                          mb: 1,
                          fontFamily: 'var(--font-outfit), sans-serif',
                          lineHeight: 1.4,
                        }}
                      >
                        {cert.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.primary"
                        sx={{ fontWeight: 600, mb: 1, fontSize: '0.85rem' }}
                      >
                        {cert.issuer}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 2, fontSize: '0.85rem', lineHeight: 1.5 }}
                      >
                        {cert.description}
                      </Typography>

                      <Box
                        sx={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 0.75,
                          fontSize: '0.8rem',
                          fontWeight: 700,
                          color: 'text.secondary',
                          bgcolor: (theme) =>
                            theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)',
                          px: 1.5,
                          py: 0.6,
                          borderRadius: 1.5,
                        }}
                      >
                        <MdDateRange size={14} />
                        {cert.year}
                      </Box>
                    </Box>
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
