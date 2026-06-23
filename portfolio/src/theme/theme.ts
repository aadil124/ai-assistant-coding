import { createTheme, ThemeOptions } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface TypeBackground {
    gradient?: string;
  }
}

export const getDesignTokens = (mode: 'light' | 'dark'): ThemeOptions => ({
  palette: {
    mode,
    ...(mode === 'dark'
      ? {
          primary: {
            main: '#3B82F6', // Cobalt Blue
            light: '#60A5FA',
            dark: '#1D4ED8',
            contrastText: '#FFFFFF',
          },
          secondary: {
            main: '#10B981', // Emerald Green
            light: '#34D399',
            dark: '#059669',
            contrastText: '#FFFFFF',
          },
          background: {
            default: '#030712', // Deep dark background (almost black)
            paper: '#0F172A', // Slate background for cards/papers
            gradient: 'radial-gradient(circle at 50% 50%, #111827 0%, #030712 100%)',
          },
          text: {
            primary: '#F3F4F6', // Off-white
            secondary: '#9CA3AF', // Light gray
          },
          divider: 'rgba(255, 255, 255, 0.06)',
        }
      : {
          primary: {
            main: '#2563EB', // Bright Royal Blue
            light: '#3B82F6',
            dark: '#1D4ED8',
            contrastText: '#FFFFFF',
          },
          secondary: {
            main: '#059669', // Deep Emerald Green
            light: '#10B981',
            dark: '#047857',
            contrastText: '#FFFFFF',
          },
          background: {
            default: '#F8FAFC', // Slate 50 (Very light gray-blue)
            paper: '#FFFFFF', // Pure White for cards
            gradient: 'linear-gradient(135deg, #F8FAFC 0%, #F1F5F9 100%)',
          },
          text: {
            primary: '#0F172A', // Dark Slate
            secondary: '#475569', // Slate Gray
          },
          divider: 'rgba(0, 0, 0, 0.06)',
        }),
  },
  typography: {
    fontFamily: 'var(--font-inter), sans-serif',
    h1: {
      fontFamily: 'var(--font-outfit), sans-serif',
      fontWeight: 800,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontFamily: 'var(--font-outfit), sans-serif',
      fontWeight: 700,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontFamily: 'var(--font-outfit), sans-serif',
      fontWeight: 700,
      letterSpacing: '-0.01em',
    },
    h4: {
      fontFamily: 'var(--font-outfit), sans-serif',
      fontWeight: 600,
    },
    h5: {
      fontFamily: 'var(--font-outfit), sans-serif',
      fontWeight: 600,
    },
    h6: {
      fontFamily: 'var(--font-outfit), sans-serif',
      fontWeight: 600,
    },
    subtitle1: {
      fontSize: '1.1rem',
      lineHeight: 1.6,
    },
    subtitle2: {
      fontSize: '0.95rem',
      lineHeight: 1.5,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.6,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
      fontFamily: 'var(--font-outfit), sans-serif',
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: 'contained', color: 'primary' },
          style: {
            background: mode === 'dark' 
              ? 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)'
              : 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)',
            '&:hover': {
              background: mode === 'dark'
                ? 'linear-gradient(135deg, #60A5FA 0%, #2563EB 100%)'
                : 'linear-gradient(135deg, #3B82F6 0%, #1E40AF 100%)',
            },
          },
        },
      ],
      styleOverrides: {
        root: {
          borderRadius: '8px',
          fontWeight: 600,
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: mode === 'dark' ? '#0F172A' : '#FFFFFF',
          borderRadius: 16,
          border: mode === 'dark' ? '1px solid rgba(255, 255, 255, 0.05)' : '1px solid rgba(0, 0, 0, 0.04)',
          boxShadow: mode === 'dark' 
            ? '0 4px 30px rgba(0, 0, 0, 0.4)' 
            : '0 4px 30px rgba(0, 0, 0, 0.03)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 500,
          borderRadius: '6px',
        },
      },
    },
  },
});

export const getTheme = (mode: 'light' | 'dark') => createTheme(getDesignTokens(mode));
