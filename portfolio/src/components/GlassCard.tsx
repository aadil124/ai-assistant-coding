'use client';

import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';

export const GlassCard = styled(Card)(({ theme }) => ({
  background: theme.palette.mode === 'dark' ? '#18181B' : '#FFFFFF',
  border: theme.palette.mode === 'dark'
    ? '1px solid rgba(255, 255, 255, 0.06)'
    : '1px solid rgba(0, 0, 0, 0.06)',
  borderRadius: 16,
  transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
  overflow: 'hidden',
  position: 'relative',
  boxShadow: theme.palette.mode === 'dark'
    ? '0 1px 2px rgba(0, 0, 0, 0.4)'
    : '0 1px 3px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.04)',
  '&:hover': {
    transform: 'translateY(-2px)',
    borderColor: theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, 0.1)'
      : 'rgba(0, 0, 0, 0.1)',
    boxShadow: theme.palette.mode === 'dark'
      ? '0 8px 24px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255,255,255,0.06)'
      : '0 8px 24px rgba(0, 0, 0, 0.06), 0 0 0 1px rgba(0,0,0,0.04)',
  },
}));

export default GlassCard;
