import { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Box, Button, Typography, TextField } from '@mui/material';
import { ToastContext } from '../../contexts/toast';

const LoginForm = () => {
  const { setSnackbar } = useContext(ToastContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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
          onSubmit={handleSubmit((data) => console.log(data))}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <TextField
            {...register('email', {
              required: true,
              pattern: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/,
            })}
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
          <TextField
            {...register('password', {
              required: true,
              minLength: 8,
            })}
            label="Password"
            variant="filled"
            margin="normal"
            type="password"
            fullWidth
            sx={{ width: '16vw', fontSize: '0.8rem', bgcolor: 'primary.contrastText' }}
            size="small"
          />
          <Button
            variant="contained"
            color="secondary"
            className="basic-margin"
            sx={{ width: '16vw', padding: '8px', fontSize: '0.8rem' }}
            type="submit"
          >
            Login
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default LoginForm;
