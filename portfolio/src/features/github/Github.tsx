'use client';

import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import Button from '@mui/material/Button';
import { motion } from 'framer-motion';
import { FaGithub, FaStar, FaExternalLinkAlt } from 'react-icons/fa';
import SectionHeader from '@/components/SectionHeader';
import GlassCard from '@/components/GlassCard';
import { GitHubRepo } from '@/utils/fallbackData';

// Color map for coding languages
const langColors: { [key: string]: string } = {
  JavaScript: '#F1E05A',
  TypeScript: '#3178C6',
  Python: '#3572A5',
  Java: '#B07219',
  HTML: '#E34C26',
  CSS: '#563D7C',
};

export default function Github() {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const res = await fetch('/api/github');
        if (res.ok) {
          const data = await res.json();
          setRepos(data);
        }
      } catch (err) {
        console.error('Failed to load GitHub repositories client-side', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

  return (
    <Box id="github-repos" sx={{ py: { xs: 10, md: 14 } }}>
      <Container maxWidth="lg">
        <SectionHeader
          title="GitHub Repository Activity"
          subtitle="Real-time repositories fetched directly from my GitHub profile. Highlighting active coding templates and scripts."
        />

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' },
            gap: 3,
          }}
        >
          {loading
            ? // Display Skeleton placeholders while loading
              Array.from(new Array(6)).map((_, idx) => (
                <Box key={idx}>
                  <GlassCard sx={{ p: 3.5, height: 180, display: 'flex', flexDirection: 'column' }}>
                    <Skeleton variant="text" width="60%" height={24} sx={{ mb: 1.5 }} />
                    <Skeleton variant="text" width="90%" height={16} sx={{ mb: 1 }} />
                    <Skeleton variant="text" width="75%" height={16} sx={{ mb: 'auto' }} />
                    <Box sx={{ display: 'flex', gap: 2 }}>
                      <Skeleton variant="circular" width={16} height={16} />
                      <Skeleton variant="text" width="20%" height={16} />
                    </Box>
                  </GlassCard>
                </Box>
              ))
            : // Render Repository Cards
              repos.slice(0, 6).map((repo, index) => (
                <Box key={repo.name} sx={{ display: 'flex' }}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.08, ease: 'easeOut' }}
                    style={{ width: '100%', display: 'flex' }}
                  >
                    <GlassCard
                      sx={{
                        p: 3.5,
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                      }}
                    >
                      {/* Repo Name */}
                      <Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
                          <Typography
                            component="a"
                            href={repo.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            variant="h6"
                            sx={{
                              fontWeight: 700,
                              fontSize: '1.05rem',
                              fontFamily: 'monospace',
                              color: 'text.primary',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                              mr: 1,
                              '&:hover': {
                                color: 'primary.main',
                              },
                            }}
                          >
                            {repo.name}
                          </Typography>
                          <Box sx={{ display: 'flex', color: 'text.secondary', flexShrink: 0 }}>
                            <FaExternalLinkAlt size={12} />
                          </Box>
                        </Box>

                        {/* Repo Description */}
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{
                            mb: 3,
                            fontSize: '0.825rem',
                            lineHeight: 1.5,
                            display: '-webkit-box',
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                          }}
                        >
                          {repo.description}
                        </Typography>
                      </Box>

                      {/* Repo Meta info */}
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 'auto' }}>
                        {/* Language dot indicator */}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Box
                            sx={{
                              width: 10,
                              height: 10,
                              borderRadius: '50%',
                              bgcolor: langColors[repo.language] || '#888',
                            }}
                          />
                          <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.secondary' }}>
                            {repo.language}
                          </Typography>
                        </Box>

                        {/* Star Count */}
                        {repo.stargazers_count > 0 && (
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'text.secondary' }}>
                            <FaStar size={12} />
                            <Typography variant="caption" sx={{ fontWeight: 700 }}>
                              {repo.stargazers_count}
                            </Typography>
                          </Box>
                        )}
                      </Box>
                    </GlassCard>
                  </motion.div>
                </Box>
              ))}
        </Box>

        {/* View All Button */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
          <Button
            component="a"
            href="https://github.com/aadil124?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            variant="outlined"
            startIcon={<FaGithub />}
            sx={{
              px: 3.5,
              py: 1.5,
              borderRadius: 2,
              fontWeight: 700,
              fontSize: '0.9rem',
              borderColor: (theme) =>
                theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)',
              color: 'text.primary',
              '&:hover': {
                borderColor: 'primary.main',
                bgcolor: 'rgba(59, 130, 246, 0.05)',
              },
            }}
          >
            Explore More on GitHub
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
