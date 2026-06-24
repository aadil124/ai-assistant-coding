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
    <Box id="github-repos" sx={{ py: { xs: 8, md: 12 } }}>
      <Container maxWidth="lg">
        <SectionHeader
          label="Open Source"
          title="GitHub Repositories"
          subtitle="Repositories fetched from my GitHub profile — active templates, scripts, and side projects."
        />

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' },
            gap: 2,
          }}
        >
          {loading
            ? Array.from(new Array(6)).map((_, idx) => (
                <Box key={idx}>
                  <GlassCard sx={{ p: 3, height: 160, display: 'flex', flexDirection: 'column' }}>
                    <Skeleton variant="text" width="55%" height={20} sx={{ mb: 1 }} />
                    <Skeleton variant="text" width="85%" height={14} sx={{ mb: 0.5 }} />
                    <Skeleton variant="text" width="70%" height={14} sx={{ mb: 'auto' }} />
                    <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
                      <Skeleton variant="circular" width={10} height={10} />
                      <Skeleton variant="text" width="20%" height={12} />
                    </Box>
                  </GlassCard>
                </Box>
              ))
            : repos.slice(0, 6).map((repo, index) => (
                <Box key={repo.name} sx={{ display: 'flex' }}>
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    style={{ width: '100%', display: 'flex' }}
                  >
                    <GlassCard
                      sx={{
                        p: 3,
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                      }}
                    >
                      <Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                          <Typography
                            component="a"
                            href={repo.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            variant="body1"
                            sx={{
                              fontWeight: 600,
                              fontSize: '0.875rem',
                              fontFamily: 'monospace',
                              color: 'text.primary',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                              mr: 1,
                              transition: 'color 0.15s ease',
                              '&:hover': { color: 'primary.main' },
                            }}
                          >
                            {repo.name}
                          </Typography>
                          <Box sx={{ color: 'text.secondary', flexShrink: 0, display: 'flex' }}>
                            <FaExternalLinkAlt size={10} />
                          </Box>
                        </Box>

                        <Typography
                          variant="caption"
                          color="text.secondary"
                          sx={{
                            mb: 2,
                            fontSize: '0.75rem',
                            lineHeight: 1.5,
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                          }}
                        >
                          {repo.description}
                        </Typography>
                      </Box>

                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 'auto' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                          <Box
                            sx={{
                              width: 8,
                              height: 8,
                              borderRadius: '50%',
                              bgcolor: langColors[repo.language] || '#71717A',
                            }}
                          />
                          <Typography variant="caption" sx={{ fontWeight: 500, color: 'text.secondary', fontSize: '0.6875rem' }}>
                            {repo.language}
                          </Typography>
                        </Box>

                        {repo.stargazers_count > 0 && (
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'text.secondary' }}>
                            <FaStar size={10} />
                            <Typography variant="caption" sx={{ fontWeight: 500, fontSize: '0.6875rem' }}>
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

        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Button
            component="a"
            href="https://github.com/aadil124?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            variant="outlined"
            size="small"
            startIcon={<FaGithub size={14} />}
            sx={{
              px: 2.5,
              py: 1,
              fontSize: '0.8125rem',
            }}
          >
            View All Repositories
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
