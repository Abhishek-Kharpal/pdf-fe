import { createContext, useState } from 'react';
import { LinearProgress } from '@mui/material';

export const LoadingContext = createContext({
  loading: false,
  setLoading: (loading) => {},
});

export const LoadingProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);

  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {loading && (
        <LinearProgress
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            '.& .MuiLinearProgress-bar': {
              backgroundColor: 'secondary.main',
            },
          }}
        />
      )}
      {children}
    </LoadingContext.Provider>
  );
};
