'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { motion } from 'framer-motion';
import { MdWorkspacePremium, MdDateRange, MdLaunch } from 'react-icons/md';
import SectionHeader from '@/components/SectionHeader';
import GlassCard from '@/components/GlassCard';

interface CertificationItem {
  title: string;
  issuer: string;
  year: string;
  color: string;
  bgColor: string;
  description: string;
  verifyUrl: string;
}

export default function Certifications() {
  const certs: CertificationItem[] = [
    {
      title: 'Full Stack Generative & Agentic AI with Python',
      issuer: 'Advanced AI Architectures',
      year: '2026',
      color: '#34D399',
      bgColor: 'rgba(52, 211, 153, 0.06)',
      description: 'Covers prompt engineering, tool call integration, agentic frameworks, and building system workflows with Python.',
      verifyUrl: 'https://www.udemy.com/certificate/UC-ac91c6e3-ad48-478a-9b7c-8c2450ff824f/',
    },
    {
      title: 'Full Stack Certification Program in Web Development',
      issuer: 'Career Advancement Program',
      year: '2022 - 2023',
      color: '#818CF8',
      bgColor: 'rgba(129, 140, 248, 0.06)',
      description: 'Comprehensive program covering the MERN Stack (MongoDB, Express, React, Node) along with data structures and API testing.',
      verifyUrl: 'https://verify.letsupgrade.in/certificate/LUFS220132',
    },
    {
      title: 'Namaste React Course',
      issuer: 'Akshay Saini (NamasteDev)',
      year: '2023',
      color: '#FCD34D',
      bgColor: 'rgba(252, 211, 77, 0.06)',
      description: 'Advanced-level React.js training covering rendering performance, state hooks, custom hook design, and bundler configurations.',
      verifyUrl: 'https://namastedev.com/it.aadil124/certificates/namaste-react',
    },
    {
      title: 'Responsive Web Design Developer Certification',
      issuer: 'Web standards curriculum',
      year: '2022',
      color: '#F9A8D4',
      bgColor: 'rgba(249, 168, 212, 0.06)',
      description: 'Covers core CSS layouts (Flexbox, Grid), media queries, semantic markup, and general accessibility (a11y) standards.',
      verifyUrl: 'https://www.freecodecamp.org/certification/aadil124/responsive-web-design',
    },
  ];

  return (
    <Box 
      id="certifications" 
      className="bg-dot"
      sx={{ 
        py: { xs: 4, md: 6 },
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
          label="Credentials"
          title="Certifications"
          subtitle="Accredited certifications validating skills in AI systems, front-end architecture, and full-stack development."
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
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
                style={{ width: '100%', display: 'flex' }}
              >
                <GlassCard
                  sx={{
                    p: { xs: 2.25, md: 3.5 },
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    '&:hover': {
                      borderColor: cert.color,
                      boxShadow: (theme) =>
                        theme.palette.mode === 'dark'
                          ? `0 12px 30px -4px rgba(0, 0, 0, 0.5), 0 0 12px ${cert.color}15`
                          : `0 12px 30px -4px rgba(0, 0, 0, 0.06), 0 0 12px ${cert.color}10`,
                    }
                  }}
                >
                  <Box sx={{ display: 'flex', gap: 2.5, alignItems: 'flex-start', mb: 3 }}>
                    {/* Issuer Icon in Tinted Container */}
                    <Box
                      sx={{
                        width: 44,
                        height: 44,
                        borderRadius: '10px',
                        bgcolor: cert.bgColor,
                        color: cert.color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        boxShadow: `0 2px 6px ${cert.color}15`,
                      }}
                    >
                      <MdWorkspacePremium size={24} />
                    </Box>

                    {/* Content */}
                    <Box>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 700,
                          fontSize: '1.05rem',
                          mb: 0.75,
                          fontFamily: 'var(--font-outfit), system-ui, sans-serif',
                          lineHeight: 1.35,
                          color: 'text.primary',
                        }}
                      >
                        {cert.title}
                      </Typography>
                      <Typography
                        variant="subtitle2"
                        color="primary.main"
                        sx={{ fontWeight: 650, mb: 1.5, display: 'block', fontSize: '0.8rem' }}
                      >
                        {cert.issuer}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ fontSize: { xs: '0.875rem', md: '0.825rem' }, lineHeight: 1.6 }}
                      >
                        {cert.description}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Footer metadata & Verification action */}
                  <Box
                    sx={{
                      pt: 2.25,
                      borderTop: (theme) => `1px solid ${theme.palette.divider}`,
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      mt: 'auto',
                    }}
                  >
                    <Box
                      sx={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 0.75,
                        fontSize: '0.725rem',
                        fontWeight: 600,
                        color: 'text.secondary',
                        bgcolor: (theme) =>
                          theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)',
                        px: 1.25,
                        py: 0.5,
                        borderRadius: '6px',
                        border: (theme) =>
                          `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)'}`,
                      }}
                    >
                      <MdDateRange size={13} style={{ opacity: 0.7 }} />
                      {cert.year}
                    </Box>

                    <Button
                      component="a"
                      href={cert.verifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="text"
                      size="small"
                      endIcon={<MdLaunch size={12} />}
                      sx={{
                        fontSize: '0.725rem',
                        fontWeight: 700,
                        p: 0,
                        minWidth: 0,
                        minHeight: { xs: 44, md: 'auto' },
                        display: 'inline-flex',
                        alignItems: 'center',
                        color: 'text.secondary',
                        '&:hover': {
                          color: cert.color,
                          bgcolor: 'transparent',
                        }
                      }}
                    >
                      Verify
                    </Button>
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
