import { Autocomplete, Button, Typography } from "@mui/material"
import { IconButton, Paper, TextField } from "@mui/material"
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';
import Grid from '@mui/material/Grid2';
import { LoadUserEstimations } from "../../../models/user.model";
import { useState } from "react";
import { addUser } from "../../../services/estimation.services";
import { SnackbarUtilities } from "../../../Utilities/snackbar-manager";

interface AddUsersProps {
    closeModal: () => void;
    usersAssociated: LoadUserEstimations[]
    users: LoadUserEstimations[]
    estimationId: string
    fetchDetail: () => void
}

const AddUsers: React.FC<AddUsersProps> = ({ closeModal, usersAssociated, users, estimationId, fetchDetail }) => {
    const [usersToSend, setUsersToSend] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const handleUsersAssociated = (selectedUsers: { id: string; name: string }[]) => {
        const ids = selectedUsers.map(user => user.id);
        setUsersToSend(ids);
    };

    const sendUsers = async () => {
        setLoading(true)
        const data = {
            users: usersToSend
        };
        try {
            await addUser(data, estimationId);
            SnackbarUtilities.success('Usuarios agregados con éxito');
            closeModal();
            fetchDetail();

            setLoading(false)
        } catch (error) {
            console.error('Error al agregar los usuarios', error);
            setLoading(false)
        }
    };

    return (
        <Paper elevation={0} style={{ padding: 25, maxWidth: 500, margin: 'auto', borderRadius: 6 }}>
            <Grid container alignItems={'center'} justifyContent='space-between'>
                <Grid size={11}>
                    <Typography variant='h3' color='secondary' >Agregar Usuarios</Typography>
                </Grid>
                <Grid size={1} >
                    <IconButton onClick={closeModal}>
                        <DisabledByDefaultIcon />
                    </IconButton>
                </Grid>
            </Grid>
            <Grid container size={12}>
                <Autocomplete
                    multiple
                    options={users.filter(user =>
                        !usersAssociated.some(associatedUser => associatedUser.email === user.email)
                    )}
                    getOptionLabel={(option) => `${option.name} ${option.lastname} | ${option.grade.name} - ${option.department.name}`}
                    onChange={(event, value) => handleUsersAssociated(value)}
                    fullWidth
                    size='small'
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Agregar usuarios"
                            variant="filled"
                            margin="normal"
                        />
                    )}
                />
                <Button
                    fullWidth
                    variant="contained"
                    color="secondary"
                    onClick={sendUsers}
                    sx={{ marginTop: 2, marginBottom: 1, paddingY: 1.2 }}
                >
                    <Typography variant="h4" color='white'>
                        Guardar
                    </Typography>
                </Button>
            </Grid>
        </Paper>
    )
}
export default AddUsers