import { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import { Box, Button, Typography, TextField } from '@mui/material';
import axios from 'axios';
import { ToastContext } from '../../contexts/toast';
import { AuthContext } from '../../contexts/auth';
import { LoadingContext } from '../../contexts/loading';
import { API_URL } from '../../constants/server';

interface LoginFormI {
  email: string;
  password: string;
}

const LoginForm = () => {
  const { setToast } = useContext(ToastContext);
  const { loading, setLoading } = useContext(LoadingContext);
  const { setUser } = useContext(AuthContext);
  const router = useRouter();

  const [loginForm, setLoginForm] = useState<LoginFormI>({
    email: '',
    password: '',
  });

  const [loginFormErrors, setLoginFormErrors] = useState<LoginFormI>({
    email: '',
    password: '',
  });

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    if (!email.match(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/)) {
      setLoginForm({ ...loginForm, email });
      setLoginFormErrors({ ...loginFormErrors, email: 'Email must contain domain' });
      return;
    }
    if (email.length < 5) {
      setLoginForm({ ...loginForm, email });
      setLoginFormErrors({ ...loginFormErrors, email: 'Email must be at least 5 characters' });
      return;
    }
    setLoginForm({ ...loginForm, email });
    setLoginFormErrors({ ...loginFormErrors, email: '' });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length < 8) {
      setLoginForm({ ...loginForm, password: e.target.value });
      setLoginFormErrors({ ...loginFormErrors, password: 'Password must be at least 8 characters' });
      return;
    }
    setLoginForm({ ...loginForm, password: e.target.value });
    setLoginFormErrors({ ...loginFormErrors, password: '' });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (loginFormErrors.email.length > 0 || loginFormErrors.password.length > 0) {
        throw new Error('Invalid form');
      }
      const res = await axios.post(`${API_URL}/login`, loginForm);
      const token = res.data.token;
      localStorage.setItem('token', token);
      const tokenValidation = await axios.get(`${API_URL}/user/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setToast({
        open: true,
        message: res.data.message,
        severity: 'success',
        duration: 3000,
      });
      setUser(tokenValidation.data.user);
      setLoading(false);
      router.push('/dashboard');
    } catch (err) {
      setToast({
        open: true,
        message: err.message,
        severity: 'error',
        duration: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box display="flex" justifyContent="center" flexBasis="100%" flexWrap="wrap">
      <Box width="100%" display="flex" alignItems="center" flexDirection="column">
        <Typography variant="h6" color="primary.contrastText" textAlign="center">
          Already have an account?
        </Typography>

        <Typography variant="body1" color="primary.contrastText" padding="8px" textAlign="center">
          Login to continue
        </Typography>

        <form
          onSubmit={handleSubmit}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <TextField
            onChange={handleEmailChange}
            value={loginForm.email}
            label="Email"
            variant="filled"
            margin="normal"
            autoFocus
            sx={{ width: '16vw', fontSize: '0.8rem', bgcolor: 'primary.contrastText' }}
            fullWidth
            size="small"
            inputProps={{
              style: {
                color: 'primary.main',
              },
            }}
          />
          {loginFormErrors.email && (
            <Typography variant="body1" color="error.main" padding="8px" textAlign="center">
              {loginFormErrors.email}
            </Typography>
          )}
          <TextField
            onChange={handlePasswordChange}
            value={loginForm.password}
            label="Password"
            variant="filled"
            margin="normal"
            type="password"
            fullWidth
            sx={{ width: '16vw', fontSize: '0.8rem', bgcolor: 'primary.contrastText' }}
            size="small"
          />
          {loginFormErrors.password && (
            <Typography variant="body1" color="error.main" padding="8px" textAlign="center">
              {loginFormErrors.password}
            </Typography>
          )}
          {!loading && (
            <Button
              variant="contained"
              color="secondary"
              className="basic-margin"
              sx={{ width: '16vw', padding: '8px', fontSize: '0.8rem' }}
              type="submit"
            >
              Login
            </Button>
          )}
        </form>
      </Box>
    </Box>
  );
};

export default LoginForm;
