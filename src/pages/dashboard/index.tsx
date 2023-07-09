import Head from 'next/head';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Box, Typography, LinearProgress, Button, InputBase, IconButton, Paper, Tooltip } from '@mui/material';
import { Search } from '@mui/icons-material';
import Card from '../../components/card';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [files, setFiles] = useState([]);

  useEffect(() => {
    // Get user details
    setUser({
      id: '123',
      name: 'Abhishek',
      email: 'abk@gmail.com',
      storage: 400,
      files: [],
      comments: [],
    });
    // Get files
    setFiles([
      {
        id: '123',
        url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
        name: 'Dummy',
        author: 'Abhishek',
        authorId: '123',
        comments: [],
        createdAt: new Date(),
        size: 10,
      },
      {
        id: '1',
        url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
        name: 'Dummy',
        author: 'Abhishek',
        authorId: '123',
        comments: [],
        createdAt: new Date(),
        size: 10,
      },
      {
        id: '13',
        url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
        name: 'Dummy',
        author: 'Abhishek',
        authorId: '123',
        comments: [],
        createdAt: new Date(),
        size: 10,
      },
      {
        id: '23',
        url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
        name: 'Dummy',
        author: 'Abhishek',
        authorId: '123',
        comments: [],
        createdAt: new Date(),
        size: 10,
      },
      {
        id: '1023',
        url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
        name: 'Dummy',
        author: 'Abhishek',
        authorId: '123',
        comments: [],
        createdAt: new Date(),
        size: 10,
      },
      {
        id: '1231',
        url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
        name: 'Dummy',
        author: 'Abhishek',
        authorId: '123',
        comments: [],
        createdAt: new Date(),
        size: 10,
      },
      {
        id: '1232',
        url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
        name: 'Dummy',
        author: 'Abhishek',
        authorId: '123',
        comments: [],
        createdAt: new Date(),
        size: 10,
      },
    ]);
  }, []);

  return (
    <>
      <Head>
        <title>ShareIT | Dashboard</title>
        <meta name="description" content="Dashboard for your pdf files" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box
        bgcolor="primary.main"
        minHeight="100vh"
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        {/* Sidebar */}
        <Box
          sx={{
            width: '20vw',
            height: '100vh',
            bgcolor: 'primary.main',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            borderRight: '1px solid #F5F5F5',
          }}
        >
          {/* Logo */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              height: '10%',
              borderBottom: '1px solid #F5F5F5',
            }}
          >
            <Typography variant="h4" color="primary.contrastText">
              ShareIT
            </Typography>
          </Box>

          {/* User Details */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              flexGrow: 1,
            }}
          >
            {/* User name */}
            <Typography variant="h6" color="primary.contrastText">
              {user?.name}
            </Typography>

            {/* Storage */}
            <Typography variant="caption" color="primary.contrastText">
              {user?.storage} MB of 500 MB used
            </Typography>

            {/* Progress Bar */}
            <Box sx={{ width: '80%', marginTop: '8px' }}>
              <LinearProgress
                variant="determinate"
                value={(user?.storage / 500) * 100}
                sx={{
                  '& .MuiLinearProgress-bar': {
                    bgcolor: 'secondary.main',
                  },
                }}
              />
            </Box>

            {/* Upgrade to pro button */}
            <Box mt="8px">
              <Button variant="outlined" color="secondary" sx={{ width: '16vw', padding: '8px', fontSize: '0.8rem' }}>
                Get Pro
              </Button>
            </Box>
          </Box>

          {/* LogOut Button */}
          {/* TODO: For responsive replace it with icon */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            className="basic-padding"
          >
            <Button variant="contained" color="secondary" sx={{ width: '16vw', padding: '8px', fontSize: '0.8rem' }}>
              Logout
            </Button>
          </Box>
        </Box>

        {/* Panel */}
        <Box
          sx={{
            width: '80vw',
            height: '100vh',
            bgcolor: 'primary.main',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* header*/}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: '1px solid #F5F5F5',
              height: '10%',
            }}
            className="basic-padding"
          >
            {/* Title */}
            <Typography variant="h4" color="primary.contrastText">
              PDF Collaboration
            </Typography>

            {/* Search */}
            <Paper
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                height: '50%',
                marginLeft: '8px',
                bgcolor: 'primary.main',
                border: '1px solid #F5F5F5',
                borderRadius: '0px',
              }}
              className="basic-padding"
            >
              <InputBase
                sx={{
                  width: '80%',
                  color: 'primary.contrastText',
                }}
                placeholder="Search"
              />
              <Tooltip title="Search">
                <IconButton type="submit" sx={{ width: '20%' }} aria-label="search">
                  <Search color="secondary" />
                </IconButton>
              </Tooltip>
            </Paper>
          </Box>
          {/* Upload Card */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
            className="basic-padding"
          >
            <Typography variant="h6" color="primary.contrastText">
              Upload PDF
            </Typography>

            <Box
              sx={{
                width: '128px',
                height: '128px',
                border: '1px dashed #F5F5F5',
                marginTop: '8px',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                '&:hover': {
                  border: '1px solid #b785f5',
                },
              }}
              className="basic-padding"
            >
              <Image src="/upload.svg" alt="Upload" width={50} height={50} />

              <Typography variant="caption" color="primary.contrastText">
                Upload your pdf here
              </Typography>
            </Box>
          </Box>

          {/* Your Files */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              flexGrow: 1,
            }}
            className="basic-padding"
          >
            <Typography variant="h6" color="primary.contrastText">
              Your Files
            </Typography>

            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: '8px',
                flexWrap: 'wrap',
              }}
            >
              {files.map((file) => (
                <Card file={file} key={file.id} />
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Dashboard;
