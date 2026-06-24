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
  color: string;
  description: string;
}

export default function Certifications() {
  const certs: CertificationItem[] = [
    {
      title: 'Full Stack Generative & Agentic AI with Python',
      issuer: 'Advanced AI Architectures',
      year: '2026',
      color: '#34D399',
      description: 'Covers prompt engineering, tool call integration, agentic frameworks, and building system workflows with Python.',
    },
    {
      title: 'Full Stack Certification Program in Web Development',
      issuer: 'Career Advancement Program',
      year: '2022 - 2023',
      color: '#818CF8',
      description: 'Comprehensive program covering the MERN Stack (MongoDB, Express, React, Node) along with data structures and API testing.',
    },
    {
      title: 'Namaste React Course',
      issuer: 'Akshay Saini (NamasteDev)',
      year: '2023',
      color: '#FCD34D',
      description: 'Advanced-level React.js training covering rendering performance, state hooks, custom hook design, and bundler configurations.',
    },
    {
      title: 'Responsive Web Design Developer Certification',
      issuer: 'Web standards curriculum',
      year: '2022',
      color: '#F9A8D4',
      description: 'Covers core CSS layouts (Flexbox, Grid), media queries, semantic markup, and general accessibility (a11y) standards.',
    },
  ];

  return (
    <Box id="certifications" sx={{ py: { xs: 8, md: 12 } }}>
      <Container maxWidth="lg">
        <SectionHeader
          label="Credentials"
          title="Certifications"
          subtitle="Accredited certifications validating skills in AI systems, front-end architecture, and full-stack development."
        />

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: 2.5,
          }}
        >
          {certs.map((cert, index) => (
            <Box key={cert.title} sx={{ display: 'flex' }}>
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
                style={{ width: '100%', display: 'flex' }}
              >
                <GlassCard
                  sx={{
                    p: 3,
                    width: '100%',
                    display: 'flex',
                    gap: 2,
                    alignItems: 'flex-start',
                  }}
                >
                  {/* Icon */}
                  <Box
                    sx={{
                      color: cert.color,
                      flexShrink: 0,
                      mt: 0.25,
                    }}
                  >
                    <MdWorkspacePremium size={22} />
                  </Box>

                  {/* Content */}
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: 600,
                        fontSize: '0.9375rem',
                        mb: 0.5,
                        fontFamily: 'var(--font-outfit), system-ui, sans-serif',
                        lineHeight: 1.35,
                      }}
                    >
                      {cert.title}
                    </Typography>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ fontWeight: 500, mb: 1, display: 'block', fontSize: '0.75rem' }}
                    >
                      {cert.issuer}
                    </Typography>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ mb: 1.5, display: 'block', fontSize: '0.75rem', lineHeight: 1.6 }}
                    >
                      {cert.description}
                    </Typography>

                    <Box
                      sx={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 0.5,
                        fontSize: '0.6875rem',
                        fontWeight: 500,
                        color: 'text.secondary',
                        bgcolor: (theme) =>
                          theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)',
                        px: 1,
                        py: 0.375,
                        borderRadius: '5px',
                        border: (theme) =>
                          `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)'}`,
                      }}
                    >
                      <MdDateRange size={12} />
                      {cert.year}
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
