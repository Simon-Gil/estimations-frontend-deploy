import { SecurityConfig } from "../../../models/settings.model";
import { Box, Button, Paper, TextField, Typography } from "@mui/material"
import Grid from '@mui/material/Grid2';
import { SnackbarUtilities } from "../../../Utilities/snackbar-manager";
import { patchSecurityConfig } from "../../../services/generalConfig.services";
import { useEffect, useState } from "react";

interface SecuritySettingsProps {
    securityConfig: SecurityConfig;
    fetchSettings: () => void;
}

const SecuritySettings: React.FC<SecuritySettingsProps> = ({ securityConfig , fetchSettings}) => {

    const [maxLoginAttempts, setMaxLoginAttempts] = useState<number>(0);
    const [blockDurationMinutes, setBlockDurationMinutes] = useState<number>(0);
    const [expirationAuthTokenHours, setExpirationAuthTokenHours] = useState<number>(0);
    const [expirationResetTokenHours, setExpirationResetTokenHours] = useState<number>(0);

    useEffect(() => {
        setMaxLoginAttempts(securityConfig.maxLoginAttempts)
        setBlockDurationMinutes(securityConfig.blockDurationMinutes)
        setExpirationAuthTokenHours(securityConfig.expirationAuthTokenHours)
        setExpirationResetTokenHours(securityConfig.expirationResetTokenHours)
    }, [securityConfig])

    const updateConfig = async () => {
        try {
            await patchSecurityConfig({
                maxLoginAttempts: maxLoginAttempts,
                blockDurationMinutes: blockDurationMinutes,
                expirationAuthTokenHours: expirationAuthTokenHours,
                expirationResetTokenHours: expirationResetTokenHours
            })
            SnackbarUtilities.success('Configuración de seguridad actualizada')
            fetchSettings()
        } catch (error) {
            console.error('Error al actualizar la configuración de seguridad', error)
        }
    }
    return (
        <Paper elevation={3} style={{width: '100%', margin: 'auto', borderRadius: 6 }}>
            <Box paddingX={30} paddingY={4}>
                <Typography variant="h4" style={{ marginBottom: 20 }}>
                    Ajustes de Seguridad
                </Typography>
                <Grid container spacing={2} alignItems="center">
                    <Grid size={10}>
                        <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', height: '45px' }}>
                            Máximo de intentos de inicio de sesión fallidos:
                        </Typography>
                    </Grid>
                    <Grid size={2}>
                        <TextField
                            variant='outlined'
                            margin='normal'
                            type='number'
                            sx={{ width: '80px'}}
                            value={maxLoginAttempts}
                            onChange={(e) => setMaxLoginAttempts(parseInt(e.target.value))}
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={2} alignItems="center">
                    <Grid size={10}>
                        <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', height: '45px' }}>
                            Minutos de bloqueo al usuario por intentos fallidos:
                        </Typography>
                    </Grid>
                    <Grid size={2}>
                        <TextField
                            variant='outlined'
                            margin='normal'
                            type='number'
                            sx={{ width: '80px'}}
                            value={blockDurationMinutes}
                            onChange={(e) => setBlockDurationMinutes(parseInt(e.target.value))}
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={2} alignItems="center">
                    <Grid size={10}>
                        <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', height: '45px' }}>
                            Horas de expiración del token de autenticación:
                        </Typography>
                    </Grid>
                    <Grid size={2}>
                        <TextField
                            variant='outlined'
                            margin='normal'
                            type='number'
                            sx={{ width: '80px'}}
                            value={expirationAuthTokenHours}
                            onChange={(e) => setExpirationAuthTokenHours(parseInt(e.target.value))}
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={2} alignItems="center">
                    <Grid size={10}>
                        <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', height: '45px' }}>
                            Horas de expiración del token de restablecimiento de contraseña:
                        </Typography>
                    </Grid>
                    <Grid size={2}>
                        <TextField
                            variant='outlined'
                            margin='normal'
                            type='number'
                            sx={{ width: '80px'}}
                            value={expirationResetTokenHours}
                            onChange={(e) => setExpirationResetTokenHours(parseInt(e.target.value))}
                        />
                    </Grid>
                </Grid>
                <Button
                    sx={{ marginTop: 2, marginBottom: 1, paddingY: 1.2 }}
                    type='submit'
                    variant='contained'
                    color='secondary'
                    onClick={updateConfig}
                >
                    <Typography variant='h4' color='white'>
                        Actualizar
                    </Typography>
                </Button>
            </Box>
        </Paper>
    );
}

export default SecuritySettings;