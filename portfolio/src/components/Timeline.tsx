'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import { motion } from 'framer-motion';
import { MdChevronRight, MdBusiness, MdWork } from 'react-icons/md';
import GlassCard from './GlassCard';

export interface TimelineItemData {
  title: string;
  company: string;
  location: string;
  period: string;
  description: string[];
  skills: string[];
  link?: string;
  icon?: React.ReactNode;
}

interface TimelineProps {
  items: TimelineItemData[];
}

export default function Timeline({ items }: TimelineProps) {
  return (
    <Box sx={{ position: 'relative', pl: 0 }}>
      {/* Timeline line */}
      <Box
        sx={{
          position: 'absolute',
          top: 8,
          bottom: 8,
          left: { xs: '16px', md: '24px' },
          width: '2px',
          background: (theme) =>
            theme.palette.mode === 'dark'
              ? 'linear-gradient(to bottom, rgba(129, 140, 248, 0.4) 0%, rgba(52, 211, 153, 0.2) 60%, rgba(255, 255, 255, 0.05) 100%)'
              : 'linear-gradient(to bottom, rgba(79, 70, 229, 0.3) 0%, rgba(5, 150, 105, 0.15) 60%, rgba(0, 0, 0, 0.03) 100%)',
        }}
      />

      {items.map((item, index) => {
        const isLatest = index === 0;
        const themeColor = isLatest ? 'primary.main' : 'secondary.main';
        const pulseBgColor = isLatest ? 'rgba(129, 140, 248, 0.2)' : 'rgba(52, 211, 153, 0.15)';

        return (
          <Box
            key={`${item.company}-${item.title}-${index}`}
            sx={{
              position: 'relative',
              pl: { xs: '36px', md: '52px' },
              mb: 5,
              '&:last-child': { mb: 0 },
            }}
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {/* Concentric Node dot with icon (perfectly centered) */}
              <Box
                sx={{
                  position: 'absolute',
                  left: { xs: '16px', md: '24px' },
                  top: 24,
                  transform: 'translateX(-50%)',
                  width: { xs: 24, md: 32 },
                  height: { xs: 24, md: 32 },
                  borderRadius: '50%',
                  bgcolor: (theme) => theme.palette.background.paper,
                  border: (theme) => `2.5px solid ${isLatest ? theme.palette.primary.main : theme.palette.secondary.main}`,
                  boxShadow: (theme) => `0 0 10px ${pulseBgColor}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: themeColor,
                  zIndex: 2,
                  transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    transform: 'translateX(-50%) scale(1.15)',
                    boxShadow: (theme) => `0 0 16px ${isLatest ? theme.palette.primary.main : theme.palette.secondary.main}`,
                  }
                }}
              >
                {item.icon || (isLatest ? <MdWork size={15} /> : <MdBusiness size={15} />)}
              </Box>

              {/* Card */}
              <GlassCard 
                sx={{ 
                  p: { xs: 2.25, md: 4 },
                  position: 'relative',
                  overflow: 'hidden',
                  borderLeft: (theme) => `3.5px solid ${isLatest ? theme.palette.primary.main : theme.palette.secondary.main}`,
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    justifyContent: 'space-between',
                    alignItems: { xs: 'flex-start', md: 'center' },
                    mb: 3,
                    gap: 1.5,
                  }}
                >
                  <Box>
                    <Typography
                      variant="h5"
                      sx={{ 
                        fontWeight: 700, 
                        fontSize: { xs: '1.15rem', md: '1.3rem' }, 
                        mb: 0.5,
                        fontFamily: 'var(--font-outfit), sans-serif',
                        letterSpacing: '-0.01em',
                      }}
                    >
                      {item.title}
                    </Typography>
                    
                    <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1 }}>
                      <Typography
                        variant="body2"
                        color={isLatest ? 'primary.main' : 'secondary.main'}
                        sx={{
                          fontWeight: 700,
                          fontSize: '0.875rem',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 0.5,
                        }}
                      >
                        {item.company}
                      </Typography>
                      {item.link && (
                        <Typography
                          component="a"
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          sx={{
                            fontSize: '0.75rem',
                            color: 'text.secondary',
                            textDecoration: 'none',
                            transition: 'all 0.2s ease',
                            opacity: 0.6,
                            '&:hover': { 
                              color: 'primary.main',
                              opacity: 1,
                              transform: 'translate(1px, -1px)',
                            },
                          }}
                        >
                          ↗
                        </Typography>
                      )}
                    </Box>
                  </Box>

                  {/* Date Badge & Location */}
                  <Box sx={{ textAlign: { xs: 'left', md: 'right' } }}>
                    <Chip
                      label={item.period}
                      size="small"
                      sx={{
                        bgcolor: (theme) =>
                          isLatest
                            ? theme.palette.mode === 'dark' ? 'rgba(129, 140, 248, 0.08)' : 'rgba(79, 70, 229, 0.06)'
                            : theme.palette.mode === 'dark' ? 'rgba(52, 211, 153, 0.08)' : 'rgba(5, 150, 105, 0.06)',
                        borderColor: (theme) =>
                          isLatest
                            ? theme.palette.mode === 'dark' ? 'rgba(129, 140, 248, 0.2)' : 'rgba(79, 70, 229, 0.12)'
                            : theme.palette.mode === 'dark' ? 'rgba(52, 211, 153, 0.2)' : 'rgba(5, 150, 105, 0.12)',
                        color: (theme) =>
                          isLatest
                            ? theme.palette.mode === 'dark' ? '#A5B4FC' : '#4F46E5'
                            : theme.palette.mode === 'dark' ? '#6EE7B7' : '#059669',
                        fontWeight: 700,
                        fontSize: '0.725rem',
                        px: 0.5,
                        py: 0.25,
                        height: 26,
                        mb: 0.75,
                      }}
                    />
                    <Typography 
                      variant="caption" 
                      color="text.secondary" 
                      sx={{ 
                        mt: 0.5, 
                        display: 'block', 
                        fontSize: '0.75rem',
                        fontWeight: 500,
                        opacity: 0.8,
                      }}
                    >
                      {item.location}
                    </Typography>
                  </Box>
                </Box>

                {/* Bullet Points with custom chevron icons instead of standard bullets */}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25, pl: 0, mb: 3.5 }}>
                  {item.description.map((bullet, idx) => (
                    <Box
                      key={idx}
                      sx={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 1.25,
                      }}
                    >
                      <Box sx={{ display: 'flex', mt: '3px', color: themeColor, flexShrink: 0 }}>
                        <MdChevronRight size={16} />
                      </Box>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          fontSize: { xs: '0.875rem', md: '0.85rem' },
                          lineHeight: 1.6,
                        }}
                      >
                        {bullet}
                      </Typography>
                    </Box>
                  ))}
                </Box>

                {/* Skills */}
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {item.skills.map((skill) => (
                    <Chip
                      key={skill}
                      label={skill}
                      size="small"
                      sx={{
                        fontSize: '0.6875rem',
                        height: 25,
                        px: 0.5,
                        bgcolor: (theme) =>
                          theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.02)',
                        borderColor: (theme) =>
                          theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.06)',
                        color: 'text.secondary',
                        '&:hover': {
                          color: themeColor,
                          borderColor: themeColor,
                          bgcolor: (theme) =>
                            theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.04)',
                        },
                      }}
                    />
                  ))}
                </Box>
              </GlassCard>
            </motion.div>
          </Box>
        );
      })}
    </Box>
  );
}
