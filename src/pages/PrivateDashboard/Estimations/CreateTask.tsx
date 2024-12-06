import { Profile, SecondLevelCategory } from "../../../models/estimation.model";
import Grid from '@mui/material/Grid2';
import { Autocomplete, Button, Typography, Chip, IconButton, Paper, TextField } from "@mui/material";
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';
import { useState } from "react";
import { SnackbarUtilities } from "../../../Utilities/snackbar-manager";
import { createNewTask } from "../../../services/estimation.services";

interface CreateTaskProps {
    slc: SecondLevelCategory;
    estimationId: string;
    closeModal: () => void;
    profiles: Profile[];
    updateTasks: () => void;
}

const CreateTask: React.FC<CreateTaskProps> = ({ estimationId, closeModal, slc, profiles, updateTasks }) => {
    console.log("slc: ->> ", slc);
    const [loading, setLoading] = useState<boolean>(false);
    const [description, setDescription] = useState<string>('');
    const [selectedProfiles, setSelectedProfiles] = useState<Profile[]>([]); // Array para perfiles seleccionados

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            setLoading(false);
            await createNewTask(description, estimationId, slc.id, selectedProfiles.map((profile) => profile.id));
            updateTasks();
            closeModal();
            SnackbarUtilities.success('Tarea creada correctamente');
        } catch (error) {
            setLoading(false);
        }
    }

    const handleAutocompleteChange = (event: React.SyntheticEvent, value: Profile[]) => {
        setSelectedProfiles(value);
    };

    return (
        <Paper elevation={0} style={{ padding: 25, maxWidth: 500, margin: 'auto', borderRadius: 6 }}>
            <Grid container alignItems={'center'} justifyContent='space-between'>
                <Grid size={11}>
                    <Typography variant='h6' >Crear Tarea de
                        <Chip key={slc.id} label={slc.name}
                            sx={{ 
                                marginTop: -0.4, 
                                marginLeft: 1, 
                                backgroundColor: 'transparent', 
                                border: 2, 
                                borderColor: (theme) => theme.palette.primary.main,
                                '& .MuiChip-label': {
                                    fontSize: '1.1rem', // Increase the font size
                                }
                            }}
                        />
                    </Typography>
                </Grid>
                <Grid size={1} >
                    <IconButton onClick={closeModal}>
                        <DisabledByDefaultIcon color='disabled' />
                    </IconButton>
                </Grid>
            </Grid>
            <form onSubmit={handleSubmit}>
                <TextField
                    label='Descripción'
                    variant='filled'
                    fullWidth
                    margin='normal'
                    name='name'
                    onChange={(e) => setDescription(e.target.value)}

                />
                <Autocomplete
                    multiple
                    options={profiles}
                    getOptionLabel={(option) => option.name}
                    value={selectedProfiles}
                    onChange={handleAutocompleteChange}
                    fullWidth
                    renderTags={(value: Profile[], getTagProps) =>
                        value.map((option, index) => (
                            <Chip label={option.name} {...getTagProps({ index })} />
                        ))
                    }
                    renderInput={(params) => (
                        <TextField {...params} label="Perfiles" variant="filled" margin="normal" />
                    )}
                />
                <Button
                    type='submit'
                    variant='contained'
                    sx={{ marginTop: 2, marginBottom: 1, paddingY: 1.2 }}
                    color='primary'
                    fullWidth
                    disabled={loading}>
                    <Typography variant="h4">
                        Crear
                    </Typography>
                </Button>
            </form>
        </Paper>
    )
}
export default CreateTask
