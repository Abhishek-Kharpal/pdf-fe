import { createContext, useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { LoadingContext } from './loading';
import { ToastContext } from './toast';
import { API_URL } from '../constants/server';
import { AuthContextI } from '../types';

export const AuthContext = createContext<AuthContextI>({
  user: null,
  setUser: (user) => {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const { setLoading } = useContext(LoadingContext);
  const { setToast } = useContext(ToastContext);

  const router = useRouter();

  const handleMount = async () => {
    const token = localStorage.getItem('token');
    setLoading(true);

    if (token) {
      try {
        const res = await axios.get(`${API_URL}/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(res.data.user);
      } catch (err) {
        setToast({
          open: true,
          message: err.response?.data?.message || 'Authentication failed',
          severity: 'error',
        });
        setUser(null);
        localStorage.removeItem('token');
        router.push('/');
      } finally {
        setLoading(false);
      }
    } else {
      setUser(null);
      setLoading(false);
      router.push('/');
    }
  };

  useEffect(() => {
    handleMount();
  }, []);

  return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>;
};
