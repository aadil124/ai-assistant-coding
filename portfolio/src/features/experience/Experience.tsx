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
        'Delivered core enterprise HRMS modules used bank-wide by employees and HR teams, streamlining appraisal, promotion, and recognition workflows for a leading public sector bank.',
        'Developed enterprise-grade HRMS modules using React.js and Redux Toolkit.',
        'Built dynamic forms, reusable UI components, and Admin/Employee dashboards.',
        'Implemented pagination, search, filtering, and reporting dashboards.',
        'Integrated REST APIs for HR workflows across Appraisal, Promotion, Talent Management, Reward & Recognition, and People Survey modules.'
      ],
      skills: ['React.js', 'JavaScript', 'Redux Toolkit', 'Bootstrap', 'Axios', 'Recharts', 'Replit AI'],
    },
    {
      title: 'Frontend Developer',
      company: 'HKB Development Pvt Ltd',
      location: 'Navi Mumbai, India',
      period: 'Mar 2024 - Mar 2025',
      icon: <MdSportsEsports size={16} />,
      description: [
        'Designed and developed responsive web/mobile UI for a gaming platform with 4,000+ games.',
        'Built Admin and Master Admin dashboards; integrated backend APIs with frontend modules.',
        'Improved application performance by 30% through optimization and fixed 20+ production issues.',
        'Increased user engagement by 15% through UI/UX improvements.'
      ],
      skills: ['React.js', 'Redux', 'Redux Saga', 'Bootstrap', 'Axios', 'JavaScript'],
    },
    {
      title: 'MERN Stack Developer',
      company: 'Wow InfoBiz Pvt Ltd',
      location: 'Thane, Mumbai, India',
      period: 'Dec 2021 – Mar 2024',
      icon: <MdWork size={16} />,
      description: [
        'Built and shipped a full-featured job portal end-to-end, enabling job discovery and hiring workflows for candidates, recruiters, and admins, with role-based access control.',
        'Developed secure authentication (Login, Registration, Forgot Password, Protected Routes) with dynamic, role-based routing using React Router.',
        'Improved application performance by 30% using lazy loading, memoization, and code optimization; contributed to a 20% increase in organic traffic via SEO-friendly responsive UI.',
        'Built reusable data tables with sorting, filtering, and pagination using React Table for an HDFC Bank admin dashboard.',
        'Designed MongoDB schemas, implemented JWT authentication, and integrated REST APIs; tested with Postman.'
      ],
      skills: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'TypeScript', 'Redux', 'Axios', 'JWT', 'React Table', 'Postman'],
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
