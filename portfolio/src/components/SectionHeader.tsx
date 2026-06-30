'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  label?: string;
  centered?: boolean;
}

export default function SectionHeader({ title, subtitle, label, centered = false }: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{ width: '100%' }}
    >
      <Box
        sx={{
          mb: { xs: 5, md: 7 },
          textAlign: centered ? 'center' : 'left',
          display: 'flex',
          flexDirection: 'column',
          alignItems: centered ? 'center' : 'flex-start',
        }}
      >
        {/* Sleek kicker/eyebrow label */}
        {label && (
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1.25,
              mb: 1.5,
            }}
          >
            {/* Tiny accent dot */}
            <Box
              sx={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                bgcolor: 'primary.main',
                boxShadow: (theme) => `0 0 8px ${theme.palette.primary.main}`,
              }}
            />
            <Typography
              component="span"
              sx={{
                fontSize: '0.725rem',
                fontWeight: 650,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'primary.main',
                fontFamily: 'var(--font-inter), system-ui, sans-serif',
              }}
            >
              {label}
            </Typography>
          </Box>
        )}

        <Typography
          variant="h2"
          sx={{
            fontSize: { xs: '2rem', sm: '2.5rem', md: '2.85rem' }, // clamp 2rem-3rem feel
            fontWeight: 800,
            color: 'text.primary',
            fontFamily: 'var(--font-outfit), system-ui, sans-serif',
            mb: subtitle ? 2 : 0,
            letterSpacing: '-0.025em',
            position: 'relative',
          }}
        >
          {title}
        </Typography>

        {subtitle && (
          <Typography
            variant="subtitle1"
            color="text.secondary"
            sx={{
              maxWidth: 580,
              fontSize: { xs: '0.875rem', md: '0.975rem' },
              fontWeight: 400,
              lineHeight: 1.7,
            }}
          >
            {subtitle}
          </Typography>
        )}
      </Box>
    </motion.div>
  );
}
