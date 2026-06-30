'use client';

import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import { MdMenu, MdClose, MdLightMode, MdDarkMode, MdFileDownload } from 'react-icons/md';
import { useColorMode } from '@/app/providers';
import { motion } from 'framer-motion';

const navItems = [
  { label: 'Home', id: 'home' },
  { label: 'About', id: 'about' },
  { label: 'Experience', id: 'experience' },
  { label: 'Skills', id: 'skills' },
  { label: 'Projects', id: 'projects' },
  { label: 'Certifications', id: 'certifications' },
  { label: 'Contact', id: 'contact' },
];

export default function Navbar() {
  const { mode, toggleColorMode } = useColorMode();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  // Scroll spy
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 140;
      for (const item of navItems) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(item.id);
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 20,
  });

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          background: (theme) =>
            trigger
              ? theme.palette.mode === 'dark'
                ? 'rgba(9, 9, 11, 0.75)'
                : 'rgba(250, 250, 250, 0.8)'
              : 'transparent',
          backdropFilter: trigger ? 'blur(16px) saturate(180%)' : 'none',
          borderBottom: (theme) =>
            `1px solid ${
              trigger
                ? theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'
                : 'transparent'
            }`,
          boxShadow: 'none',
          transition: 'all 0.3s ease',
        }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ justifyContent: 'space-between', height: { xs: 52, md: 72 } }}>
            {/* Logo with modern gradient */}
            <Typography
              variant="h6"
              component="div"
              onClick={() => scrollToSection('home')}
              sx={{
                fontWeight: 800,
                cursor: 'pointer',
                fontFamily: 'var(--font-outfit), system-ui, sans-serif',
                fontSize: { xs: '1.15rem', md: '1.3rem' },
                letterSpacing: '-0.03em',
                userSelect: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 0.5,
              }}
            >
              <span className="text-gradient">Adil Ansari</span>
            </Typography>

            {/* Desktop Nav with Sliding Active Indicator */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 0.5 }}>
              {navItems.map((item) => (
                <Button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  sx={{
                    color: activeSection === item.id ? 'text.primary' : 'text.secondary',
                    fontWeight: activeSection === item.id ? 600 : 400,
                    fontSize: '0.8125rem',
                    px: 2,
                    py: 1,
                    borderRadius: '8px',
                    minWidth: 'auto',
                    transition: 'all 0.25s ease',
                    position: 'relative',
                    '&:hover': {
                      color: 'text.primary',
                      bgcolor: 'transparent',
                    },
                  }}
                >
                  <span style={{ position: 'relative', zIndex: 2 }}>{item.label}</span>
                  
                  {/* Sliding active pill indicator */}
                  {activeSection === item.id && (
                    <Box
                      component={motion.div}
                      layoutId="activeNavIndicator"
                      sx={{
                        position: 'absolute',
                        top: 4,
                        bottom: 4,
                        left: 4,
                        right: 4,
                        borderRadius: '6px',
                        bgcolor: (theme) =>
                          theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.04)',
                        border: (theme) =>
                          `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.05)'}`,
                        zIndex: 1,
                      }}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}

                  {/* Sleek bottom active accent line */}
                  {activeSection === item.id && (
                    <Box
                      component={motion.div}
                      layoutId="activeNavLine"
                      sx={{
                        position: 'absolute',
                        bottom: 4,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: 14,
                        height: 2,
                        borderRadius: 1,
                        bgcolor: 'primary.main',
                        zIndex: 3,
                      }}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Button>
              ))}
            </Box>

            {/* Right Utilities */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.5, md: 1 } }}>
              <IconButton
                onClick={toggleColorMode}
                size="small"
                sx={{
                  color: 'text.secondary',
                  width: { xs: 44, md: 36 },
                  height: { xs: 44, md: 36 },
                  border: (theme) =>
                    `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)'}`,
                  bgcolor: (theme) =>
                    theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.01)',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    color: 'text.primary',
                    borderColor: 'primary.main',
                    bgcolor: (theme) =>
                      theme.palette.mode === 'dark' ? 'rgba(129, 140, 248, 0.05)' : 'rgba(79, 70, 229, 0.04)',
                  },
                }}
                aria-label="Toggle Color Theme"
              >
                {mode === 'dark' ? <MdLightMode size={18} /> : <MdDarkMode size={18} />}
              </IconButton>

              <Button
                component="a"
                href="/Mohd_Adil_Ansari_Resume.pdf"
                download="Mohd_Adil_Ansari_Resume.pdf"
                variant="contained"
                size="small"
                startIcon={<MdFileDownload size={16} />}
                sx={{
                  display: { xs: 'none', sm: 'inline-flex' },
                  px: 2.25,
                  py: 1,
                  fontSize: '0.8125rem',
                }}
              >
                Resume
              </Button>

              {/* Mobile Menu */}
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerToggle}
                sx={{
                  display: { md: 'none' },
                  width: 44,
                  height: 44,
                  color: 'text.secondary',
                  '&:hover': { color: 'text.primary' },
                }}
              >
                <MdMenu size={22} />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        slotProps={{
          paper: {
            sx: {
              width: 280,
              background: (theme) =>
                theme.palette.mode === 'dark' ? '#121215' : '#FFFFFF',
              backgroundImage: 'none',
              borderLeft: (theme) =>
                `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`,
            },
          },
        }}
      >
        <Box sx={{ p: 2.5, display: 'flex', flexDirection: 'column', height: '100%' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="body1" sx={{ fontWeight: 600, fontFamily: 'var(--font-outfit), sans-serif' }}>
              Navigation
            </Typography>
            <IconButton onClick={handleDrawerToggle} size="small" sx={{ width: 44, height: 44 }}>
              <MdClose size={20} />
            </IconButton>
          </Box>
          <List sx={{ mb: 'auto' }}>
            {navItems.map((item) => (
              <ListItem key={item.id} disablePadding>
                <ListItemButton
                  onClick={() => scrollToSection(item.id)}
                  selected={activeSection === item.id}
                  sx={{
                    borderRadius: 2,
                    mb: 0.5,
                    py: 1.5,
                    minHeight: 44,
                    '&.Mui-selected': {
                      bgcolor: (theme) =>
                        theme.palette.mode === 'dark'
                          ? 'rgba(129, 140, 248, 0.08)'
                          : 'rgba(79, 70, 229, 0.06)',
                      color: 'primary.main',
                      '&:hover': {
                        bgcolor: (theme) =>
                          theme.palette.mode === 'dark'
                            ? 'rgba(129, 140, 248, 0.12)'
                            : 'rgba(79, 70, 229, 0.08)',
                      },
                    },
                  }}
                >
                  <ListItemText
                    primary={
                      <Typography sx={{ fontWeight: activeSection === item.id ? 600 : 400, fontSize: '0.875rem' }}>
                        {item.label}
                      </Typography>
                    }
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Box sx={{ pt: 2, borderTop: (theme) => `1px solid ${theme.palette.divider}` }}>
            <Button
              component="a"
              href="/Mohd_Adil_Ansari_Resume.pdf"
              download="Mohd_Adil_Ansari_Resume.pdf"
              variant="contained"
              fullWidth
              startIcon={<MdFileDownload />}
              sx={{ py: 1.25 }}
            >
              Download Resume
            </Button>
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
}
