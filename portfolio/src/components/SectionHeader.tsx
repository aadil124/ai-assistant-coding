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
        {/* Optional label chip */}
        {label && (
          <Typography
            component="span"
            sx={{
              fontSize: '0.7rem',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'primary.main',
              mb: 2,
              px: 1.5,
              py: 0.5,
              borderRadius: '6px',
              bgcolor: (theme) =>
                theme.palette.mode === 'dark'
                  ? 'rgba(129, 140, 248, 0.08)'
                  : 'rgba(79, 70, 229, 0.06)',
              border: (theme) =>
                `1px solid ${theme.palette.mode === 'dark' ? 'rgba(129, 140, 248, 0.15)' : 'rgba(79, 70, 229, 0.12)'}`,
            }}
          >
            {label}
          </Typography>
        )}

        <Typography
          variant="h2"
          sx={{
            fontSize: { xs: '1.875rem', sm: '2.25rem', md: '2.75rem' },
            fontWeight: 700,
            color: 'text.primary',
            fontFamily: 'var(--font-outfit), system-ui, sans-serif',
            mb: subtitle ? 1.5 : 0,
          }}
        >
          {title}
        </Typography>

        {subtitle && (
          <Typography
            variant="subtitle1"
            color="text.secondary"
            sx={{
              maxWidth: 560,
              fontSize: { xs: '0.875rem', md: '0.9375rem' },
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
