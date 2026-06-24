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
    <Box sx={{ position: 'relative', pl: { xs: 3, md: 4 } }}>
      {/* Timeline line */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: { xs: 7, md: 11 },
          width: '1.5px',
          background: (theme) =>
            theme.palette.mode === 'dark'
              ? 'linear-gradient(to bottom, rgba(129, 140, 248, 0.3) 0%, rgba(52, 211, 153, 0.2) 100%)'
              : 'linear-gradient(to bottom, rgba(79, 70, 229, 0.2) 0%, rgba(5, 150, 105, 0.15) 100%)',
        }}
      />

      {items.map((item, index) => (
        <Box
          key={`${item.company}-${item.title}-${index}`}
          sx={{
            position: 'relative',
            mb: 4,
            '&:last-child': { mb: 0 },
          }}
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* Node dot */}
            <Box
              sx={{
                position: 'absolute',
                left: { xs: -27, md: -35 },
                top: 28,
                width: { xs: 10, md: 12 },
                height: { xs: 10, md: 12 },
                borderRadius: '50%',
                bgcolor: index === 0 ? 'primary.main' : 'secondary.main',
                border: (theme) =>
                  `2px solid ${theme.palette.background.default}`,
                boxShadow: (theme) =>
                  `0 0 0 3px ${
                    index === 0
                      ? theme.palette.mode === 'dark' ? 'rgba(129, 140, 248, 0.2)' : 'rgba(79, 70, 229, 0.15)'
                      : theme.palette.mode === 'dark' ? 'rgba(52, 211, 153, 0.2)' : 'rgba(5, 150, 105, 0.15)'
                  }`,
                zIndex: 2,
              }}
            />

            {/* Card */}
            <GlassCard sx={{ p: { xs: 2.5, md: 3.5 } }}>
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
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: 600, fontSize: { xs: '1.05rem', md: '1.2rem' }, mb: 0.25 }}
                  >
                    {item.title}
                  </Typography>
                  <Typography
                    variant="body2"
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
                          fontSize: '0.75rem',
                          color: 'text.secondary',
                          '&:hover': { color: 'primary.main' },
                        }}
                      >
                        ↗
                      </Typography>
                    )}
                  </Typography>
                </Box>

                <Box sx={{ textAlign: { xs: 'left', md: 'right' } }}>
                  <Typography
                    variant="caption"
                    sx={{
                      bgcolor: (theme) =>
                        theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)',
                      px: 1.5,
                      py: 0.4,
                      borderRadius: '6px',
                      display: 'inline-block',
                      fontWeight: 600,
                      color: 'text.secondary',
                      fontSize: '0.75rem',
                      border: (theme) =>
                        `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)'}`,
                    }}
                  >
                    {item.period}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block', fontSize: '0.75rem' }}>
                    {item.location}
                  </Typography>
                </Box>
              </Box>

              {/* Bullet Points */}
              <Box component="ul" sx={{ pl: 2, mb: 2.5, color: 'text.secondary' }}>
                {item.description.map((bullet, idx) => (
                  <Box
                    component="li"
                    key={idx}
                    sx={{
                      mb: 0.8,
                      fontSize: '0.8125rem',
                      lineHeight: 1.65,
                      '&::marker': {
                        color: 'primary.main',
                        fontSize: '0.7rem',
                      },
                    }}
                  >
                    {bullet}
                  </Box>
                ))}
              </Box>

              {/* Skills */}
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
                {item.skills.map((skill) => (
                  <Chip
                    key={skill}
                    label={skill}
                    size="small"
                    variant="outlined"
                    sx={{
                      fontSize: '0.6875rem',
                      height: 26,
                      borderColor: (theme) =>
                        theme.palette.mode === 'dark'
                          ? 'rgba(255, 255, 255, 0.06)'
                          : 'rgba(0, 0, 0, 0.08)',
                      color: 'text.secondary',
                      '&:hover': {
                        borderColor: 'primary.main',
                        color: 'primary.main',
                      },
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
