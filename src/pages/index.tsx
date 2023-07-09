import Head from 'next/head';
import Image from 'next/image';
import { useState, useContext } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { Box, Button, Typography, TextField } from '@mui/material';

import theme from '../theme';
import { InfoContext, InfoProvider } from '../contexts/info';

// Initial page is login page
// TODO: If user is logged in, redirect to dashboard
// TODO: Internalization of text
export default function Home() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Head>
          <title>ShareIT</title>
          <meta name="description" content="Place to collaborate and share PDFs" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Box height={'100vh'} width={'100vw'} display="flex">
          {/* Image Panel */}
          <Box className="basic-padding" display="flex" justifyContent="center" alignItems="center" width="40%">
            {/* TODO: Missing responsive images */}
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
                >
                  Register
                </Button>
              </Box>
              {/* Form will come here either register or login */}
              <form className="form">
                <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                  <input type="email" placeholder="Email" />
                  <input type="password" placeholder="Password" />
                  <Button variant="contained" color="secondary" sx={{ width: '100%', padding: '8px' }}>
                    Login
                  </Button>
                </Box>
              </form>
            </Box>
          </Box>
        </Box>
      </ThemeProvider>
    </>
  );
}
