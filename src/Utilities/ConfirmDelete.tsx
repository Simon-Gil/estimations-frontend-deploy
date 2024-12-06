import { Button, Paper, Typography } from "@mui/material";
import Grid from '@mui/material/Grid2';
import attentionIcon from '../assets/img/attentionIcon.png';

interface ConfirmDeleteProps {
    subjectName: string;
    confirm: (confirmed: boolean) => void;
    closeModal: () => void;
}

const ConfirmDelete: React.FC<ConfirmDeleteProps> = ({ subjectName, confirm, closeModal }) => {

    return (
        <Paper elevation={0} style={{ padding: 25, maxWidth: 500, margin: 'auto', borderRadius: 6 }}>
            <Grid container justifyContent="center" paddingBottom={2}>
                <img src={attentionIcon} alt="Attention Icon" style={{ width: 100, height: 100 }} />
            </Grid>
            <Typography variant='h3' align="center" color='secondary'>¿Deseas eliminar esta {subjectName}?</Typography>
            <Grid container alignItems={'center'} justifyContent='space-between' spacing={1} paddingTop={1}>
                <Grid size={6}>
                    <Button
                        sx={{ marginTop: 2, marginBottom: 1, paddingY: 1.2 }}
                        type='submit'
                        variant='contained'
                        color='secondary'
                        fullWidth
                        onClick={() => closeModal()}
                    >
                        <Typography variant="h4" color='white'>
                            Cancelar
                        </Typography>
                    </Button>
                </Grid>
                <Grid size={6}>
                    <Button
                        sx={{ marginTop: 2, marginBottom: 1, paddingY: 1.2 }}
                        type='submit'
                        variant='contained'
                        color='primary'
                        fullWidth
                        onClick={() => confirm(true)}
                    >
                        <Typography variant="h4" color='white'>
                            Eliminar
                        </Typography>
                    </Button>
                </Grid>
            </Grid>

        </Paper >
    )
}
export default ConfirmDelete