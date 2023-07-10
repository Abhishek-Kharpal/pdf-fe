import { Box, Dialog, Typography, Button, TextField } from '@mui/material';
import { RegisterModalI } from '../../types';

const RegisterModal = ({ open, handleClose }: RegisterModalI) => {
  return (
    <Dialog open={open}>
      <Box>
        <Typography variant="h6" color="primary.contrastText">
          Register
        </Typography>

        <form>
          <TextField
            // {...register('email', {
            //   required: true,
            //   pattern: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/,
            // })}
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
            // {...register('password', {
            //   required: true,
            //   minLength: 8,
            // })}
            label="Password"
            variant="filled"
            margin="normal"
            type="password"
            fullWidth
            sx={{ width: '16vw', fontSize: '0.8rem', bgcolor: 'primary.contrastText' }}
            size="small"
            inputProps={{
              style: {
                color: 'primary.main',
              },
            }}
          />
          <TextField
            // {...register('confirmPassword', {
            //   required: true,
            //   minLength: 8,
            // })}
            label="Confirm Password"
            variant="filled"
            margin="normal"
            type="password"
            fullWidth
            sx={{ width: '16vw', fontSize: '0.8rem', bgcolor: 'primary.contrastText' }}
            size="small"
            inputProps={{
              style: {
                color: 'primary.main',
              },
            }}
          />
          <TextField
            // {...register('name', {
            //   required: true,
            // })}
            label="Name"
            variant="filled"
            margin="normal"
            fullWidth
            size="small"
            inputProps={{
              style: {
                color: 'primary.main',
              },
            }}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Box>
    </Dialog>
  );
};

export default RegisterModal;
