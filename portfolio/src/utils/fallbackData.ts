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
    name: 'ai-assistant-coding',
    description: 'Advanced AI-powered coding assistant designed to handle agentic search, code edit triggers, and terminal execution with rich UI context.',
    html_url: 'https://ai-assistant-coding-eight.vercel.app/',
    stargazers_count: 5,
    language: 'TypeScript',
    updated_at: '2026-06-30T10:00:00Z',
  },
  {
    name: 'task-management-system',
    description: 'MERN stack collaborative planner. Features drag-and-drop workflow status boards, task tracking, and secure JWT-authenticated session logs.',
    html_url: 'https://task-management-system-mern-stack.vercel.app/',
    stargazers_count: 3,
    language: 'JavaScript',
    updated_at: '2026-06-25T12:00:00Z',
  },
  {
    name: 'realtime-crypto-dashboard',
    description: 'Real-time cryptocurrency price tracker charting historical price indices, volumes, and percentage changes for top tokens.',
    html_url: 'https://realtime-cryptocurrency-adil.netlify.app/',
    stargazers_count: 2,
    language: 'JavaScript',
    updated_at: '2026-06-20T08:30:00Z',
  },
  {
    name: 'ludo-game-js',
    description: 'Classic Ludo board game built with Vanilla JavaScript, featuring local offline multiplayer, turn validation logic, and fluid css board animations.',
    html_url: 'https://ludogame-js.netlify.app',
    stargazers_count: 4,
    language: 'JavaScript',
    updated_at: '2026-05-15T14:45:00Z',
  },
  {
    name: 'weather-app-js',
    description: 'Dynamic weather forecasting application leveraging public weather API data grids to display temperature, wind speed, and humidity charts.',
    html_url: 'https://weatherapp-using-js.netlify.app/',
    stargazers_count: 1,
    language: 'JavaScript',
    updated_at: '2026-04-10T16:00:00Z',
  },
  {
    name: 'bmi-calculator',
    description: 'Responsive Body Mass Index calculator with semantic layouts, custom range metrics indicators, and instant classification summaries.',
    html_url: 'https://bmi-calculator-htmlcss.netlify.app/',
    stargazers_count: 1,
    language: 'HTML',
    updated_at: '2026-02-18T11:20:00Z',
  },
];
