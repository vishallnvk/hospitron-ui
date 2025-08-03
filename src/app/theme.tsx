'use client'

import { createTheme } from '@mui/material/styles'

// Create a hospital-themed Material-UI theme
export const theme = createTheme({
  palette: {
    primary: {
      main: '#2e7d32', // Medical green
      light: '#60ad5e',
      dark: '#005005',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#1976d2', // Medical blue
      light: '#63a4ff',
      dark: '#004ba0',
      contrastText: '#ffffff',
    },
    error: {
      main: '#d32f2f',
      light: '#ff6659',
      dark: '#9a0007',
    },
    warning: {
      main: '#ff9800',
      light: '#ffcc47',
      dark: '#c66900',
    },
    success: {
      main: '#4caf50',
      light: '#7dd84b',
      dark: '#357a35',
    },
    info: {
      main: '#0288d1',
      light: '#5eb5ff',
      dark: '#005aa8',
    },
    background: {
      default: '#fafafa',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 600,
    },
    h2: {
      fontWeight: 600,
    },
    h3: {
      fontWeight: 600,
    },
    h4: {
      fontWeight: 500,
    },
    h5: {
      fontWeight: 500,
    },
    h6: {
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          textTransform: 'none',
          fontWeight: 500,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '8px',
          },
        },
      },
    },
  },
})
