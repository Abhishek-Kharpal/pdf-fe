import { useEffect, useState } from 'react';
import { Box, Typography, LinearProgress, Button } from '@mui/material';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [files, setFiles] = useState([]);

  useEffect(() => {
    // Get user details
    setUser({
      name: 'Abhishek',
      email: 'abk@gmail.com',
      storage: 400,
      files: [],
      comments: [],
    });
    // Get files
  }, []);

  return (
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
            ShareIt
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
      <Box>
        {/* Header */}
        {/* Upload Card */}
        {/* Your Files */}
      </Box>
    </Box>
  );
};

export default Dashboard;
