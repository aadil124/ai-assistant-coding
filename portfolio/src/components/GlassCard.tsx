'use client';

import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';

export const GlassCard = styled(Card)(({ theme }) => ({
  background: theme.palette.mode === 'dark' 
    ? 'rgba(15, 23, 42, 0.4)' 
    : 'rgba(255, 255, 255, 0.55)',
  backdropFilter: 'blur(16px)',
  WebkitBackdropFilter: 'blur(16px)',
  border: theme.palette.mode === 'dark' 
    ? '1px solid rgba(255, 255, 255, 0.05)' 
    : '1px solid rgba(0, 0, 0, 0.05)',
  borderRadius: 20,
  transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s ease',
  overflow: 'hidden',
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '100%',
    width: '100%',
    background: theme.palette.mode === 'dark'
      ? 'linear-gradient(130deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0) 100%)'
      : 'linear-gradient(130deg, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0) 100%)',
    pointerEvents: 'none',
    zIndex: 1,
  },
  '&:hover': {
    transform: 'translateY(-6px)',
    boxShadow: theme.palette.mode === 'dark'
      ? '0 20px 40px rgba(0, 0, 0, 0.5), 0 0 25px rgba(59, 130, 246, 0.12)'
      : '0 20px 40px rgba(0, 0, 0, 0.04), 0 0 25px rgba(37, 99, 235, 0.06)',
    borderColor: theme.palette.mode === 'dark'
      ? 'rgba(59, 130, 246, 0.25)'
      : 'rgba(37, 99, 235, 0.25)',
  },
}));

export default GlassCard;
