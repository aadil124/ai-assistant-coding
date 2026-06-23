'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { FaGithub, FaLinkedin, FaEnvelope, FaArrowUp } from 'react-icons/fa';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const socials = [
    { icon: <FaGithub size={20} />, url: 'https://github.com/aadil124', label: 'GitHub' },
    { icon: <FaLinkedin size={20} />, url: 'https://www.linkedin.com', label: 'LinkedIn' },
    { icon: <FaEnvelope size={20} />, url: 'mailto:ansariaadil2623@gmail.com', label: 'Email' },
  ];

  return (
    <Box
      component="footer"
      sx={{
        py: 6,
        bgcolor: (theme) =>
          theme.palette.mode === 'dark' ? 'rgba(3,7,18,0.4)' : 'rgba(241,245,249,0.5)',
        borderTop: (theme) =>
          `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}`,
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr 1fr' },
            gap: 3,
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Brand Name & Summary */}
          <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 800,
                fontFamily: 'var(--font-outfit), sans-serif',
                mb: 1,
                background: 'linear-gradient(90deg, #3B82F6 0%, #10B981 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Adil Ansari
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 280, mx: { xs: 'auto', md: 0 } }}>
              Senior Full Stack MERN Developer crafting high-performance, responsive web interfaces.
            </Typography>
          </Box>

          {/* Social Profiles & Copyright */}
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
                  sx={{
                    color: 'text.secondary',
                    bgcolor: (theme) =>
                      theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)',
                    p: 1.5,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      color: 'primary.main',
                      bgcolor: (theme) =>
                        theme.palette.mode === 'dark' ? 'rgba(59,130,246,0.1)' : 'rgba(37, 99, 235, 0.08)',
                      transform: 'translateY(-3px)',
                    },
                  }}
                >
                  {social.icon}
                </IconButton>
              ))}
            </Box>
            <Typography variant="body2" color="text.secondary">
              &copy; {currentYear} Mohd Adil Ansari. All rights reserved.
            </Typography>
          </Box>

          {/* Scroll back to top */}
          <Box sx={{ textAlign: { xs: 'center', md: 'right' } }}>
            <IconButton
              onClick={scrollToTop}
              aria-label="Scroll to top"
              sx={{
                color: 'text.primary',
                bgcolor: (theme) =>
                  theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)',
                p: 1.5,
                '&:hover': {
                  bgcolor: (theme) =>
                    theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)',
                },
              }}
            >
              <FaArrowUp size={16} />
            </IconButton>
            <Typography variant="caption" sx={{ display: 'block', mt: 1, fontWeight: 700, color: 'text.secondary' }}>
              Back to Top
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
