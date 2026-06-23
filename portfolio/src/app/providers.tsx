'use client';

import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { getTheme } from '@/theme/theme';

type ColorModeContextType = {
  toggleColorMode: () => void;
  mode: 'light' | 'dark';
};

const ColorModeContext = createContext<ColorModeContextType>({
  toggleColorMode: () => {},
  mode: 'dark',
});

export const useColorMode = () => useContext(ColorModeContext);

export default function Providers({ children }: { children: React.ReactNode }) {
  // Default to dark mode for server render and initial load (SaaS aesthetic)
  const [mode, setMode] = useState<'light' | 'dark'>('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedMode = localStorage.getItem('portfolio-theme') as 'light' | 'dark' | null;
    let targetMode: 'light' | 'dark' = 'dark';
    if (savedMode) {
      targetMode = savedMode;
    } else {
      const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
      if (prefersLight) {
        targetMode = 'light';
      }
    }
    
    const timer = setTimeout(() => {
      setMode(targetMode);
      setMounted(true);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => {
          const newMode = prevMode === 'light' ? 'dark' : 'light';
          localStorage.setItem('portfolio-theme', newMode);
          return newMode;
        });
      },
      mode,
    }),
    [mode]
  );

  const theme = useMemo(() => getTheme(mode), [mode]);

  return (
    <AppRouterCacheProvider options={{ enableCssLayer: true }}>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstarts an elegant, consistent, and simple baseline and resets default user agent styles */}
          <CssBaseline />
          {/* We wrap with a div containing the theme class to let global styles hook into dark/light mode */}
          <div className={mounted ? `theme-${mode}` : 'theme-dark'}>
            {children}
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </AppRouterCacheProvider>
  );
}
