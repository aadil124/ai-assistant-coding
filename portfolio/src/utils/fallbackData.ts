export interface GitHubRepo {
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  language: string;
  updated_at: string;
}

export const fallbackRepos: GitHubRepo[] = [
  {
    name: 'namaste-netflix-gpt',
    description: 'A premium Netflix clone integrated with OpenAI GPT API for contextual, AI-driven movie suggestions and search queries.',
    html_url: 'https://github.com/aadil124/namaste-netflix-gpt',
    stargazers_count: 1,
    language: 'JavaScript',
    updated_at: '2026-04-22T07:00:44Z',
  },
  {
    name: 'kpb',
    description: 'A TypeScript library implementing utility extensions, customized type guards, and functional pipeline helpers.',
    html_url: 'https://github.com/aadil124/kpb',
    stargazers_count: 0,
    language: 'TypeScript',
    updated_at: '2026-06-03T05:01:57Z',
  },
  {
    name: 'task_management_system_mern_stack',
    description: 'MERN stack application for teams. Features interactive drag-and-drop boards, status tracking, and JWT-authenticated session logs.',
    html_url: 'https://github.com/aadil124/task_management_system_mern_stack',
    stargazers_count: 0,
    language: 'JavaScript',
    updated_at: '2026-05-22T12:40:24Z',
  },
  {
    name: 'chat_bot_using_Gen_AI',
    description: 'Conversational agent developed in Python leveraging Google Gemini or OpenAI APIs to perform agentic task scheduling and prompt actions.',
    html_url: 'https://github.com/aadil124/chat_bot_using_Gen_AI',
    stargazers_count: 0,
    language: 'Python',
    updated_at: '2026-04-30T09:11:10Z',
  },
  {
    name: 'crypto-currency-dashboard',
    description: 'Interactive dashboard charting historical price indices, volume, and percentage shifts for top cryptocurrencies.',
    html_url: 'https://github.com/aadil124/crypto-currency-dashboard',
    stargazers_count: 0,
    language: 'JavaScript',
    updated_at: '2025-01-23T10:41:54Z',
  },
  {
    name: 'insta-backend',
    description: 'REST API service for a social sharing platform. Includes routes for media uploading, comment pipelines, user relationships, and follow status updates.',
    html_url: 'https://github.com/aadil124/insta-backend',
    stargazers_count: 0,
    language: 'JavaScript',
    updated_at: '2023-10-03T16:50:56Z',
  },
  {
    name: 'namaste-food-app',
    description: 'Interactive restaurant discovery and checkout interface built with React, styled in Tailwind, and powered by custom state controllers.',
    html_url: 'https://github.com/aadil124/namaste-food-app',
    stargazers_count: 0,
    language: 'JavaScript',
    updated_at: '2025-05-16T18:20:27Z',
  },
  {
    name: 'react-admin-dashboard',
    description: 'Elevated dashboard interface presenting charts, data-tables, and schedule trackers using semantic HTML and custom components.',
    html_url: 'https://github.com/aadil124/react-admin-dashboard',
    stargazers_count: 0,
    language: 'HTML',
    updated_at: '2023-08-20T14:25:29Z',
  },
];
