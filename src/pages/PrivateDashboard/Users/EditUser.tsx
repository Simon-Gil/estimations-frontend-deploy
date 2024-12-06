import { Autocomplete, TextField, Button, Paper, Typography, IconButton } from '@mui/material';
import { useState, useEffect } from 'react';
import { getDepartments, getGrades } from '../../../services/users.services';
import { SnackbarUtilities } from '../../../Utilities/snackbar-manager';
import { updateUser } from '../../../services/users.services';
import { User } from '../../../models/user.model';
import Grid from '@mui/material/Grid2';
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';

interface EditUserProps {
  user: User;
  closeModal: () => void;
  fetchUsers: () => void;
}

const EditUser: React.FC<EditUserProps> = ({ user, closeModal, fetchUsers }) => {

  const [departments, setDepartments] = useState<{ id: string, name: string }[]>([]);
  const [grades, setGrades] = useState<{ id: string, name: string }[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const initialFormData = {
    id: user ? user.id : '',
    name: user ? user.name : '',
    lastname: user ? user.lastname : '',
    email: user ? user.email : '',
    department: {
      id: user ? user.department.id : '',
      name: user ? user.department.name : ''
    },
    grade: {
      id: user ? user.grade.id : '',
      name: user ? user.grade.name : ''
    },
    roles: []
  };

  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {

    const fetchOptions = async () => {
      try {
        const departmentsData = await getDepartments();
        const gradesData = await getGrades();
        setDepartments(departmentsData);
        setGrades(gradesData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOptions();
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleAutocompleteChange = (value: any, name: string) => {
    if (name === 'department') {
      setFormData((prevState) => ({
        ...prevState,
        department: value || { id: '', name: '' },
      }));
    } else if (name === 'grade') {
      setFormData((prevState) => ({
        ...prevState,
        grade: value || { id: '', name: '' },
      }));
    }
  };



  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await updateUser(formData);
      SnackbarUtilities.success(`Usuario ${formData.name} actualizado correctamente`);
      setLoading(false);
      closeModal();
      fetchUsers();
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <Paper elevation={0} style={{ padding: 25, maxWidth: 500, margin: 'auto', borderRadius: 6 }}>
      <Grid container alignItems={'center'} justifyContent='space-between'>
        <Grid size={11}>
          <Typography variant='h3' color='secondary'>Editar Usuario</Typography>
        </Grid>
        <Grid size={1}>
          <IconButton onClick={closeModal} >
            <DisabledByDefaultIcon  />
          </IconButton>
        </Grid>
      </Grid>
      <form onSubmit={handleEdit}>
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
          value={formData.department}
          onChange={(event, value) => handleAutocompleteChange(value, 'department')}
          fullWidth
          renderInput={(params) => <TextField {...params} label='Departmento' variant='filled' margin='normal' />}
        />
        <Autocomplete
          options={grades}
          getOptionLabel={(option) => option.name}
          value={formData.grade}
          onChange={(event, value) => handleAutocompleteChange(value, 'grade')}
          fullWidth
          renderInput={(params) => <TextField {...params} label='Nivel' variant='filled' margin='normal' />}
        />
        <Button
          type='submit'
          variant='contained'
          color='secondary'
          fullWidth
          sx={{ marginTop: 2, marginBottom: 1, paddingY: 1.2 }}
        >
          <Typography variant="h4" color='white'>
            Actualizar
          </Typography>
        </Button>
      </form>
    </Paper>
  );
};

export default EditUser;
