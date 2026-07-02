import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import './globals.css';
import Providers from './providers';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-outfit',
});

export const metadata: Metadata = {
  title: 'Mohd Adil Ansari | Frontend Developer (React Js Developer)',
  description: 'Professional portfolio of Mohd Adil Ansari, a Frontend Developer (React Js Developer) with 4+ years of experience building enterprise-grade HRMS dashboards, high-volume gaming platforms, and financial admin panels.',
  keywords: ['Mohd Adil Ansari', 'Frontend Developer', 'React Js Developer', 'React Developer', 'Node.js Developer', 'Software Engineer Portfolio', 'Web Developer Mumbai', 'Next.js Developer'],
  authors: [{ name: 'Mohd Adil Ansari' }],
  creator: 'Mohd Adil Ansari',
  metadataBase: new URL('https://github.com/aadil124'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://github.com/aadil124',
    title: 'Mohd Adil Ansari | Frontend Developer (React Js Developer)',
    description: 'Explore the portfolio of Mohd Adil Ansari, specializing in high-performance web applications, appraisal workflows, and responsive dashboard design.',
    siteName: 'Mohd Adil Ansari Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mohd Adil Ansari | Frontend Developer (React Js Developer)',
    description: 'Frontend Developer (React Js Developer) with 4+ years of React.js development experience.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <head>
        {/* Enable smooth scroll behaviors */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
