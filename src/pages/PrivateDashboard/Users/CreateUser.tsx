import { Autocomplete, TextField, Button, Paper, Typography,  IconButton } from '@mui/material';
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';
import { useState, useEffect } from 'react';
import { registerUser, getDepartments, getGrades } from '../../../services/users.services';
import { SnackbarUtilities } from '../../../Utilities/snackbar-manager';
import Grid from '@mui/material/Grid2';

interface CreateUserProps {
    closeModal: () => void;
    fetchUsers: () => void;
}


const CreateUser: React.FC<CreateUserProps> = ({ closeModal, fetchUsers }) => {
    const [departments, setDepartments] = useState<{ id: string, name: string }[]>([]);
    const [grades, setGrades] = useState<{ id: string, name: string }[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const initialFormData = {
        name: '',
        lastname: '',
        email: '',
        department: {
            id: '',
            name: ''
        },
        grade: {
            id: '',
            name: ''
        },
    };
    const [formData, setFormData] = useState(initialFormData)


    useEffect(() => {
        // Cargar las opciones de departmentos y niveles
        const fetchData = async () => {
            try {
                const departmentsData = await getDepartments();
                const gradesData = await getGrades();
                setDepartments(departmentsData);
                setGrades(gradesData);
                setLoading(false);
            } catch (error) {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleAutocompleteChange = (value: any, name: string) => {
        value = value.id;
        setFormData(prevState => ({
            ...prevState,
            [name]: value ? value : '',
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const user = await registerUser(formData);
            SnackbarUtilities.success(`Usuario ${user.name} creado correctamente`);
            setLoading(false);
            setFormData(initialFormData);
            closeModal();
            fetchUsers();
        } catch (error) {
            setLoading(false);
        }
    }

    return (
        <Paper elevation={0} style={{ padding: 25, maxWidth: 500, margin: 'auto', borderRadius: 6 }}>
            <Grid container alignItems={'center'} justifyContent='space-between'>
                <Grid size={11}>
                    <Typography variant='h3' color='secondary' >Crear Usuario</Typography>
                </Grid>
                <Grid size={1} >
                    <IconButton onClick={closeModal}>
                        <DisabledByDefaultIcon  />
                    </IconButton>
                </Grid>
            </Grid>
            <form onSubmit={handleSubmit}>
                <TextField
                    label='Nombre'
                    variant='filled'
                    fullWidth
                    margin='normal'
                    name='name'
                    value={formData.name}
                    onChange={handleInputChange}
                />
                <TextField
                    label='Apellido'
                    variant='filled'
                    fullWidth
                    margin='normal'
                    name='lastname'
                    value={formData.lastname}
                    onChange={handleInputChange}
                />
                <TextField
                    label='Correo Electrónico'
                    variant='filled'
                    fullWidth
                    margin='normal'
                    name='email'
                    value={formData.email}
                    onChange={handleInputChange}
                />
                <Autocomplete
                    options={departments}
                    getOptionLabel={(option) => option.name}
                    onChange={(event, value) => handleAutocompleteChange(value, 'department')}
                    fullWidth
                    renderInput={(params) => <TextField {...params} label='Departmento' variant='filled' margin='normal' />}
                />
                <Autocomplete
                    options={grades}
                    getOptionLabel={(option) => option.name}
                    onChange={(event, value) => handleAutocompleteChange(value, 'grade')}
                    fullWidth
                    renderInput={(params) => <TextField {...params} label='Nivel' variant='filled' margin='normal' />}
                />
                <Button
                    type='submit'
                    variant='contained'
                    sx={{ marginTop: 2, marginBottom: 1, paddingY: 1.2 }}
                    color='secondary'
                    fullWidth>
                    <Typography variant="h4" color='white'>
                        Crear
                    </Typography>
                </Button>
            </form>
        </Paper>
    );
}
export default CreateUser