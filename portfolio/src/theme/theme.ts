import { createTheme, ThemeOptions } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface TypeBackground {
    gradient?: string;
    elevated?: string;
  }
}

export const getDesignTokens = (mode: 'light' | 'dark'): ThemeOptions => ({
  palette: {
    mode,
    ...(mode === 'dark'
      ? {
          primary: {
            main: '#818CF8', // Indigo
            light: '#A5B4FC',
            dark: '#6366F1',
            contrastText: '#09090B',
          },
          secondary: {
            main: '#34D399', // Emerald
            light: '#6EE7B7',
            dark: '#10B981',
            contrastText: '#09090B',
          },
          background: {
            default: '#09090B', // Base Background
            paper: '#121215',   // Card Surface
            gradient: 'radial-gradient(circle at 50% 0%, #151432 0%, #09090B 75%)', // Accent Glow
            elevated: '#1E1E22', // Hover/Active surface
          },
          text: {
            primary: '#F8FAFC',
            secondary: '#94A3B8',
          },
          divider: 'rgba(255, 255, 255, 0.05)',
        }
      : {
          primary: {
            main: '#4F46E5', // Indigo
            light: '#6366F1',
            dark: '#3730A3',
            contrastText: '#FFFFFF',
          },
          secondary: {
            main: '#059669', // Emerald
            light: '#10B981',
            dark: '#047857',
            contrastText: '#FFFFFF',
          },
          background: {
            default: '#FAFAFA', // Base Background
            paper: '#FFFFFF',   // Card Surface
            gradient: 'linear-gradient(180deg, #FFFFFF 0%, #F4F4F5 100%)',
            elevated: '#F1F5F9', // Hover/Active surface
          },
          text: {
            primary: '#0F172A',
            secondary: '#64748B',
          },
          divider: 'rgba(0, 0, 0, 0.05)',
        }),
  },
  typography: {
    fontFamily: 'var(--font-inter), system-ui, -apple-system, sans-serif',
    h1: {
      fontFamily: 'var(--font-outfit), system-ui, sans-serif',
      fontWeight: 800,
      letterSpacing: '-0.03em',
      lineHeight: 1.15,
    },
    h2: {
      fontFamily: 'var(--font-outfit), system-ui, sans-serif',
      fontWeight: 700,
      letterSpacing: '-0.025em',
      lineHeight: 1.2,
    },
    h3: {
      fontFamily: 'var(--font-outfit), system-ui, sans-serif',
      fontWeight: 700,
      letterSpacing: '-0.02em',
      lineHeight: 1.25,
    },
    h4: {
      fontFamily: 'var(--font-outfit), system-ui, sans-serif',
      fontWeight: 700,
      letterSpacing: '-0.015em',
      lineHeight: 1.3,
    },
    h5: {
      fontFamily: 'var(--font-outfit), system-ui, sans-serif',
      fontWeight: 600,
      letterSpacing: '-0.01em',
      lineHeight: 1.35,
    },
    h6: {
      fontFamily: 'var(--font-outfit), system-ui, sans-serif',
      fontWeight: 600,
      letterSpacing: '-0.005em',
      lineHeight: 1.4,
    },
    subtitle1: {
      fontSize: '1.05rem',
      lineHeight: 1.65,
      fontWeight: 400,
      letterSpacing: '-0.005em',
    },
    subtitle2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
      fontWeight: 600,
      letterSpacing: '0.01em',
    },
    body1: {
      fontSize: '0.9375rem',
      lineHeight: 1.75,
      letterSpacing: '0.005em',
    },
    body2: {
      fontSize: '0.8125rem',
      lineHeight: 1.65,
      letterSpacing: '0.005em',
    },
    caption: {
      fontSize: '0.75rem',
      lineHeight: 1.5,
      fontWeight: 500,
      letterSpacing: '0.02em',
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
      fontFamily: 'var(--font-inter), system-ui, sans-serif',
      letterSpacing: '-0.01em',
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
              ? 'linear-gradient(135deg, #818CF8 0%, #6366F1 100%)'
              : 'linear-gradient(135deg, #4F46E5 0%, #4338CA 100%)',
            color: mode === 'dark' ? '#09090B' : '#FFFFFF',
            boxShadow: mode === 'dark'
              ? '0 4px 12px rgba(99, 102, 241, 0.2)'
              : '0 4px 12px rgba(79, 70, 229, 0.15)',
            '&:hover': {
              background: mode === 'dark'
                ? 'linear-gradient(135deg, #A5B4FC 0%, #818CF8 100%)'
                : 'linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)',
              boxShadow: mode === 'dark'
                ? '0 8px 24px -4px rgba(129, 140, 248, 0.45), 0 0 0 1px rgba(129, 140, 248, 0.2)'
                : '0 8px 24px -4px rgba(79, 70, 229, 0.4), 0 0 0 1px rgba(79, 70, 229, 0.2)',
              transform: 'translateY(-2px)',
            },
          },
        },
        {
          props: { variant: 'outlined', color: 'primary' },
          style: {
            borderColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.12)',
            color: mode === 'dark' ? '#FAFAFA' : '#09090B',
            background: 'transparent',
            '&:hover': {
              borderColor: mode === 'dark' ? '#818CF8' : '#4F46E5',
              backgroundColor: mode === 'dark' ? 'rgba(129, 140, 248, 0.05)' : 'rgba(79, 70, 229, 0.04)',
              transform: 'translateY(-2px)',
            },
          },
        },
      ],
      styleOverrides: {
        root: {
          borderRadius: '10px',
          fontWeight: 600,
          transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:active': {
            transform: 'translateY(0)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: mode === 'dark' ? '#121215' : '#FFFFFF',
          borderRadius: 16,
          border: mode === 'dark'
            ? '1px solid rgba(255, 255, 255, 0.05)'
            : '1px solid rgba(0, 0, 0, 0.05)',
          boxShadow: mode === 'dark'
            ? '0 4px 20px -2px rgba(0, 0, 0, 0.35), 0 2px 4px -1px rgba(0, 0, 0, 0.2)'
            : '0 4px 20px -2px rgba(0, 0, 0, 0.04), 0 2px 4px -1px rgba(0, 0, 0, 0.02)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          position: 'relative',
          overflow: 'hidden',
          '&:hover': {
            transform: 'translateY(-4px)',
            borderColor: mode === 'dark' ? 'rgba(129, 140, 248, 0.25)' : 'rgba(79, 70, 229, 0.18)',
            boxShadow: mode === 'dark'
              ? '0 12px 30px -4px rgba(0, 0, 0, 0.5), 0 4px 12px -2px rgba(129, 140, 248, 0.15)'
              : '0 12px 30px -4px rgba(0, 0, 0, 0.08), 0 4px 12px -2px rgba(79, 70, 229, 0.08)',
          },
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
          borderRadius: '8px',
          fontSize: '0.75rem',
          transition: 'all 0.2s ease',
          backgroundColor: mode === 'dark' ? 'rgba(129, 140, 248, 0.06)' : 'rgba(79, 70, 229, 0.05)',
          border: mode === 'dark' ? '1px solid rgba(129, 140, 248, 0.15)' : '1px solid rgba(79, 70, 229, 0.1)',
          color: mode === 'dark' ? '#A5B4FC' : '#4F46E5',
          '&:hover': {
            backgroundColor: mode === 'dark' ? 'rgba(129, 140, 248, 0.12)' : 'rgba(79, 70, 229, 0.1)',
            borderColor: mode === 'dark' ? '#818CF8' : '#4F46E5',
          },
        },
        outlined: {
          backgroundColor: 'transparent',
          borderColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
          color: mode === 'dark' ? '#FAFAFA' : '#09090B',
          '&:hover': {
            backgroundColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.03)',
            borderColor: mode === 'dark' ? '#A5B4FC' : '#6366F1',
            color: mode === 'dark' ? '#A5B4FC' : '#6366F1',
          },
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: '10px',
          transition: 'all 0.25s ease',
          backgroundColor: mode === 'dark' ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.01)',
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: mode === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.1)',
            transition: 'all 0.25s ease',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: mode === 'dark' ? 'rgba(255,255,255,0.18)' : 'rgba(0,0,0,0.22)',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: mode === 'dark' ? '#818CF8' : '#4F46E5',
            borderWidth: '1.5px',
          },
          '&.Mui-focused': {
            backgroundColor: mode === 'dark' ? 'rgba(129, 140, 248, 0.03)' : 'rgba(79, 70, 229, 0.02)',
            boxShadow: mode === 'dark'
              ? '0 0 0 3px rgba(129, 140, 248, 0.12)'
              : '0 0 0 3px rgba(79, 70, 229, 0.08)',
          },
        },
        input: {
          padding: '14px 16px',
          fontWeight: 400,
          fontSize: '0.9375rem',
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontWeight: 500,
          fontSize: '0.875rem',
          color: mode === 'dark' ? '#94A3B8' : '#64748B',
        },
      },
    },
  },
});

export const getTheme = (mode: 'light' | 'dark') => createTheme(getDesignTokens(mode));
