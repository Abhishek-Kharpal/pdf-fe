import { createContext, useState } from 'react';
import { Snackbar } from '@mui/material';
import { SnackbarI } from '../types';

export const ToastContext = createContext({
  toast: {
    open: false,
    message: '',
    severity: 'success',
    duration: 3000,
  },
  setToast: (toast) => {},
});

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState<SnackbarI>({
    open: false,
    message: '',
    severity: 'success',
    duration: 3000,
  });

  return (
    <ToastContext.Provider value={{ toast, setToast }}>
      <Snackbar
        open={toast.open}
        autoHideDuration={toast.duration}
        onClose={() => setToast({ ...toast, open: false })}
        message={toast.message}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      />
      {children}
    </ToastContext.Provider>
  );
};
