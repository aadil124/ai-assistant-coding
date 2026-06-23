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

  // Toast status states
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

    // Read EmailJS configs from env variables
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

      // Simulate network request duration
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
      icon: <MdEmail size={22} />,
      label: 'Email',
      value: 'ansariaadil2623@gmail.com',
      url: 'mailto:ansariaadil2623@gmail.com',
      color: '#3B82F6',
    },
    {
      icon: <MdPhone size={22} />,
      label: 'Phone',
      value: '+91 7276450124',
      url: 'tel:+917276450124',
      color: '#10B981',
    },
    {
      icon: <MdLocationOn size={22} />,
      label: 'Location',
      value: 'Bhiwandi Thane, Mumbai, India',
      url: 'https://maps.google.com/?q=Bhiwandi+Thane+Mumbai+India',
      color: '#EC4899',
    },
  ];

  return (
    <Box id="contact" sx={{ py: { xs: 10, md: 14 }, bgcolor: 'background.default' }}>
      <Container maxWidth="lg">
        <SectionHeader
          title="Get In Touch"
          subtitle="Interested in hiring me for a role, discussing a MERN contract, or reviewing code details? Reach out directly."
        />

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '5fr 7fr' },
            gap: { xs: 5, md: 8 },
          }}
        >
          {/* Direct Details Column */}
          <Box>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
            >
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 2, fontSize: '1.75rem' }}>
                Let&apos;s <span className="text-gradient">Collaborate</span>
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 4, lineHeight: 1.75 }}>
                I am actively seeking roles as a Senior Frontend / MERN Developer. I am open to permanent positions, remote contracts, or project consulting. Reach out using the form, or ping me directly.
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
                        p: 2.5,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2.5,
                        '&:hover': {
                          transform: 'translateX(6px)',
                        },
                      }}
                    >
                      <Box
                        sx={{
                          p: 1.5,
                          borderRadius: 3,
                          bgcolor: `${detail.color}12`,
                          color: detail.color,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        {detail.icon}
                      </Box>
                      <Box>
                        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', fontWeight: 600 }}>
                          {detail.label}
                        </Typography>
                        <Typography variant="body1" sx={{ fontWeight: 700, fontSize: { xs: '0.9rem', sm: '1rem' } }}>
                          {detail.value}
                        </Typography>
                      </Box>
                    </GlassCard>
                  </a>
                ))}
              </Stack>
            </motion.div>
          </Box>

          {/* Form Column */}
          <Box>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
            >
              <GlassCard sx={{ p: { xs: 3, sm: 4 } }}>
                <form ref={formRef} onSubmit={handleSubmit}>
                  <Box
                    sx={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(12, 1fr)',
                      gap: 2.5,
                    }}
                  >
                    {/* Name */}
                    <Box sx={{ gridColumn: { xs: 'span 12', sm: 'span 6' } }}>
                      <TextField
                        required
                        fullWidth
                        label="Your Name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        variant="outlined"
                      />
                    </Box>

                    {/* Email */}
                    <Box sx={{ gridColumn: { xs: 'span 12', sm: 'span 6' } }}>
                      <TextField
                        required
                        fullWidth
                        type="email"
                        label="Your Email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        variant="outlined"
                      />
                    </Box>

                    {/* Subject */}
                    <Box sx={{ gridColumn: 'span 12' }}>
                      <TextField
                        required
                        fullWidth
                        label="Subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        variant="outlined"
                      />
                    </Box>

                    {/* Message */}
                    <Box sx={{ gridColumn: 'span 12' }}>
                      <TextField
                        required
                        fullWidth
                        multiline
                        rows={5}
                        label="Your Message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        variant="outlined"
                      />
                    </Box>

                    {/* Submit Button */}
                    <Box sx={{ gridColumn: 'span 12' }}>
                      <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        fullWidth
                        disabled={loading}
                        endIcon={!loading && <MdSend />}
                        sx={{ py: 1.8, borderRadius: 2 }}
                      >
                        {loading ? (
                          <CircularProgress size={24} color="inherit" />
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
      </Container>

      {/* MUI Toast Notification feedback */}
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
    </Box>
  );
}
