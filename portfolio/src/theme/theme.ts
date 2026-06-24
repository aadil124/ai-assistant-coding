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
            main: '#818CF8',
            light: '#A5B4FC',
            dark: '#6366F1',
            contrastText: '#09090B',
          },
          secondary: {
            main: '#34D399',
            light: '#6EE7B7',
            dark: '#10B981',
            contrastText: '#09090B',
          },
          background: {
            default: '#09090B',
            paper: '#18181B',
            gradient: 'radial-gradient(ellipse at 50% 0%, #1a1a2e 0%, #09090B 70%)',
            elevated: '#27272A',
          },
          text: {
            primary: '#FAFAFA',
            secondary: '#A1A1AA',
          },
          divider: 'rgba(255, 255, 255, 0.06)',
        }
      : {
          primary: {
            main: '#4F46E5',
            light: '#6366F1',
            dark: '#3730A3',
            contrastText: '#FFFFFF',
          },
          secondary: {
            main: '#059669',
            light: '#10B981',
            dark: '#047857',
            contrastText: '#FFFFFF',
          },
          background: {
            default: '#FAFAFA',
            paper: '#FFFFFF',
            gradient: 'linear-gradient(180deg, #FAFAFA 0%, #F4F4F5 100%)',
            elevated: '#F4F4F5',
          },
          text: {
            primary: '#09090B',
            secondary: '#71717A',
          },
          divider: 'rgba(0, 0, 0, 0.06)',
        }),
  },
  typography: {
    fontFamily: 'var(--font-inter), system-ui, -apple-system, sans-serif',
    h1: {
      fontFamily: 'var(--font-outfit), system-ui, sans-serif',
      fontWeight: 800,
      letterSpacing: '-0.025em',
      lineHeight: 1.1,
    },
    h2: {
      fontFamily: 'var(--font-outfit), system-ui, sans-serif',
      fontWeight: 700,
      letterSpacing: '-0.02em',
      lineHeight: 1.2,
    },
    h3: {
      fontFamily: 'var(--font-outfit), system-ui, sans-serif',
      fontWeight: 700,
      letterSpacing: '-0.015em',
      lineHeight: 1.25,
    },
    h4: {
      fontFamily: 'var(--font-outfit), system-ui, sans-serif',
      fontWeight: 700,
      letterSpacing: '-0.01em',
      lineHeight: 1.3,
    },
    h5: {
      fontFamily: 'var(--font-outfit), system-ui, sans-serif',
      fontWeight: 600,
      letterSpacing: '-0.005em',
    },
    h6: {
      fontFamily: 'var(--font-outfit), system-ui, sans-serif',
      fontWeight: 600,
    },
    subtitle1: {
      fontSize: '1.05rem',
      lineHeight: 1.6,
      fontWeight: 400,
    },
    subtitle2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
      fontWeight: 600,
    },
    body1: {
      fontSize: '0.9375rem',
      lineHeight: 1.7,
    },
    body2: {
      fontSize: '0.8125rem',
      lineHeight: 1.6,
    },
    caption: {
      fontSize: '0.75rem',
      lineHeight: 1.5,
      fontWeight: 500,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
      fontFamily: 'var(--font-inter), system-ui, sans-serif',
      letterSpacing: '-0.01em',
    },
  },
  shape: {
    borderRadius: 10,
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
            '&:hover': {
              background: mode === 'dark'
                ? 'linear-gradient(135deg, #A5B4FC 0%, #818CF8 100%)'
                : 'linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)',
              boxShadow: mode === 'dark'
                ? '0 8px 24px -4px rgba(129, 140, 248, 0.4)'
                : '0 8px 24px -4px rgba(79, 70, 229, 0.35)',
            },
          },
        },
        {
          props: { variant: 'outlined', color: 'primary' },
          style: {
            borderColor: mode === 'dark' ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.12)',
            color: mode === 'dark' ? '#FAFAFA' : '#09090B',
            '&:hover': {
              borderColor: mode === 'dark' ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.25)',
              backgroundColor: mode === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
            },
          },
        },
      ],
      styleOverrides: {
        root: {
          borderRadius: '10px',
          fontWeight: 600,
          boxShadow: 'none',
          transition: 'all 0.2s ease',
          '&:hover': {
            boxShadow: 'none',
            transform: 'translateY(-1px)',
          },
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
          backgroundColor: mode === 'dark' ? '#18181B' : '#FFFFFF',
          borderRadius: 16,
          border: mode === 'dark'
            ? '1px solid rgba(255, 255, 255, 0.06)'
            : '1px solid rgba(0, 0, 0, 0.06)',
          boxShadow: mode === 'dark'
            ? '0 1px 2px rgba(0, 0, 0, 0.4)'
            : '0 1px 3px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.04)',
          transition: 'all 0.2s ease',
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
          transition: 'all 0.15s ease',
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
          transition: 'all 0.2s ease',
          backgroundColor: mode === 'dark' ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.01)',
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: mode === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.1)',
            transition: 'all 0.2s ease',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: mode === 'dark' ? 'rgba(255,255,255,0.16)' : 'rgba(0,0,0,0.2)',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: mode === 'dark' ? '#818CF8' : '#4F46E5',
            borderWidth: '1.5px',
          },
          '&.Mui-focused': {
            backgroundColor: mode === 'dark' ? 'rgba(129, 140, 248, 0.03)' : 'rgba(79, 70, 229, 0.02)',
            boxShadow: mode === 'dark'
              ? '0 0 0 3px rgba(129, 140, 248, 0.08)'
              : '0 0 0 3px rgba(79, 70, 229, 0.06)',
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
          color: mode === 'dark' ? '#A1A1AA' : '#71717A',
        },
      },
    },
  },
});

export const getTheme = (mode: 'light' | 'dark') => createTheme(getDesignTokens(mode));
