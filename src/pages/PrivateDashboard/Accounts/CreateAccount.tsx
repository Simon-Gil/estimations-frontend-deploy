import { useEffect, useState } from 'react';
import { Button, TextField, Typography, Paper, Autocomplete, IconButton } from '@mui/material';
import { newAccount } from '../../../services/account.services';
import { SnackbarUtilities } from '../../../Utilities/snackbar-manager';
import { User } from '../../../models/user.model';
import { getUsers } from '../../../services/users.services';
import Grid from '@mui/material/Grid2';
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';

interface CreateAccountProps {
  closeModal: () => void;
  fetchAccounts: () => void;
}

const CreateAccount: React.FC<CreateAccountProps> = ({ closeModal, fetchAccounts }) => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [commercialManager, setCommercialManager] = useState<string>('');
  const [technicalManager, setTechnicalManager] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [users, setUsers] = useState<User[]>([]);

  // Cargar usuarios (gestores comerciales y técnicos)
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const usersData = await getUsers();
        setUsers(usersData);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        SnackbarUtilities.error('Error al cargar los usuarios');
      }
    };
    fetchUsers();
  }, []);

  // Maneja la selección del gestor comercial o técnico
  const handleAutocompleteChange = (value: User | null, name: string) => {
    const id = value ? value.id : '';
    if (name === 'commercialManager') {
      setCommercialManager(id);
    } else if (name === 'technicalManager') {
      setTechnicalManager(id);
    }
  };

  // Enviar los datos del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await newAccount(name, email, commercialManager, technicalManager,);

      SnackbarUtilities.success('Cuenta creada correctamente');
      setLoading(false);
      closeModal();
      fetchAccounts();
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <Paper elevation={0} style={{ padding: 25, maxWidth: 500, margin: 'auto', borderRadius: 6 }}>
      <Grid container alignItems={'center'} justifyContent='space-between'>
        <Grid size={11}>
          <Typography variant='h3' color='secondary' >Crear Cuenta</Typography>
        </Grid>
        <Grid size={1} >
          <IconButton onClick={closeModal}>
            <DisabledByDefaultIcon />
          </IconButton>
        </Grid>
      </Grid>
      <form onSubmit={handleSubmit}>
        <TextField
          label='Nombre'
          variant='filled'
          fullWidth
          margin='normal'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label='Correo Electrónico'
          variant='filled'
          fullWidth
          margin='normal'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Autocomplete
          options={users}
          getOptionLabel={(option) => `${option.name} ${option.lastname} | ${option.grade.name} - ${option.department.name}`}
          onChange={(event, value) => handleAutocompleteChange(value, 'commercialManager')}
          fullWidth
          renderInput={(params) => <TextField {...params} label='Resp. Comercial' variant='filled' margin='normal' />}
        />

        <Autocomplete
          options={users}
          getOptionLabel={(option) => `${option.name} ${option.lastname} | ${option.grade.name} - ${option.department.name}`}
          onChange={(event, value) => handleAutocompleteChange(value, 'technicalManager')}
          fullWidth
          renderInput={(params) => <TextField {...params} label='Resp. Técnico' variant='filled' margin='normal' />}
        />

        <Button
          sx={{ marginTop: 2, marginBottom: 1, paddingY: 1.2 }}
          type='submit'
          variant='contained'
          color='secondary'
          fullWidth>
          <Typography variant='h4' color='white'>
            Crear
          </Typography>
        </Button>
      </form>
    </Paper >
  );
};

export default CreateAccount;
