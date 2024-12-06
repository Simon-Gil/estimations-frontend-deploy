import React, { useState } from 'react';
import { Button, TextField, Typography, Paper } from '@mui/material';
import { loginUser, resetPasswordRequest } from '../../services/auth.service';
import { useDispatch } from 'react-redux';
import { updateUser } from '../../Redux/states/user';
import { useNavigate, useLocation } from 'react-router-dom';
import { mappingUser } from '../../Mapping/mappingUser';
import { SnackbarUtilities } from '../../Utilities/snackbar-manager';
import loginface from '../../assets/img/loginface.png';

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const fromPath = location.state?.from?.pathname || '/dashboard/home';
  const regex = /\/dashboard\/estimations\/workspace\/([^/]+)/;
  const [resetPassword, setResetPassword] = useState<boolean>(false);

  const match = fromPath.match(regex);
  const proposalId = match ? match[1] : undefined;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const user = await loginUser(email, password);
      const userMapped = mappingUser(user.user);
      dispatch(updateUser(userMapped));
      if (fromPath.includes('/dashboard/estimations/workspace') && proposalId) {
        navigate(`/dashboard/estimations/workspace/${proposalId}`);
      } else {
        navigate('/dashboard/home');
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const requestNewPassword = async () => {
    try {
      const response = await resetPasswordRequest(email);
      SnackbarUtilities.success(response.message);
    }
    catch (error) {
      console.error('Error requesting new password:', error);
    }
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', height: '100vh', position: 'relative' }}>
      <Paper elevation={3} style={{ padding: 20, maxWidth: 400, margin: 'auto', position: 'relative' }}>
        {!resetPassword ? (
          <Typography variant='h6' align='center'>Iniciar Sesión</Typography>
        ) : (
          <Typography variant='body1' paddingX={2} paddingY={1} lineHeight={1.2} align='center'>Introduce tu correo para enviarte un enlace de restablecimiento de contraseña</Typography>
        )}
        <form onSubmit={handleLogin}>
          <TextField
            label='Correo Electrónico'
            variant='filled'
            fullWidth
            margin='normal'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {!resetPassword ? (
            <>
              <TextField
                label='Clave'
                type='password'
                variant='filled'
                fullWidth
                margin='normal'
                value={password}
                hiddenLabel={true}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                type='submit'
                variant='contained'
                color='primary'
                fullWidth
                sx={{ marginTop: 2, marginBottom: 1 }}
                disabled={loading}>
                <Typography variant='h4' color='white'> Iniciar Sesión</Typography>
              </Button>
              <Typography marginTop={2} variant='body1' align='center' sx={{ cursor: 'pointer', color: '#DA1184' }} onClick={() => setResetPassword(true)}>¿Olvidaste tu clave?</Typography>
            </>
          ) : (
            <>
              <Button
                variant='contained'
                color='primary'
                fullWidth
                sx={{ marginTop: 2, marginBottom: 1 }}
                onClick={requestNewPassword}>
                Enviar enlace de restablecimiento
              </Button>
              <Typography marginTop={2} variant='body2' align='center' sx={{ cursor: 'pointer', color: '#DA1184' }} onClick={() => setResetPassword(false)}>Volver al Inicio de Sesión</Typography>
            </>
          )}
        </form>
      </Paper>
      {resetPassword && (
        <div
          style={{
            position: 'absolute',
            top: '27%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: -4,
          }}
        >
          <img
            src={loginface}
            alt="Login Face"
            style={{
              width: '220px',
              height: '220px',
              animation: 'moveUp 1.2s ease-in-out',
            }}
          />
          <style>
            {`
          @keyframes moveUp {
            0% {
              transform: translateY(20px);
              opacity: 0;
            }
            100% {
              transform: translateY(0);
              opacity: 1;
            }
          }
        `}
          </style>
        </div>
      )}
    </div>
  );
};

export default Login;