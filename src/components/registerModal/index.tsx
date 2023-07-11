import { useState, useContext } from 'react';
import { Dialog, Typography, Button, InputBase, Paper, IconButton, Box, Tooltip } from '@mui/material';
import { Close } from '@mui/icons-material';
import { LoadingContext } from '../../contexts/loading';
import { ToastContext } from '../../contexts/toast';
import axios from 'axios';
import { RegisterModalI, RegisterUserI } from '../../types';
import { API_URL } from '../../constants/server';

const RegisterModal = ({ open, handleClose }: RegisterModalI) => {
  const [registerUser, setRegisterUser] = useState<RegisterUserI>({
    name: '',
    email: '',
    password: '',
  });
  const [registerError, setRegisterError] = useState({
    name: '',
    email: '',
    password: '',
  });

  const { setLoading } = useContext(LoadingContext);
  const { setToast } = useContext(ToastContext);

  const handleNameChange = (e) => {
    setRegisterUser({ ...registerUser, name: e.target.value });
    const name: string = e.target.value;
    if (name.trim().length === 0) {
      setRegisterError({ ...registerError, name: 'Name is required' });
    } else {
      setRegisterError({ ...registerError, name: '' });
    }
  };

  const handleEmailChange = (e) => {
    setRegisterUser({ ...registerUser, email: e.target.value });
    const isValidEmail = e.target.value.match(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/);
    if (!isValidEmail) {
      setRegisterError({ ...registerError, email: 'Please enter a valid email' });
    } else {
      setRegisterError({ ...registerError, email: '' });
    }
  };

  const handlePasswordChange = (e) => {
    setRegisterUser({ ...registerUser, password: e.target.value });
    if (e.target.value.trim().length < 8) {
      setRegisterError({ ...registerError, password: 'Password must be at-least 8 characters long' });
    } else {
      setRegisterError({ ...registerError, password: '' });
    }
  };

  const handleRegister = async () => {
    if (registerError.name !== '' || registerError.email !== '' || registerError.password !== '') {
      return;
    }
    if (registerUser.name.trim().length === 0) {
      setRegisterError({ ...registerError, name: 'Name is required' });
      return;
    }
    const isValidEmail = registerUser.email.match(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/);
    if (!isValidEmail) {
      setRegisterError({ ...registerError, email: 'Please enter a valid email' });
      return;
    }
    if (registerUser.password.trim().length < 8) {
      setRegisterError({ ...registerError, password: 'Password must be at-least 8 characters long' });
      return;
    }
    setLoading(true);
    try {
      const lowerCaseEmail = registerUser.email.toLowerCase();
      const res = await axios.post(`${API_URL}/register`, {
        name: registerUser.name,
        email: lowerCaseEmail,
        password: registerUser.password,
      });
      if (res.status === 201) {
        setToast({ open: true, message: 'Registered successfully', severity: 'success', duration: 3000 });
      } else {
        setToast({ open: true, message: 'Something went wrong', severity: 'error', duration: 3000 });
      }
    } catch (err) {
      setToast({ open: true, message: 'Something went wrong', severity: 'error', duration: 3000 });
    } finally {
      setLoading(false);
      setRegisterUser({
        name: '',
        email: '',
        password: '',
      });
      handleClose();
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <Paper
        sx={{
          width: '320px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          bgcolor: 'primary.main',
        }}
        className="basic-padding"
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            flexGrow: 1,
            width: '100%',
          }}
        >
          <Typography variant="h6" color="primary.contrastText">
            Register
          </Typography>

          <Tooltip title="Close" placement="top">
            <IconButton size="small" color="secondary" sx={{ padding: '0px' }} onClick={handleClose}>
              <Close />
            </IconButton>
          </Tooltip>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexGrow: 1,
            width: '100%',
          }}
          className="basic-margin"
        >
          <InputBase
            fullWidth
            placeholder="Name"
            sx={{ color: 'primary.contrastText', borderBottom: '1px solid #f5f5f5' }}
            value={registerUser.name}
            onChange={handleNameChange}
          />
        </Box>
        {registerError.name !== '' && (
          <Typography variant="caption" color="error">
            {registerError.name}
          </Typography>
        )}

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexGrow: 1,
            width: '100%',
          }}
          className="basic-margin"
        >
          <InputBase
            fullWidth
            placeholder="Email"
            sx={{ color: 'primary.contrastText', borderBottom: '1px solid #f5f5f5' }}
            value={registerUser.email}
            onChange={handleEmailChange}
            type="email"
          />
        </Box>
        {registerError.email !== '' && (
          <Typography variant="caption" color="error">
            {registerError.email}
          </Typography>
        )}

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexGrow: 1,
            width: '100%',
          }}
          className="basic-margin"
        >
          <InputBase
            fullWidth
            placeholder="Password"
            sx={{ color: 'primary.contrastText', borderBottom: '1px solid #f5f5f5' }}
            value={registerUser.password}
            onChange={handlePasswordChange}
            type="password"
          />
        </Box>
        {registerError.password !== '' && (
          <Typography variant="caption" color="error">
            {registerError.password}
          </Typography>
        )}

        <Button
          variant="contained"
          fullWidth
          color="secondary"
          sx={{
            marginTop: '8px',
            width: '100%',
          }}
          onClick={handleRegister}
        >
          Register
        </Button>
      </Paper>
    </Dialog>
  );
};

export default RegisterModal;
