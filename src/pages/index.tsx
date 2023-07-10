import Head from 'next/head';
import Image from 'next/image';
import { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import { Box, Button, Typography } from '@mui/material';
import LoginForm from '../components/loginForm';
import RegisterModal from '../components/registerModal';
import { AuthContext } from '../contexts/auth';
import { LoadingContext } from '../contexts/loading';
import { ToastContext } from '../contexts/toast';

// TODO: Internalization of text
export default function Home() {
  const [registerDialogOpen, setRegisterDialogOpen] = useState(false);
  const { user } = useContext(AuthContext);

  const router = useRouter();

  if (user) {
    router.push('/dashboard');
  }

  return (
    <>
      <Head>
        <title>ShareIT</title>
        <meta name="description" content="Place to collaborate and share PDFs" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box height="100vh" width="100vw" display="flex">
        {/* Image Panel */}
        <Box className="basic-padding" display="flex" justifyContent="center" alignItems="center" width="40%">
          {/* TODO: Remove image for mobile view */}
          <Image src="/auth.svg" alt="Authentication" width={500} height={500} />
        </Box>
        {/* Form Panel */}
        <Box className="basic-padding" bgcolor={'primary.main'} flexGrow={1} display="flex" flexWrap="wrap">
          <Box flexBasis="100%">
            <Typography variant="h6" color="primary.contrastText">
              ShareIT
            </Typography>
          </Box>

          <Box display="flex" justifyContent="center" flexBasis="100%" flexWrap="wrap">
            <Box width="100%" display="flex" alignItems="center" flexDirection="column">
              <Typography variant="h6" color="primary.contrastText" textAlign="center">
                New to ShareIT?
              </Typography>

              <Typography variant="body1" color="primary.contrastText" padding="8px" textAlign="center">
                Create an account to get started
              </Typography>

              {/* TODO: check outlined variant */}
              <Button
                variant="contained"
                color="secondary"
                sx={{ width: '16vw', padding: '8px', fontSize: '0.8rem' }}
                onClick={() => {
                  setRegisterDialogOpen(true);
                }}
              >
                Register
              </Button>
            </Box>

            <LoginForm />
          </Box>
        </Box>
      </Box>
    </>
  );
}
