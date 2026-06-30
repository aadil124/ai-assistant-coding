'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { FaGithub, FaLinkedin, FaEnvelope, FaArrowUp, FaWhatsapp } from 'react-icons/fa';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const socials = [
    { icon: <FaGithub size={16} />, url: 'https://github.com/aadil124', label: 'GitHub' },
    { icon: <FaLinkedin size={16} />, url: 'https://www.linkedin.com', label: 'LinkedIn' },
    { icon: <FaEnvelope size={16} />, url: 'mailto:ansariaadil2623@gmail.com', label: 'Email' },
    { icon: <FaWhatsapp size={16} />, url: 'https://wa.me/917276450124', label: 'WhatsApp' },
  ];

  return (
    <Box
      component="footer"
      sx={{
        py: 6,
        bgcolor: (theme) => theme.palette.mode === 'dark' ? '#09090C' : '#F8FAFC',
        borderTop: (theme) =>
          `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`,
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1.2fr 1.6fr 1.2fr' },
            gap: 4,
            alignItems: 'center',
          }}
        >
          {/* Brand */}
          <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
            <Typography
              variant="body1"
              sx={{
                fontWeight: 800,
                fontFamily: 'var(--font-outfit), system-ui, sans-serif',
                mb: 0.75,
                fontSize: '1rem',
                color: 'text.primary',
              }}
            >
              Adil Ansari
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ maxWidth: 260, mx: { xs: 'auto', md: 0 }, display: 'block', lineHeight: 1.5, fontSize: { xs: '0.875rem', md: '0.725rem' } }}>
              Senior Full Stack MERN Developer crafting high-performance web applications.
            </Typography>
          </Box>

          {/* Socials & Copyright */}
          <Box sx={{ textAlign: 'center' }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1.5, mb: 2 }}>
              {socials.map((social) => (
                <IconButton
                  key={social.label}
                  component="a"
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  size="small"
                  sx={{
                    color: 'text.secondary',
                    width: { xs: 44, md: 38 },
                    height: { xs: 44, md: 38 },
                    borderRadius: '50%',
                    border: (theme) => `1px solid ${theme.palette.divider}`,
                    bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.01)',
                    transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                      color: 'primary.main',
                      borderColor: 'primary.main',
                      bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(129, 140, 248, 0.08)' : 'rgba(79, 70, 229, 0.05)',
                      transform: 'translateY(-2.5px) scale(1.05)',
                    },
                  }}
                >
                  {social.icon}
                </IconButton>
              ))}
            </Box>
            <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem', fontWeight: 500 }}>
              &copy; {currentYear} Mohd Adil Ansari. All rights reserved.
            </Typography>
          </Box>

          {/* Back to top */}
          <Box sx={{ textAlign: { xs: 'center', md: 'right' } }}>
            <IconButton
              onClick={scrollToTop}
              aria-label="Scroll to top"
              size="small"
              sx={{
                color: 'text.secondary',
                width: { xs: 44, md: 36 },
                height: { xs: 44, md: 36 },
                border: (theme) =>
                  `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`,
                bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.01)',
                transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  color: 'primary.main',
                  borderColor: 'primary.main',
                  bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(129, 140, 248, 0.06)' : 'rgba(79, 70, 229, 0.04)',
                  transform: 'translateY(-2.5px)',
                },
              }}
            >
              <FaArrowUp size={12} />
            </IconButton>
            <Typography variant="caption" sx={{ display: 'block', mt: 0.75, fontWeight: 650, color: 'text.secondary', fontSize: '0.625rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Back to Top
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
