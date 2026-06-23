'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
}

export default function SectionHeader({ title, subtitle, centered = false }: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
      style={{ width: '100%' }}
    >
      <Box
        sx={{
          mb: { xs: 5, md: 8 },
          textAlign: centered ? 'center' : 'left',
          display: 'flex',
          flexDirection: 'column',
          alignItems: centered ? 'center' : 'flex-start',
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
            fontWeight: 800,
            position: 'relative',
            pb: 2,
            mb: 2,
            color: 'text.primary',
            fontFamily: 'var(--font-outfit), sans-serif',
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: 0,
              left: centered ? '50%' : 0,
              transform: centered ? 'translateX(-50%)' : 'none',
              width: 80,
              height: 4,
              borderRadius: 2,
              background: 'linear-gradient(90deg, #3B82F6 0%, #10B981 100%)',
            },
          }}
        >
          {title}
        </Typography>
        {subtitle && (
          <Typography
            variant="subtitle1"
            color="text.secondary"
            sx={{
              maxWidth: 700,
              fontSize: { xs: '1rem', md: '1.125rem' },
              fontWeight: 400,
              mt: 1,
            }}
          >
            {subtitle}
          </Typography>
        )}
      </Box>
    </motion.div>
  );
}
