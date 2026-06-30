'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import { FaWhatsapp } from 'react-icons/fa';

export default function WhatsAppButton() {
  return (
    <Tooltip 
      title="Chat on WhatsApp" 
      placement="left"
    >
      <Box
        component="a"
        href="https://wa.me/917276450124"
        target="_blank"
        rel="noopener noreferrer"
        sx={{
          position: 'fixed',
          bottom: { xs: 20, md: 28 },
          right: { xs: 20, md: 28 },
          width: { xs: 50, md: 56 },
          height: { xs: 50, md: 56 },
          borderRadius: '50%',
          bgcolor: '#25D366',
          color: '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 16px rgba(37, 211, 102, 0.3), 0 0 0 1px rgba(37, 211, 102, 0.1)',
          zIndex: 999,
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            bgcolor: '#20BA5A',
            transform: 'scale(1.1) translateY(-3px)',
            boxShadow: '0 8px 24px rgba(37, 211, 102, 0.5), 0 0 0 2px rgba(37, 211, 102, 0.2)',
          },
          '&:active': {
            transform: 'scale(0.95) translateY(0)',
          }
        }}
      >
        <FaWhatsapp size={28} />
      </Box>
    </Tooltip>
  );
}
