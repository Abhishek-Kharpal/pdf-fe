import { createContext, useState } from 'react';
import { Snackbar } from '@mui/material';
import { SnackbarI } from '../types';

export const ToastContext = createContext({
  snackbar: {
    open: false,
    message: '',
    severity: 'success',
    duration: 3000,
  },
  setToast: (snackbar) => {},
});

export const ToastProvider = ({ children }) => {
  const [snackbar, setToast] = useState<SnackbarI>({
    open: false,
    message: '',
    severity: 'success',
    duration: 3000,
  });

  return (
    <ToastContext.Provider value={{ snackbar, setToast }}>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={snackbar.duration}
        onClose={() => setToast({ ...snackbar, open: false })}
        message={snackbar.message}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      />
      {children}
    </ToastContext.Provider>
  );
};
