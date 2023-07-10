import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import '@fontsource/roboto/400.css';

let theme = createTheme({
  palette: {
    primary: {
      main: '#20232b',
      light: '#b785f5',
      contrastText: '#F5F5F5',
    },
    secondary: {
      main: '#b785f5',
      light: '#16171b',
      contrastText: '#F5F5F5',
    },
    error: {
      main: '#F44336',
    },
  },
});

theme.typography.h1 = {
  fontFamily: 'Roboto',
  fontWeight: 400,
  fontSize: '2.5rem',
  '@media (min-width:600px)': {
    fontSize: '4rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '6rem',
  },
};

theme.typography.h2 = {
  fontFamily: 'Roboto',
  fontWeight: 400,
  fontSize: '2rem',
  '@media (min-width:600px)': {
    fontSize: '3rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '4rem',
  },
};

theme.typography.h3 = {
  fontFamily: 'Roboto',
  fontWeight: 400,
  fontSize: '1.5rem',
  '@media (min-width:600px)': {
    fontSize: '2rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '3rem',
  },
};

theme.typography.h4 = {
  fontFamily: 'Roboto',
  fontWeight: 400,
  fontSize: '1.2rem',
  '@media (min-width:600px)': {
    fontSize: '1.5rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '2rem',
  },
};

theme.typography.h5 = {
  fontFamily: 'Roboto',
  fontWeight: 400,
  fontSize: '1rem',
  '@media (min-width:600px)': {
    fontSize: '1.2rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '1.5rem',
  },
};

theme.typography.h6 = {
  fontFamily: 'Roboto',
  fontWeight: 400,
  fontSize: '0.8rem',
  '@media (min-width:600px)': {
    fontSize: '1rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '1.2rem',
  },
};

export default theme;
