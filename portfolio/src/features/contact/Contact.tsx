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
      icon: <MdEmail size={18} />,
      label: 'Email',
      value: 'ansariaadil2623@gmail.com',
      url: 'mailto:ansariaadil2623@gmail.com',
      color: '#818CF8',
    },
    {
      icon: <MdPhone size={18} />,
      label: 'Phone',
      value: '+91 7276450124',
      url: 'tel:+917276450124',
      color: '#34D399',
    },
    {
      icon: <MdLocationOn size={18} />,
      label: 'Location',
      value: 'Bhiwandi, Mumbai, India',
      url: 'https://maps.google.com/?q=Bhiwandi+Thane+Mumbai+India',
      color: '#F9A8D4',
    },
  ];

  return (
    <Box id="contact" sx={{ py: { xs: 8, md: 12 } }}>
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
            gap: { xs: 4, md: 5 },
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
              <Typography variant="h4" sx={{ fontWeight: 600, mb: 1.5, fontSize: { xs: '1.25rem', md: '1.375rem' } }}>
                Let&apos;s <span className="text-gradient">Collaborate</span>
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3, lineHeight: 1.7 }}>
                I am actively seeking roles as a Senior Frontend / MERN Developer. Open to permanent positions, remote contracts, or project consulting.
              </Typography>

              <Stack spacing={1.5}>
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
                        p: 2,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                        '&:hover': {
                          transform: 'translateX(4px)',
                        },
                      }}
                    >
                      <Box sx={{ color: detail.color, display: 'flex' }}>
                        {detail.icon}
                      </Box>
                      <Box>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          sx={{ display: 'block', fontWeight: 500, fontSize: '0.625rem', letterSpacing: '0.06em', textTransform: 'uppercase', mb: 0.125 }}
                        >
                          {detail.label}
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '0.8125rem' }}>
                          {detail.value}
                        </Typography>
                      </Box>
                    </GlassCard>
                  </a>
                ))}
              </Stack>
            </motion.div>
          </Box>

          {/* Form */}
          <Box>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <GlassCard sx={{ p: { xs: 2.5, sm: 3.5 } }}>
                <form ref={formRef} onSubmit={handleSubmit}>
                  <Box
                    sx={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(12, 1fr)',
                      gap: 2,
                    }}
                  >
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
                          py: 1.5,
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
