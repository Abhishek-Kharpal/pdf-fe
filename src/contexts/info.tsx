import { createContext, useState } from 'react';
import { Snackbar } from '@mui/material';
import { SnackbarI } from '@/types';

export const InfoContext = createContext({
  snackbar: {
    open: false,
    message: '',
    severity: 'success',
    duration: 3000,
  },
  setSnackbar: (snackbar) => {},
});

export const InfoProvider = ({ children }) => {
  const [snackbar, setSnackbar] = useState<SnackbarI>({
    open: false,
    message: '',
    severity: 'success',
    duration: 3000,
  });

  return (
    <InfoContext.Provider value={{ snackbar, setSnackbar }}>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={snackbar.duration}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        message={snackbar.message}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      />
      {children}
    </InfoContext.Provider>
  );
};
