'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { MdSchool, MdDateRange, MdLocationOn } from 'react-icons/md';
import SectionHeader from '@/components/SectionHeader';
import GlassCard from '@/components/GlassCard';

interface EducationItem {
  degree: string;
  field: string;
  institution: string;
  university: string;
  period: string;
  grade: string;
  color: string;
  bgColor: string;
}

export default function Education() {
  const educationItems: EducationItem[] = [
    {
      degree: 'Master of Technology (M.Tech)',
      field: 'Structural Engineering',
      institution: 'Govt. College of Engineering Amravati',
      university: 'Sant Gadge Baba Amravati University',
      period: '2017 - 2019',
      grade: '8.97 CGPI',
      color: '#818CF8', // Indigo
      bgColor: 'rgba(129, 140, 248, 0.06)',
    },
    {
      degree: 'Bachelor of Engineering (B.E.)',
      field: 'Civil Engineering',
      institution: 'Saboo Siddik College of Engineering, Byculla',
      university: 'University of Mumbai',
      period: '2012 - 2016',
      grade: '7.94 CGPI',
      color: '#34D399', // Emerald
      bgColor: 'rgba(52, 211, 153, 0.06)',
    },
  ];

  return (
    <Box 
      id="education" 
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
          label="Academic Background"
          title="Education"
          subtitle="Formal engineering education that built my strong analytical mindset and problem-solving foundation."
        />

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: 4,
          }}
        >
          {educationItems.map((edu, index) => (
            <Box key={edu.field} sx={{ display: 'flex' }}>
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                style={{ width: '100%', display: 'flex' }}
              >
                <GlassCard
                  sx={{
                    width: '100%',
                    p: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'all 0.3s ease',
                    border: '1px solid',
                    borderColor: (theme) =>
                      theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.06)',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: (theme) =>
                        theme.palette.mode === 'dark'
                          ? `0 15px 30px rgba(0, 0, 0, 0.4), 0 0 20px ${edu.color}15`
                          : `0 15px 30px rgba(0, 0, 0, 0.05), 0 0 15px ${edu.color}10`,
                      borderColor: edu.color,
                    },
                  }}
                >
                  <Box>
                    {/* Header: Icon and Period */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                      <Box
                        sx={{
                          p: 1.5,
                          borderRadius: '12px',
                          color: edu.color,
                          bgcolor: edu.bgColor,
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <MdSchool size={24} />
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'text.secondary' }}>
                        <MdDateRange size={16} />
                        <Typography variant="body2" sx={{ fontWeight: 550, fontSize: '0.875rem' }}>
                          {edu.period}
                        </Typography>
                      </Box>
                    </Box>

                    {/* Degree & Field */}
                    <Typography 
                      variant="h5" 
                      sx={{ 
                        fontWeight: 800, 
                        fontFamily: 'var(--font-outfit), sans-serif',
                        lineHeight: 1.3,
                        mb: 1,
                        fontSize: { xs: '1.25rem', md: '1.35rem' },
                        color: 'text.primary'
                      }}
                    >
                      {edu.degree}
                    </Typography>
                    
                    <Typography 
                      variant="subtitle1" 
                      sx={{ 
                        fontWeight: 650, 
                        color: edu.color,
                        mb: 2.5,
                        fontSize: '1rem'
                      }}
                    >
                      {edu.field}
                    </Typography>

                    {/* College & University */}
                    <Box sx={{ display: 'flex', gap: 1.5, mb: 2, alignItems: 'flex-start' }}>
                      <MdLocationOn size={18} style={{ marginTop: '3px', color: '#94A3B8' }} />
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary', mb: 0.5 }}>
                          {edu.institution}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                          {edu.university}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>

                  {/* Grade Info at the bottom */}
                  <Box 
                    sx={{ 
                      mt: 3, 
                      pt: 2.5, 
                      borderTop: (theme) => `1px solid ${theme.palette.divider}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>
                      Academic Performance
                    </Typography>
                    <Box 
                      sx={{ 
                        px: 2, 
                        py: 0.75, 
                        borderRadius: '8px', 
                        bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
                        border: (theme) => `1px solid ${theme.palette.divider}`,
                      }}
                    >
                      <Typography variant="body2" sx={{ fontWeight: 700, color: edu.color, fontFamily: 'monospace' }}>
                        {edu.grade}
                      </Typography>
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
