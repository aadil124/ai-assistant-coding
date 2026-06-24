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
        py: 5,
        borderTop: (theme) =>
          `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`,
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr 1fr' },
            gap: 3,
            alignItems: 'center',
          }}
        >
          {/* Brand */}
          <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
            <Typography
              variant="body1"
              sx={{
                fontWeight: 600,
                fontFamily: 'var(--font-outfit), system-ui, sans-serif',
                mb: 0.5,
                fontSize: '0.9375rem',
                color: 'text.primary',
              }}
            >
              Adil Ansari
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ maxWidth: 240, mx: { xs: 'auto', md: 0 }, display: 'block', lineHeight: 1.5 }}>
              Senior Full Stack MERN Developer crafting high-performance web applications.
            </Typography>
          </Box>

          {/* Socials & Copyright */}
          <Box sx={{ textAlign: 'center' }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 0.75, mb: 1.5 }}>
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
                    width: 34,
                    height: 34,
                    transition: 'all 0.15s ease',
                    '&:hover': {
                      color: 'text.primary',
                    },
                  }}
                >
                  {social.icon}
                </IconButton>
              ))}
            </Box>
            <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.6875rem' }}>
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
                width: 34,
                height: 34,
                border: (theme) =>
                  `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`,
                '&:hover': {
                  color: 'text.primary',
                  borderColor: (theme) =>
                    theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.12)',
                },
              }}
            >
              <FaArrowUp size={12} />
            </IconButton>
            <Typography variant="caption" sx={{ display: 'block', mt: 0.75, fontWeight: 500, color: 'text.secondary', fontSize: '0.625rem' }}>
              Back to Top
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
