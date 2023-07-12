import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState, useContext } from 'react';
import { Box, Typography, LinearProgress, Button, InputBase, IconButton, Paper, Tooltip } from '@mui/material';
import { Search } from '@mui/icons-material';
import axios from 'axios';
import Card from '../../components/card';
import { API_URL } from '../../constants/server';
import { LoadingContext } from '../../contexts/loading';
import { AuthContext } from '../../contexts/auth';
import { ToastContext } from '../../contexts/toast';
import { FileI } from '../../types';

const Dashboard = () => {
  const { user, setUser } = useContext(AuthContext);
  const [files, setFiles] = useState<FileI[] | null>(null);
  const [filteredFiles, setFilteredFiles] = useState<FileI[] | null>(null);
  const [search, setSearch] = useState('');

  const { loading, setLoading } = useContext(LoadingContext);
  const { setToast } = useContext(ToastContext);

  const router = useRouter();

  useEffect(() => {
    setFiles(user?.files || null);
  }, [user]);

  if (loading) {
    // TODO: Change it to skeleton
    return <></>;
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearch(e.target.value);
    if (e.target.value.trim().length === 0) {
      setFilteredFiles(null);
      return;
    }

    const filteredFiles = files.filter((file) => file.name.toLowerCase().includes(e.target.value.toLowerCase()));
    setFilteredFiles(filteredFiles);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file = e.target.files?.[0]!;
    if (!file) {
      setToast({
        open: true,
        message: 'Please select a file',
        severity: 'error',
        duration: 3000,
      });
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('name', file.name);
    formData.append('size', file.size.toString());
    formData.append('type', file.type);
    try {
      setLoading(true);
      const token = localStorage.getItem('token');

      const response = await axios.post(`${API_URL}/file/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      const data = response.data;
      setFiles(data.updatedUser.files);
      setUser(data.updatedUser);
      setToast({
        open: true,
        message: 'File uploaded successfully',
        severity: 'success',
        duration: 3000,
      });
      setLoading(false);
    } catch (err) {
      console.error(err);
      setToast({
        open: true,
        message: 'Something went wrong',
        severity: 'error',
        duration: 3000,
      });
      setLoading(false);
    }
  };

  const handleLogOut = () => {
    localStorage.removeItem('token');
    setUser(null);
    router.push('/');
  };

  if (!files) {
    return <></>;
  }

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
              {Math.round((user?.storage / 1024 / 1024) * 100) / 100} MB of 500 MB used
            </Typography>

            {/* Progress Bar */}
            <Box sx={{ width: '80%', marginTop: '8px' }}>
              <LinearProgress
                variant="determinate"
                value={(user?.storage / 1024 / 1024 / 500) * 100}
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
            <Button
              variant="contained"
              color="secondary"
              sx={{ width: '16vw', padding: '8px', fontSize: '0.8rem' }}
              onClick={handleLogOut}
            >
              Logout
            </Button>
          </Box>
        </Box>

        {/* Panel */}
        <Box
          sx={{
            width: '80vw',
            height: '100vh',
            overflow: 'scroll',
            bgcolor: 'primary.main',
            display: 'flex',
            flexDirection: 'column',
            '&::-webkit-scrollbar': {
              display: 'none',
            },
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
                value={search}
                onChange={handleSearch}
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
              <input type="file" name="file" id="file" onChange={handleFileUpload} accept="application/pdf" hidden />
              <label
                htmlFor="file"
                style={{
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Image src="/upload.svg" alt="Upload" width={50} height={50} />
                <Typography variant="caption" color="primary.contrastText">
                  Upload your pdf here
                </Typography>
              </label>
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
                alignItems: 'center',
                marginTop: '8px',
                flexWrap: 'wrap',
              }}
            >
              {filteredFiles
                ? filteredFiles.map((file) => <Card file={file} key={file.id} />)
                : files.map((file) => <Card file={file} key={file.id} />)}
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Dashboard;
