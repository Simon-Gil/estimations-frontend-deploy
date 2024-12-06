import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { PublicRoutes } from '../models/routes';
import { getToken, removeToken } from '../Helpers/tokenHelpers';
import { recoverData } from '../Helpers/recoverData';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppStore } from '../Redux/store';
import { useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import { useState } from 'react';

export const AuthGuard = () => {
  const navigate = useNavigate();
  const userId = useSelector((store: AppStore) => store.user.id);
  const permissions = useSelector((store: AppStore) => store.user.permissions);
  const dispatch = useDispatch();
  const token = getToken();
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  const isTokenExpired = (token: string): boolean => {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp * 1000 < Date.now();
    } catch (error) {
      return true;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!userId) {
        await recoverData('', dispatch, navigate);
      }
      setLoading(false);
    };

    if (!token || isTokenExpired(token)) {
      console.warn('Token inválido o expirado. Redirigiendo al login...');
      removeToken(); // Eliminar el token del almacenamiento
      navigate(PublicRoutes.LOGIN, { state: { from: location } });
      return;
    }

    fetchData();
  }, [userId, token, dispatch, navigate, location]);


  if (loading) {
    return <CircularProgress size={30} style={{ color: '#DA1184' }} />;
  }

  if (!token || isTokenExpired(token)) {
    return <Navigate to={PublicRoutes.LOGIN} state={{ from: location }} />;
  }

  if (!userId || !permissions) {
    return <CircularProgress size={30} style={{ color: '#DA1184' }} />;
  }

  return <Outlet />;

}
export default AuthGuard;
