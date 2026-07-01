import React from 'react';
import Box from '@mui/material/Box';
import Navbar from '@/features/navbar/Navbar';
import Hero from '@/features/hero/Hero';
import About from '@/features/about/About';
import Experience from '@/features/experience/Experience';
import Skills from '@/features/skills/Skills';
import Projects from '@/features/projects/Projects';
import Github from '@/features/github/Github';
import Certifications from '@/features/certifications/Certifications';
import Contact from '@/features/contact/Contact';
import Footer from '@/features/footer/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';

export default function Home() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Sticky header navigation */}
      <Navbar />

      {/* Main sections container */}
      <Box component="main" sx={{ flexGrow: 1, overflowX: 'hidden' }}>
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Github />
        <Certifications />
        <Contact />
      </Box>

      {/* Floating WhatsApp contact button */}
      <WhatsAppButton />

      {/* Page footer links */}
      <Footer />
    </Box>
  );
}
