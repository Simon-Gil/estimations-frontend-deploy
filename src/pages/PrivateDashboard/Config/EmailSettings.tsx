import { useEffect, useState } from "react";
import { EmailConfig } from "../../../models/settings.model";
import { patchMailConfig } from "../../../services/generalConfig.services";
import { SnackbarUtilities } from "../../../Utilities/snackbar-manager";
import { Button, Typography, Paper, Switch, Box } from "@mui/material";
import Grid from '@mui/material/Grid2';

interface EmailSettingsProps {
    emailConfig: EmailConfig;
    fetchSettings: () => void;
}

const EmailSettings: React.FC<EmailSettingsProps> = ({ emailConfig, fetchSettings}) => {
    const [sendUserFinishedEmail, setSendUserFinishedEmail] = useState<boolean>(false);
    const [sendDoneEstimationEmail, setSendDoneEstimationEmail] = useState<boolean>(false);
    const [sendAssignedUserEmail, setSendAssignedUserEmail] = useState<boolean>(false);
    console.log("emailConfig", emailConfig)
    useEffect(() => {
        setSendUserFinishedEmail(emailConfig.sendUserFinishedEmail)
        setSendDoneEstimationEmail(emailConfig.sendDoneEstimationEmail)
        setSendAssignedUserEmail(emailConfig.sendAssignedUserEmail)
    }, [emailConfig])



    const updateConfig = async () => {
        try {
            await patchMailConfig({
                sendUserFinishedEmail: sendUserFinishedEmail,
                sendDoneEstimationEmail: sendDoneEstimationEmail,
                sendAssignedUserEmail: sendAssignedUserEmail
            })
            SnackbarUtilities.success('Configuración de correo electrónico actualizada')
            fetchSettings()
        } catch (error) {
            console.error('Error al actualizar la configuración de correo electrónico', error)
        }
    }

    return (
        <Paper elevation={3} style={{ width: '100%', margin: 'auto', borderRadius: 6 }}>
            <Box paddingX={30} paddingY={4}>
                <Typography variant="h4" style={{ marginBottom: 20 }}>
                    Ajustes de Seguridad
                </Typography>
                <Grid container spacing={2} alignItems="center">
                    <Grid size={9}>
                        <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', height: '45px' }}>

                            Enviar correo cuando el usuario finaliza sus estimaciones:
                        </Typography>
                    </Grid>
                    <Grid size={3}>
                        <Switch
                            checked={sendUserFinishedEmail}
                            onChange={(e) => setSendUserFinishedEmail(e.target.checked)}
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={2} alignItems="center">
                    <Grid size={9}>
                        <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', height: '45px' }}>

                            Enviar correo cuando un usuario es asignado a una estimación:
                        </Typography>
                    </Grid>
                    <Grid size={3}>
                        <Switch
                            checked={sendAssignedUserEmail}
                            onChange={(e) => setSendAssignedUserEmail(e.target.checked)}
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={2} alignItems="center">
                    <Grid size={9}>
                        <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', height: '45px' }}>

                            Enviar correo cuando se marca la estimación como finalizada:
                        </Typography>
                    </Grid>
                    <Grid size={3}>
                        <Switch
                            checked={sendDoneEstimationEmail}
                            onChange={(e) => setSendDoneEstimationEmail(e.target.checked)}
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
    )
}
export default EmailSettings