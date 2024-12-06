import { getToken, removeToken } from '../Helpers/tokenHelpers';
import { Dispatch } from '@reduxjs/toolkit';
import { recoverUserData } from '../services/auth.service';
import { updateUser } from '../Redux/states/user';
import { mappingUser } from '../Mapping/mappingUser';
import { NavigateFunction } from 'react-router-dom';

export const recoverData = async (
  userId: string,
  dispatch: Dispatch,
  navigate: NavigateFunction,
  fromPage?: string
) => {
  if (!userId) {
    const token = getToken();

    if (!token) {
      console.warn('Token no encontrado. Redirigiendo al login...');
      navigate('/login');
      return;
    }

    try {
      const recoveredUserData = await recoverUserData();
      const userMapped = mappingUser(recoveredUserData);
      dispatch(updateUser(userMapped));

      if (fromPage === 'login') {
        navigate('/dashboard/home');
      }
    } catch (error) {
      console.error(
        'Error al recuperar datos del usuario. Eliminando token y redirigiendo al login...',
        error
      );
      removeToken();
      navigate('/login');
    }
  }
};
