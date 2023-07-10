import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme';
import { ToastProvider } from '../contexts/toast';
import { AuthProvider } from '../contexts/auth';
import { LoadingProvider } from '@/contexts/loading';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <LoadingProvider>
        <ToastProvider>
          <AuthProvider>
            <Component {...pageProps} />
          </AuthProvider>
        </ToastProvider>
      </LoadingProvider>
    </ThemeProvider>
  );
}
