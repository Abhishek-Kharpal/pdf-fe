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
      storage: 12,
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
        {/* LogOut Button */}
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
