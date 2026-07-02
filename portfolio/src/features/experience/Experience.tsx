'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { MdAccountBalance, MdSportsEsports, MdWork } from 'react-icons/md';
import SectionHeader from '@/components/SectionHeader';
import Timeline, { TimelineItemData } from '@/components/Timeline';

export default function Experience() {
  const experienceItems: TimelineItemData[] = [
    {
      title: 'Frontend Developer',
      company: 'NeoSoft Pvt Ltd',
      location: 'Navi Mumbai, India',
      period: 'Sept 2025 - Present',
      link: 'https://www.neosofttech.com',
      icon: <MdAccountBalance size={16} />,
      description: [
        'Developed enterprise-grade HRMS modules using React.js for the Bank of Maharashtra.',
        'Built dynamic forms with validation and modular, reusable UI components.',
        'Created high-fidelity Admin and Employee dashboards.',
        'Implemented advanced client-side features including pagination, full-text search, multi-faceted filtering, and visual reporting panels.',
        'Worked closely on workflows for: Appraisal Management, Promotions, Talent Management, Reward & Recognition, and People Surveys.',
        'Integrated REST APIs for automated human resources workflows.'
      ],
      skills: ['React.js', 'JavaScript', 'Redux Toolkit', 'Bootstrap', 'Axios', 'Recharts', 'REST APIs'],
    },
    {
      title: 'Frontend Developer',
      company: 'HKB Development Pvt Ltd',
      location: 'Navi Mumbai, India',
      period: 'Mar 2024 - Mar 2025',
      icon: <MdSportsEsports size={16} />,
      description: [
        'Designed and developed responsive web/mobile user interfaces for White Label 2.0 (HorasBet Gaming Platform) hosting 4000+ games.',
        'Created comprehensive Admin and Master Admin control panels for platform operators.',
        'Integrated backend microservice APIs with frontend modules seamlessly.',
        'Improved core web vitals and overall application loading speed by 30% through caching and asset optimization.',
        'Resolved over 20+ critical API integration and UI rendering defects.',
        'Boosted general user retention and engagement metrics by 15%.'
      ],
      skills: ['React.js', 'Redux', 'Redux Saga', 'Bootstrap', 'Axios', 'JavaScript', 'Responsive UI'],
    },
    {
      title: 'MERN Stack Developer',
      company: 'Wow InfoBiz Pvt Ltd',
      location: 'Thane, Mumbai, India',
      period: 'Dec 2021 – Mar 2024',
      icon: <MdWork size={16} />,
      description: [
        'Job Portal (Edjobster): Designed full-stack models, collections, and routes using MERN (MongoDB, Express, React, Node). Implemented secure authentication with JWT and role-based access control (RBAC) for candidates, recruiters, and administrators.',
        'Healthcare App (Gulf Pharmacy): Programmed login flow, password reset, and protected routes. Optimized routing and assets via React.lazy and memoization, leading to a 30% speedup and 20% growth in organic traffic via SEO structure.',
        'Finance App (HDFC Bank Client Admin Panel): Developed client tables using React Table supporting real-time sorting, pagination, and API search filter bindings.',
        'Performed thorough API validation, error logging, and backend middleware setup.'
      ],
      skills: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'Redux', 'TypeScript', 'JWT', 'React Table', 'Postman'],
    },
  ];

  return (
    <Box id="experience" sx={{ py: { xs: 4, md: 6 } }}>
      <Container maxWidth="lg">
        <SectionHeader
          label="Career"
          title="Work Experience"
          subtitle="A history of building scalable solutions, banking modules, and high-performance applications."
        />
        <Timeline items={experienceItems} />
      </Container>
    </Box>
  );
}
