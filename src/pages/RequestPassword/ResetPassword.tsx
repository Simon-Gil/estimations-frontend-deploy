import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CircularProgress, Paper, Typography, TextField, Button } from "@mui/material";
import { SnackbarUtilities } from "../../Utilities/snackbar-manager";
import { resetPasswordServ } from "../../services/auth.service";

const ResetPassword: React.FC = () => {
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>(''); 
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    // Función para obtener el token de la URL
    const getTokenFromUrl = (): string | null => {
        const params = new URLSearchParams(window.location.search);
        return params.get('token');
    };

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        const token = getTokenFromUrl();

        if (!token) {
            SnackbarUtilities.warning('Token no válido. Por favor, intenta de nuevo.');
            return;
        }
        setLoading(true);
        try {
            await resetPasswordServ(token, password, confirmPassword);
            SnackbarUtilities.success(`El cambio se ha realizado correctamente. Su nueva contraseña es: ${password}`);
            navigate('/login');
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    };

    return (
        <Paper elevation={3} style={{ padding: 20, maxWidth: 400, margin: 'auto', marginTop: '50px' }}>
            <Typography variant="h5" align="center">Restablecer Contraseña</Typography>
            <form onSubmit={handleResetPassword}>
                <TextField
                    label="Nueva Clave"
                    type="password"
                    variant="filled"
                    fullWidth
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <TextField
                    label="Confirmar Clave"
                    type="password"
                    variant="filled"
                    fullWidth
                    margin="normal"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    disabled={loading}>
                    {loading ? <CircularProgress size={30} sx={{ color: '#DA1184' }} /> : 'Restablecer Clave'}
                </Button>
            </form>
        </Paper>
    );
};

export default ResetPassword;

