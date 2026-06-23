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

  // Scroll spy to highlight active nav item
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 120;

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
        elevation={trigger ? 4 : 0}
        sx={{
          background: (theme) =>
            trigger
              ? theme.palette.mode === 'dark'
                ? 'rgba(3, 7, 18, 0.75)'
                : 'rgba(248, 250, 252, 0.8)'
              : 'transparent',
          backdropFilter: trigger ? 'blur(12px)' : 'none',
          borderBottom: (theme) =>
            trigger
              ? `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)'}`
              : 'none',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ justifyContent: 'space-between', height: { xs: 64, md: 80 } }}>
            {/* Logo / Brand Name */}
            <Typography
              variant="h6"
              component="div"
              onClick={() => scrollToSection('home')}
              sx={{
                fontWeight: 800,
                cursor: 'pointer',
                fontFamily: 'var(--font-outfit), sans-serif',
                fontSize: { xs: '1.25rem', md: '1.5rem' },
                letterSpacing: '-0.02em',
                background: 'linear-gradient(90deg, #3B82F6 0%, #10B981 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Adil Ansari.
            </Typography>

            {/* Desktop Navigation Links */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 1 }}>
              {navItems.map((item) => (
                <Button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  sx={{
                    color: activeSection === item.id ? 'primary.main' : 'text.secondary',
                    fontWeight: activeSection === item.id ? 700 : 500,
                    fontSize: '0.9rem',
                    px: 2,
                    py: 1,
                    transition: 'all 0.2s ease',
                    position: 'relative',
                    '&:hover': {
                      color: 'primary.main',
                      bgcolor: 'transparent',
                    },
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: 0,
                      left: '15%',
                      width: '70%',
                      height: '2px',
                      borderRadius: 1,
                      bgcolor: 'primary.main',
                      transform: activeSection === item.id ? 'scaleX(1)' : 'scaleX(0)',
                      transition: 'transform 0.25s ease',
                    },
                  }}
                >
                  {item.label}
                </Button>
              ))}
            </Box>

            {/* Right-side Utilities: Theme Toggle & Resume Action */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.5, md: 1.5 } }}>
              <IconButton
                onClick={toggleColorMode}
                sx={{
                  color: 'text.primary',
                  bgcolor: (theme) =>
                    theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)',
                  p: 1.2,
                  '&:hover': {
                    bgcolor: (theme) =>
                      theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)',
                  },
                }}
                aria-label="Toggle Color Theme"
              >
                {mode === 'dark' ? <MdLightMode size={20} /> : <MdDarkMode size={20} />}
              </IconButton>

              <Button
                component="a"
                href="/Mohd_Adil_Ansari_Resume.pdf"
                download="Mohd_Adil_Ansari_Resume.pdf"
                variant="outlined"
                startIcon={<MdFileDownload />}
                sx={{
                  display: { xs: 'none', sm: 'inline-flex' },
                  borderColor: (theme) =>
                    theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)',
                  color: 'text.primary',
                  '&:hover': {
                    borderColor: 'primary.main',
                    bgcolor: 'primary.main',
                    color: 'white',
                  },
                  px: 2,
                  py: 1,
                  borderRadius: 2,
                  transition: 'all 0.3s ease',
                }}
              >
                Resume
              </Button>

              {/* Mobile Menu Icon */}
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ display: { md: 'none' }, ml: 0.5, p: 1.2 }}
              >
                <MdMenu size={24} />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Drawer menu */}
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
                theme.palette.mode === 'dark' ? '#0F172A' : '#FFFFFF',
              backgroundImage: 'none',
              borderLeft: (theme) =>
                `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`,
              boxShadow: 'none',
            },
          },
        }}
      >
        <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', height: '100%' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 800 }}>
              Menu
            </Typography>
            <IconButton onClick={handleDrawerToggle}>
              <MdClose size={24} />
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
                    mb: 1,
                    '&.Mui-selected': {
                      bgcolor: 'primary.main',
                      color: 'white',
                      '&:hover': {
                        bgcolor: 'primary.dark',
                      },
                    },
                  }}
                >
                  <ListItemText primary={<Typography sx={{ fontWeight: 600 }}>{item.label}</Typography>} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Box sx={{ pt: 2, borderTop: '1px solid rgba(0,0,0,0.06)' }}>
            <Button
              component="a"
              href="/Mohd_Adil_Ansari_Resume.pdf"
              download="Mohd_Adil_Ansari_Resume.pdf"
              variant="contained"
              fullWidth
              startIcon={<MdFileDownload />}
              sx={{ py: 1.5 }}
            >
              Download Resume
            </Button>
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
}
