'use client';

import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import { motion } from 'framer-motion';
import { FaGithub, FaStar } from 'react-icons/fa';
import { GoGitCommit, GoGitPullRequest } from 'react-icons/go';
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

// Colors representing commit density for the activity calendar (dark/light mode friendly)
const getContribColors = (mode: 'light' | 'dark') => {
  return mode === 'dark'
    ? ['#161B22', '#0E4429', '#006D32', '#26A641', '#39D353']
    : ['#EBEDF0', '#9BE9A8', '#40C463', '#30A14E', '#216E39'];
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

  // Generate mock but consistent contribution values for the 24 weeks x 7 days grid
  const generateContributionGrid = (mode: 'light' | 'dark') => {
    const colors = getContribColors(mode);
    const grid = [];
    // Seeded random-like generation to keep layout static & visual
    let seed = 124;
    for (let day = 0; day < 7; day++) {
      const row = [];
      for (let week = 0; week < 24; week++) {
        seed = (seed * 9301 + 49297) % 233280;
        const val = seed % 100;
        let colorIdx = 0;
        let commits = 0;
        if (val > 88) { colorIdx = 4; commits = seed % 12 + 8; }
        else if (val > 65) { colorIdx = 3; commits = seed % 6 + 4; }
        else if (val > 45) { colorIdx = 2; commits = seed % 3 + 2; }
        else if (val > 25) { colorIdx = 1; commits = 1; }
        row.push({ color: colors[colorIdx], commits, date: `Week ${week + 1}, Day ${day + 1}` });
      }
      grid.push(row);
    }
    return grid;
  };

  const dashboardStats = [
    { value: '1,420+', label: 'Total Commits', icon: <GoGitCommit size={16} />, color: '#818CF8', bgColor: 'rgba(129, 140, 248, 0.08)' },
    { value: '230+', label: 'Pull Requests', icon: <GoGitPullRequest size={15} />, color: '#34D399', bgColor: 'rgba(52, 211, 153, 0.08)' },
    { value: '18', label: 'Starred Repos', icon: <FaStar size={15} />, color: '#F59E0B', bgColor: 'rgba(245, 158, 11, 0.08)' },
  ];

  return (
    <Box 
      id="github-repos" 
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
          label="Open Source"
          title="GitHub Dashboard"
          subtitle="Repositories fetched from my GitHub profile — active templates, scripts, and side projects."
        />

        {/* GitHub Premium Dashboard Panel */}
        <Box sx={{ mb: 6 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <GlassCard
              sx={{
                p: { xs: 3, md: 4 },
                bgcolor: (theme) => theme.palette.mode === 'dark' ? '#0E0E12' : '#FFFFFF',
                border: (theme) => theme.palette.mode === 'dark' ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(0,0,0,0.06)',
                boxShadow: (theme) => theme.palette.mode === 'dark' ? '0 10px 30px rgba(0,0,0,0.4)' : '0 10px 30px rgba(0,0,0,0.04)',
                '&:hover': { transform: 'none' }, // Static dashboard container
              }}
            >
              {/* Dashboard Layout: Stats & Profile Summary */}
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', md: '4.5fr 7.5fr' },
                  gap: 4,
                  alignItems: 'center',
                  mb: 4.5,
                }}
              >
                {/* Profile Summary Widget */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.5 }}>
                  <Avatar
                    src="https://github.com/aadil124.png"
                    alt="Mohd Adil Ansari"
                    sx={{
                      width: { xs: 60, md: 74 },
                      height: { xs: 60, md: 74 },
                      border: (theme) => `2px solid ${theme.palette.primary.main}`,
                      boxShadow: (theme) => `0 0 12px ${theme.palette.primary.main}25`,
                    }}
                  />
                  <Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 800,
                        fontFamily: 'var(--font-outfit), sans-serif',
                        lineHeight: 1.2,
                        fontSize: '1.15rem',
                      }}
                    >
                      Mohd Adil Ansari
                    </Typography>
                    <Typography
                      variant="caption"
                      color="primary.main"
                      sx={{ fontFamily: 'monospace', fontWeight: 600, display: 'block', mb: 0.5 }}
                    >
                      @aadil124
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', lineHeight: 1.4, fontSize: { xs: '0.875rem', md: '0.75rem' } }}>
                      Senior Full Stack Developer specializing in React, Node.js, and high-performance SaaS tools.
                    </Typography>
                  </Box>
                </Box>

                {/* Dashboard Stats */}
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' },
                    gap: 2,
                  }}
                >
                  {dashboardStats.map((stat, sIdx) => (
                    <Box
                      key={sIdx}
                      sx={{
                        bgcolor: (theme) =>
                          theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)',
                        border: (theme) =>
                          `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)'}`,
                        p: 2,
                        borderRadius: '10px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textAlign: 'center',
                      }}
                    >
                      <Box
                        sx={{
                          width: 32,
                          height: 32,
                          borderRadius: '50%',
                          bgcolor: stat.bgColor,
                          color: stat.color,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mb: 1.5,
                        }}
                      >
                        {stat.icon}
                      </Box>
                      <Typography
                        variant="h5"
                        sx={{
                          fontWeight: 800,
                          color: 'text.primary',
                          fontSize: { xs: '0.95rem', md: '1.2rem' },
                          fontFamily: 'var(--font-outfit), sans-serif',
                          lineHeight: 1.1,
                          mb: 0.25,
                        }}
                      >
                        {stat.value}
                      </Typography>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{
                          fontSize: '0.625rem',
                          fontWeight: 600,
                          textTransform: 'uppercase',
                          letterSpacing: '0.04em',
                        }}
                      >
                        {stat.label}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>

              {/* Contribution Calendar Graph Layout */}
              <Box
                sx={{
                  pt: 3.5,
                  borderTop: (theme) => `1px solid ${theme.palette.divider}`,
                }}
              >
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    fontSize: '0.675rem',
                    mb: 2,
                    display: 'block',
                  }}
                >
                  Contribution Activity (Last 6 Months)
                </Typography>

                {/* Horizontal Scroll wrapper for mobile graph viewports */}
                <Box sx={{ overflowX: 'auto', pb: 1, width: '100%' }}>
                  <Box sx={{ minWidth: 420, display: 'flex', flexDirection: 'column', gap: '3px' }}>
                    {/* Rows */}
                    {(['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] as const).map((dayName, dIdx) => {
                      const mode = (typeof window !== 'undefined' && document.documentElement.classList.contains('theme-light')) ? 'light' : 'dark';
                      const rowData = generateContributionGrid(mode)[dIdx] || [];
                      
                      return (
                        <Box key={dayName} sx={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                          {/* Day Label */}
                          <Typography
                            variant="caption"
                            sx={{
                              width: 26,
                              fontSize: '0.55rem',
                              color: 'text.secondary',
                              opacity: dIdx % 2 === 1 ? 0.7 : 0, // Show Mon, Wed, Fri only like standard GitHub
                              userSelect: 'none',
                              mr: 0.5,
                            }}
                          >
                            {dayName}
                          </Typography>

                          {/* Grid cells */}
                          {rowData.map((cell, cIdx) => (
                            <Tooltip
                              key={cIdx}
                              title={`${cell.commits === 0 ? 'No' : cell.commits} contributions on ${cell.date}`}
                              arrow
                              placement="top"
                            >
                              <Box
                                sx={{
                                  width: 11,
                                  height: 11,
                                  borderRadius: '2px',
                                  bgcolor: cell.color,
                                  cursor: 'pointer',
                                  transition: 'transform 0.1s ease',
                                  '&:hover': {
                                    transform: 'scale(1.25)',
                                    zIndex: 1,
                                  }
                                }}
                              />
                            </Tooltip>
                          ))}
                        </Box>
                      );
                    })}
                  </Box>
                </Box>

                {/* Graph Legend */}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 0.75, mt: 1.5 }}>
                  <Typography variant="caption" sx={{ fontSize: '0.625rem', color: 'text.secondary' }}>
                    Less
                  </Typography>
                  {[0, 1, 2, 3, 4].map((level) => {
                    const mode = (typeof window !== 'undefined' && document.documentElement.classList.contains('theme-light')) ? 'light' : 'dark';
                    const colors = getContribColors(mode);
                    return (
                      <Box
                        key={level}
                        sx={{
                          width: 10,
                          height: 10,
                          borderRadius: '2px',
                          bgcolor: colors[level],
                        }}
                      />
                    );
                  })}
                  <Typography variant="caption" sx={{ fontSize: '0.625rem', color: 'text.secondary' }}>
                    More
                  </Typography>
                </Box>
              </Box>
            </GlassCard>
          </motion.div>
        </Box>

        {/* Repositories Grid Section */}
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            fontFamily: 'var(--font-outfit), sans-serif',
            fontSize: '1rem',
            mb: 2.5,
            color: 'text.primary',
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}
        >
          Featured Repositories
        </Typography>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' },
            gap: 2.5,
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
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    style={{ width: '100%', display: 'flex' }}
                  >
                    <GlassCard
                      sx={{
                        p: { xs: 2.25, md: 3 },
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        '&:hover': {
                          borderColor: 'primary.main',
                          boxShadow: (theme) =>
                            theme.palette.mode === 'dark'
                              ? '0 8px 24px rgba(0,0,0,0.5), 0 0 8px rgba(129, 140, 248, 0.15)'
                              : '0 8px 24px rgba(0,0,0,0.06), 0 0 8px rgba(79, 70, 229, 0.08)',
                        }
                      }}
                    >
                      <Box>
                        {/* Title Bar */}
                        <Box sx={{ display: 'block', mb: 1.5 }}>
                          <Typography
                            component="a"
                            href={repo.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            variant="body1"
                            sx={{
                              fontWeight: 700,
                              fontSize: '0.85rem',
                              fontFamily: '"JetBrains Mono", "Fira Code", monospace',
                              color: 'text.primary',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                              display: 'block',
                              textDecoration: 'none',
                              transition: 'color 0.2s ease',
                              '&:hover': { color: 'primary.main' },
                            }}
                          >
                            {repo.name}
                          </Typography>
                        </Box>

                        {/* Description */}
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          sx={{
                            mb: 2,
                            fontSize: { xs: '0.875rem', md: '0.75rem' },
                            lineHeight: 1.55,
                            display: '-webkit-box',
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            minHeight: 38,
                          }}
                        >
                          {repo.description}
                        </Typography>
                      </Box>

                      {/* Footer Info */}
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2, pt: 1.5, borderTop: (theme) => `1px solid ${theme.palette.divider}` }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                          <Box
                            sx={{
                              width: 8,
                              height: 8,
                              borderRadius: '50%',
                              bgcolor: langColors[repo.language] || '#71717A',
                            }}
                          />
                          <Typography variant="caption" sx={{ fontWeight: 600, color: 'text.secondary', fontSize: '0.6875rem', fontFamily: 'monospace' }}>
                            {repo.language}
                          </Typography>
                        </Box>

                        {repo.stargazers_count > 0 && (
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'text.secondary' }}>
                            <FaStar size={11} color="#F59E0B" />
                            <Typography variant="caption" sx={{ fontWeight: 600, fontSize: '0.6875rem' }}>
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

        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4.5 }}>
          <Button
            component="a"
            href="https://github.com/aadil124?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            variant="outlined"
            size="small"
            startIcon={<FaGithub size={14} />}
            sx={{
              px: 2.75,
              py: 1.125,
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
