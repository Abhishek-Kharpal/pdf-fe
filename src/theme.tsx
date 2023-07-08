import { createTheme } from '@mui/material/styles';
import '@fontsource/roboto/400.css';

const theme = createTheme({
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
  },
});

export default theme;
