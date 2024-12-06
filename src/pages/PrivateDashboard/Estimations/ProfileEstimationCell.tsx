import { useEffect, useState } from 'react';
import { TextField, IconButton, Button, Typography, Tooltip } from '@mui/material';
import IsoIcon from '@mui/icons-material/Iso';
import { inputNumberStyles } from '../../../Styles/components.styles';
import { deleteTaskByProfile, updatehrsTaskProfiles } from '../../../services/estimation.services';
import { SnackbarUtilities } from '../../../Utilities/snackbar-manager';
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';
import Grid from '@mui/material/Grid2';
import { useSelector } from 'react-redux';
import { AppStore } from '../../../Redux/store';
import DeleteIcon from '@mui/icons-material/Delete';

interface ProfileEstimationCellProps {
    profileMatch: {
        profile: {
            id: string;
            name: string;
        }
        maxCost: number;
        minCost: number;
        hMin: number;
        hMax: number;
        status: string;
    };
    taskStatus: string;
    taskId: string;
    onUpdateHMin: (value: number) => void;
    onUpdateHMax: (value: number) => void;
    refreshTaskData: () => void;
}

const ProfileEstimationCell: React.FC<ProfileEstimationCellProps> = ({ profileMatch, onUpdateHMin, onUpdateHMax, taskStatus, taskId, refreshTaskData }) => {

    const [isEditing, setIsEditing] = useState(profileMatch.hMin > 0);
    const [initialHMin, setInitialHMin] = useState(Math.floor(profileMatch.hMin));
    const [initialHMax, setInitialHMax] = useState(Math.floor(profileMatch.hMax));
    const [currentHMin, setCurrentHMin] = useState(Math.floor(profileMatch.hMin));
    const [currentHMax, setCurrentHMax] = useState(Math.floor(profileMatch.hMax));

    const mode = useSelector((store: AppStore) => store.mode);
    const deleteState = useSelector((store: AppStore) => store.delete);
    const hasChanges = currentHMin !== initialHMin || currentHMax !== initialHMax;

    useEffect(() => {
    }, [profileMatch.minCost, profileMatch.maxCost]);

    const handleUpdateHours = async () => {
        if (currentHMin < 1 || currentHMax <= currentHMin) {
            SnackbarUtilities.warning('Asegúrate de que las horas mínimas sean mayores a 0 y las horas máximas sean mayores a las horas mínimas');
            return;
        }
        const data = {
            hMin: profileMatch.hMin,
            hMax: profileMatch.hMax
        }
        try {
            await updatehrsTaskProfiles(data, profileMatch.profile.id, taskId);
            SnackbarUtilities.success('Estimación actualizada correctamente');
            setInitialHMin(currentHMin);
            setInitialHMax(currentHMax);
            refreshTaskData();
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    useEffect(() => {
        if (deleteState.delete) {
            setIsEditing(false);
        } else {
            setIsEditing(profileMatch.hMin > 0);
        }
    }, [deleteState.delete]);

    const deleteTaskProfile = async () => {
        try {
            await deleteTaskByProfile(taskId, profileMatch.profile.id);
            SnackbarUtilities.success('Perfil eliminado correctamente de la tarea');
            refreshTaskData();
        } catch (error) {
            console.error('Error deleting profile:', error);
        }
    };

    const handleCancel = () => {
        setCurrentHMin(initialHMin);
        setCurrentHMax(initialHMax);

        if (initialHMin === 0 && initialHMax === 0) {
            setIsEditing(false);
        }
    };


    if (taskStatus === 'done') {
        if (mode.value === "money") {
            return (
                <span style={{ width: '100%', display: 'inline-block', textAlign: 'center' }}>
                    {Math.floor(profileMatch.minCost)}€ - {Math.floor(profileMatch.maxCost)}€
                </span>)
        } else {
            return (
                <span style={{ width: '100%', display: 'inline-block', textAlign: 'center' }}>
                    {Math.floor(profileMatch.hMin)} - {Math.floor(profileMatch.hMax)}
                </span>
            )
        }
    }

    return isEditing ? (
        <>
            {mode.value === "time" && !deleteState.delete && (
                <span style={{ width: '100%', display: 'inline-block', textAlign: 'center', justifyContent: 'space-between' }}>
                    <TextField
                        variant="filled"
                        size="small"
                        value={currentHMin === 0 ? "" : currentHMin}
                        type='number'
                        InputProps={{ disableUnderline: true, inputProps: { style: { appearance: "textfield", textAlign: "center", marginTop: '-15px' } } }}
                        sx={inputNumberStyles}
                        onChange={(e) => {
                            const sanitizedValue = e.target.value.replace(/,/g, "");

                            if (sanitizedValue === "") {
                                setCurrentHMin(0);
                                onUpdateHMin(0);
                            } else {
                                const updatedHMin = Math.floor(parseFloat(sanitizedValue));
                                if (!isNaN(updatedHMin) && updatedHMin >= 0) {
                                    setCurrentHMin(updatedHMin);
                                    onUpdateHMin(updatedHMin);
                                }
                            }
                        }}
                        style={{ width: '49%', marginRight: '1%' }}
                    />
                    <TextField
                        variant="filled"
                        size="small"
                        value={currentHMax === 0 ? "" : currentHMax}
                        type='number'
                        InputProps={{ disableUnderline: true, inputProps: { style: { appearance: "textfield", textAlign: "center", marginTop: '-15px' } } }}
                        sx={inputNumberStyles}
                        onChange={(e) => {
                            const sanitizedValue = e.target.value.replace(/,/g, "");

                            if (sanitizedValue === "") {
                                setCurrentHMax(0);
                                onUpdateHMax(0);
                            } else {
                                const updatedHMax = Math.floor(parseFloat(sanitizedValue));
                                if (!isNaN(updatedHMax) && updatedHMax >= 0) {
                                    setCurrentHMax(updatedHMax);
                                    onUpdateHMax(updatedHMax);
                                }
                            }
                        }}
                        style={{ width: '49%', marginLeft: '1%' }}
                    />
                    {hasChanges && (
                        <Grid container size={12} sx={{ marginTop: 1 }}>
                            <Grid size={10}>
                                <Button
                                    sx={{ height: '18px', fontSize: '1pt', }}
                                    type='submit'
                                    variant='contained'
                                    color='primary'
                                    fullWidth
                                    onClick={handleUpdateHours}
                                >
                                    <Typography sx={{ fontSize: '0.75rem', color: 'white' }}>
                                        GUARDAR
                                    </Typography>
                                </Button>
                            </Grid>
                            <Grid size={2} >
                                <Tooltip title="Cancelar">
                                    <IconButton sx={{ padding: 0 }} onClick={handleCancel}>
                                        <DisabledByDefaultIcon style={{ fontSize: 22 }} />
                                    </IconButton>
                                </Tooltip>
                            </Grid>
                        </Grid>
                    )}
                </span>
            )}
            {mode.value === "money" && !deleteState.delete && (
                <span style={{ width: '100%', display: 'inline-block', textAlign: 'center' }}>
                    {Math.floor(profileMatch.minCost)}€ - {Math.floor(profileMatch.maxCost)}€
                </span>
            )}
        </>
    ) : (

        <span style={{ width: '100%', display: 'inline-block', textAlign: 'center', justifyContent: 'space-between' }}>
            {deleteState.delete ? (
                <Tooltip title="Eliminar">
                    <IconButton onClick={() => deleteTaskProfile()} sx={{ padding: 0 }}>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            ) : (
                <Tooltip title="Estimar">
                    <IconButton onClick={() => setIsEditing(true)} sx={{ padding: 0 }}>
                        <IsoIcon />
                    </IconButton>
                </Tooltip>
            )}
        </span>
    );
};

export default ProfileEstimationCell;
