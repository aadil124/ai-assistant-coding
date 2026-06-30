'use client';

import React, { useState, useRef } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import { motion } from 'framer-motion';
import { MdEmail, MdPhone, MdLocationOn, MdSend } from 'react-icons/md';
import emailjs from '@emailjs/browser';
import SectionHeader from '@/components/SectionHeader';
import GlassCard from '@/components/GlassCard';

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [toast, setToast] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error',
  });

  const handleCloseToast = () => {
    setToast((prev) => ({ ...prev, open: false }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      console.warn(
        'EmailJS variables are missing in environment setup. Please add:\n' +
        '- NEXT_PUBLIC_EMAILJS_SERVICE_ID\n' +
        '- NEXT_PUBLIC_EMAILJS_TEMPLATE_ID\n' +
        '- NEXT_PUBLIC_EMAILJS_PUBLIC_KEY\n' +
        'Simulating email delivery successfully in development mode.'
      );

      setTimeout(() => {
        setLoading(false);
        setToast({
          open: true,
          message: 'Message simulated successfully! (Fill env credentials for production)',
          severity: 'success',
        });
        setFormData({ name: '', email: '', subject: '', message: '' });
      }, 1500);
      return;
    }

    try {
      if (formRef.current) {
        const result = await emailjs.sendForm(
          serviceId,
          templateId,
          formRef.current,
          publicKey
        );

        if (result.text === 'OK') {
          setToast({
            open: true,
            message: 'Your message has been sent successfully!',
            severity: 'success',
          });
          setFormData({ name: '', email: '', subject: '', message: '' });
        } else {
          throw new Error(`EmailJS responded with text: ${result.text}`);
        }
      }
    } catch (error) {
      console.error('EmailJS send email error:', error);
      setToast({
        open: true,
        message: 'Could not send message. Please try emailing directly.',
        severity: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const contactDetails = [
    {
      icon: <MdEmail size={20} />,
      label: 'Email',
      value: 'ansariaadil2623@gmail.com',
      url: 'mailto:ansariaadil2623@gmail.com',
      color: '#818CF8',
      bgColor: 'rgba(129, 140, 248, 0.08)',
    },
    {
      icon: <MdPhone size={20} />,
      label: 'Phone',
      value: '+91 7276450124',
      url: 'tel:+917276450124',
      color: '#34D399',
      bgColor: 'rgba(52, 211, 153, 0.08)',
    },
    {
      icon: <MdLocationOn size={20} />,
      label: 'Location',
      value: 'Bhiwandi, Mumbai, India',
      url: 'https://maps.google.com/?q=Bhiwandi+Thane+Mumbai+India',
      color: '#F9A8D4',
      bgColor: 'rgba(249, 168, 212, 0.08)',
    },
  ];

  type HTMLInputChangeEvent = React.ChangeEvent<HTMLInputElement>;

  return (
    <Box 
      id="contact" 
      className="bg-grid"
      sx={{ 
        py: { xs: 8, md: 12 },
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
          label="Connect"
          title="Get In Touch"
          subtitle="Interested in working together? I'm open to full-time roles, contracts, and consulting."
        />

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '5fr 7fr' },
            gap: { xs: 5, md: 6 },
          }}
        >
          {/* Contact Details */}
          <Box>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <Typography 
                variant="h4" 
                sx={{ 
                  fontWeight: 800, 
                  mb: 2, 
                  fontSize: { xs: '1.45rem', md: '1.75rem' },
                  fontFamily: 'var(--font-outfit), sans-serif',
                  letterSpacing: '-0.02em',
                }}
              >
                Let&apos;s <span className="text-gradient">Collaborate</span>
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 4, lineHeight: 1.75 }}>
                I am actively seeking roles as a Senior Frontend / MERN Developer. Open to permanent positions, remote contracts, or project consulting.
              </Typography>

              <Stack spacing={2.5}>
                {contactDetails.map((detail) => (
                  <a
                    key={detail.label}
                    href={detail.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
                  >
                    <GlassCard
                      sx={{
                        p: { xs: 2.25, md: 2.5 },
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2.5,
                        '&:hover': {
                          transform: 'translateX(6px)',
                          borderColor: detail.color,
                        },
                      }}
                    >
                      {/* Tinted circular container for icon */}
                      <Box
                        sx={{
                          width: 44,
                          height: 44,
                          borderRadius: '50%',
                          bgcolor: detail.bgColor,
                          color: detail.color,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                          boxShadow: `0 2px 8px ${detail.color}15`,
                        }}
                      >
                        {detail.icon}
                      </Box>
                      <Box>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          sx={{ 
                            display: 'block', 
                            fontWeight: 700, 
                            fontSize: { xs: '0.75rem', md: '0.65rem' }, 
                            letterSpacing: '0.08em', 
                            textTransform: 'uppercase', 
                            mb: 0.5 
                          }}
                        >
                          {detail.label}
                        </Typography>
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            fontWeight: 700, 
                            fontSize: { xs: '0.9375rem', md: '0.9rem' },
                            color: 'text.primary',
                          }}
                        >
                          {detail.value}
                        </Typography>
                      </Box>
                    </GlassCard>
                  </a>
                ))}
              </Stack>
            </motion.div>
          </Box>

          {/* Form Card */}
          <Box>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <GlassCard 
                sx={{ 
                  p: { xs: 2.25, sm: 4.5 },
                  bgcolor: (theme) => theme.palette.mode === 'dark' ? '#0E0E12' : '#FFFFFF',
                  '&:hover': { transform: 'none' }, // Static form panel
                }}
              >
                <form ref={formRef} onSubmit={handleSubmit}>
                  <Box
                    sx={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(12, 1fr)',
                      gap: 2.5,
                    }}
                  >
                    <Box sx={{ gridColumn: 'span 12', mb: 1 }}>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 800,
                          fontFamily: 'var(--font-outfit), sans-serif',
                          fontSize: '1.15rem',
                          mb: 0.5,
                        }}
                      >
                        Send a Message
                      </Typography>
                      <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.875rem', md: '0.75rem' } }}>
                        Fill out the details below and I will get back to you within 24 hours.
                      </Typography>
                    </Box>

                    <Box sx={{ gridColumn: { xs: 'span 12', sm: 'span 6' } }}>
                      <TextField
                        required
                        fullWidth
                        label="Your Name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                      />
                    </Box>
                    <Box sx={{ gridColumn: { xs: 'span 12', sm: 'span 6' } }}>
                      <TextField
                        required
                        fullWidth
                        type="email"
                        label="Your Email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                    </Box>
                    <Box sx={{ gridColumn: 'span 12' }}>
                      <TextField
                        required
                        fullWidth
                        label="Subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                      />
                    </Box>
                    <Box sx={{ gridColumn: 'span 12' }}>
                      <TextField
                        required
                        fullWidth
                        multiline
                        rows={4}
                        label="Your Message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                      />
                    </Box>
                    <Box sx={{ gridColumn: 'span 12' }}>
                      <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        fullWidth
                        disabled={loading}
                        endIcon={!loading && <MdSend size={16} />}
                        sx={{
                          py: 1.75,
                          fontSize: '0.875rem',
                        }}
                      >
                        {loading ? (
                          <CircularProgress size={20} color="inherit" />
                        ) : (
                          'Send Message'
                        )}
                      </Button>
                    </Box>
                  </Box>
                </form>
              </GlassCard>
            </motion.div>
          </Box>
        </Box>

        <Snackbar
          open={toast.open}
          autoHideDuration={6000}
          onClose={handleCloseToast}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert onClose={handleCloseToast} severity={toast.severity} sx={{ width: '100%' }}>
            {toast.message}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
}
