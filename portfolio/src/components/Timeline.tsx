'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import { motion } from 'framer-motion';
import GlassCard from './GlassCard';

export interface TimelineItemData {
  title: string;
  company: string;
  location: string;
  period: string;
  description: string[];
  skills: string[];
  link?: string;
}

interface TimelineProps {
  items: TimelineItemData[];
}

export default function Timeline({ items }: TimelineProps) {
  return (
    <Box sx={{ position: 'relative', pl: { xs: 3, md: 5 }, pr: 1 }}>
      {/* Central timeline line */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: { xs: 8, md: 16 },
          width: '2px',
          background: (theme) => 
            theme.palette.mode === 'dark'
              ? 'linear-gradient(to bottom, rgba(59, 130, 246, 0.4) 0%, rgba(16, 185, 129, 0.4) 100%)'
              : 'linear-gradient(to bottom, rgba(37, 99, 235, 0.4) 0%, rgba(16, 185, 129, 0.4) 100%)',
        }}
      />

      {items.map((item, index) => (
        <Box
          key={`${item.company}-${item.title}-${index}`}
          sx={{
            position: 'relative',
            mb: 6,
            '&:last-child': { mb: 0 },
          }}
        >
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] as const }}
          >
          {/* Timeline node */}
          <Box
            sx={{
              position: 'absolute',
              left: { xs: -28, md: -44 },
              top: 24,
              width: { xs: 12, md: 16 },
              height: { xs: 12, md: 16 },
              borderRadius: '50%',
              bgcolor: index === 0 ? 'primary.main' : 'secondary.main',
              border: (theme) => 
                theme.palette.mode === 'dark' 
                  ? '3px solid #030712' 
                  : '3px solid #F8FAFC',
              boxShadow: (theme) =>
                index === 0
                  ? `0 0 0 4px ${theme.palette.mode === 'dark' ? 'rgba(59, 130, 246, 0.25)' : 'rgba(37, 99, 235, 0.25)'}`
                  : `0 0 0 4px ${theme.palette.mode === 'dark' ? 'rgba(16, 185, 129, 0.25)' : 'rgba(16, 185, 129, 0.25)'}`,
              zIndex: 2,
            }}
          />

          {/* Experience Card */}
          <GlassCard sx={{ p: { xs: 3, md: 4 } }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                justifyContent: 'space-between',
                alignItems: { xs: 'flex-start', md: 'center' },
                mb: 2,
                gap: 1,
              }}
            >
              <Box>
                <Typography variant="h5" sx={{ fontWeight: 700, fontSize: { xs: '1.15rem', md: '1.35rem' } }}>
                  {item.title}
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="primary.main"
                  sx={{
                    fontWeight: 600,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 1,
                  }}
                >
                  {item.company}
                  {item.link && (
                    <Typography
                      component="a"
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        fontSize: '0.8rem',
                        textDecoration: 'underline',
                        color: 'secondary.main',
                        '&:hover': { color: 'primary.light' },
                      }}
                    >
                      (Link)
                    </Typography>
                  )}
                </Typography>
              </Box>

              <Box sx={{ textAlign: { xs: 'left', md: 'right' } }}>
                <Typography
                  variant="body2"
                  sx={{
                    bgcolor: (theme) =>
                      theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)',
                    px: 1.5,
                    py: 0.5,
                    borderRadius: 1.5,
                    display: 'inline-block',
                    fontWeight: 600,
                    color: 'text.secondary',
                    fontSize: '0.85rem',
                  }}
                >
                  {item.period}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, fontSize: '0.85rem' }}>
                  {item.location}
                </Typography>
              </Box>
            </Box>

            {/* Achievements Bullet Points */}
            <Box component="ul" sx={{ pl: 2, mb: 3, color: 'text.secondary' }}>
              {item.description.map((bullet, idx) => (
                <Box
                  component="li"
                  key={idx}
                  sx={{
                    mb: 1.2,
                    fontSize: { xs: '0.9rem', md: '0.95rem' },
                    lineHeight: 1.6,
                    '&::marker': {
                      color: 'primary.main',
                    },
                  }}
                >
                  {bullet}
                </Box>
              ))}
            </Box>

            {/* Tech Stack Chips */}
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {item.skills.map((skill) => (
                <Chip
                  key={skill}
                  label={skill}
                  size="small"
                  variant="outlined"
                  sx={{
                    fontSize: '0.75rem',
                    bgcolor: (theme) =>
                      theme.palette.mode === 'dark'
                        ? 'rgba(59, 130, 246, 0.05)'
                        : 'rgba(37, 99, 235, 0.03)',
                    borderColor: (theme) =>
                      theme.palette.mode === 'dark'
                        ? 'rgba(255, 255, 255, 0.08)'
                        : 'rgba(0, 0, 0, 0.08)',
                    '&:hover': {
                      bgcolor: 'primary.main',
                      color: 'white',
                      borderColor: 'primary.main',
                    },
                    transition: 'all 0.2s ease',
                  }}
                />
              ))}
            </Box>
          </GlassCard>
          </motion.div>
        </Box>
      ))}
    </Box>
  );
}
