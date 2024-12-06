import { Button, TextField, Typography, Paper, CircularProgress, Autocomplete } from '@mui/material';
import { useState, useEffect } from 'react';
import { getUsers } from '../../../services/users.services';
import { createEstimation} from '../../../services/estimation.services';
import { SnackbarUtilities } from '../../../Utilities/snackbar-manager';
import { useNavigate } from 'react-router-dom';

interface CreateEstimationProps {
  opportunityId: string;
  closeModal: () => void;
}

const CreateEstimation: React.FC<CreateEstimationProps> = ({ opportunityId, closeModal }) => {
  const [users, setUsers] = useState<{ id: string; name: string }[]>([]);
  const navigate = useNavigate();
  const [usersAssociated, setUsersAssociated] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const usersData = await getUsers();
        setUsers(usersData);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleUsersAssociated = (users: any) => {
    setUsersAssociated(users.map((user: any) => user.id));
  }


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createEstimation(usersAssociated, opportunityId);
      setLoading(false);
      SnackbarUtilities.success('Estimación creada correctamente');
      closeModal();
      navigate('/dashboard/estimations/list-estimation');
    } catch (error) {
      setLoading(false);
      console.log('Problema al crear la estimación', error);
    }
  };

  return (
    <Paper elevation={3} style={{ padding: 20, width: 500, margin: 'auto', marginTop: '50px' }}>
      <form onSubmit={handleSubmit}>
        <Typography variant="h6" paddingTop={2} align="center">¿Quieres agregar usuarios a la Estimación?</Typography>
        <Typography variant="body1" paddingTop={1} align="center">Si no lo haces ahora podrás hacerlo luego</Typography>
        <Autocomplete
          multiple
          options={users}
          getOptionLabel={(option) => option.name}
          onChange={(event, value) => handleUsersAssociated(value)}
          fullWidth
          renderInput={(params) => <TextField {...params} label="Agregar usuarios" variant="filled" margin="normal" />}
        />
        <Button
          sx={{ marginTop: 2 }}
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={loading}
        >
          {loading ? <CircularProgress size={30} sx={{ color: '#DA1184' }} /> : 'Crear Estimación'}
        </Button>
      </form>
    </Paper>
  );
}
export default CreateEstimation