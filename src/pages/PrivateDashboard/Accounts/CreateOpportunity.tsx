import { useEffect, useState } from 'react';
import { Button, TextField, Typography, Paper, Select, MenuItem, FormControl, InputLabel, ToggleButton, ToggleButtonGroup, IconButton, SelectChangeEvent, Autocomplete, Chip } from '@mui/material';
import { newOpportunity } from '../../../services/opportunity.services';
import { getTypologies } from '../../../services/typology.services';
import { getUsers } from '../../../services/users.services';
import { SnackbarUtilities } from '../../../Utilities/snackbar-manager';
import { DataCreateOpportunity } from '../../../models/opportunity.models';
import DeleteIcon from '@mui/icons-material/Delete';
import { createTypology } from '../../../services/typology.services';
import { User } from '../../../models/user.model';
import { Account } from '../../../models/account.model';
import Grid from '@mui/material/Grid2';
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';

interface CreateOpportunityProps {
  account: Account;
  closeModal: () => void;
}

const CreateOpportunity: React.FC<CreateOpportunityProps> = ({ account, closeModal }) => {
  const [typologies, setTypologies] = useState<{ id: string; name: string }[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [formData, setFormData] = useState<DataCreateOpportunity>({
    name: '',
    requirements: [],
    typology: {
      id: '',
      name: '',
    },
    commercialManager: '',
    technicalManager: '',
    accountId: account.id,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [useDropdown, setUseDropdown] = useState<boolean>(true);
  const [newRequirement, setNewRequirement] = useState<string>('');
  const [newTypologyName, setNewTypologyName] = useState<string>('');

  useEffect(() => {
    const fetchTypologies = async () => {
      setLoading(true);
      try {
        const typologiesData = await getTypologies();
        setTypologies(typologiesData);
      } catch (error) {
        console.error('Error fetching typologies:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchUsers = async () => {
      try {
        const usersData = await getUsers();
        setUsers(usersData);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchTypologies();
    fetchUsers();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleTypologyChange = (e: SelectChangeEvent<string>) => {
    setFormData((prevState) => ({
      ...prevState,
      typology: {
        name: '',
        id: e.target.value as string
      },
    }));
  };


  const handleTypologyToggle = (event: React.MouseEvent<HTMLElement>, newUseDropdown: boolean | null) => {
    if (newUseDropdown !== null) {
      setUseDropdown(newUseDropdown);
      setNewRequirement('');
      if (newUseDropdown) {
        setNewTypologyName('');
      }
    }
  };

  const handleAddRequirement = () => {
    if (newRequirement.trim()) {
      setFormData((prevState) => ({
        ...prevState,
        requirements: [...prevState.requirements, newRequirement.trim()], // Agregamos el nuevo requisito
      }));
      setNewRequirement(''); // Reseteamos el campo de entrada
    }
  };

  const handleRemoveRequirement = (index: number) => {
    setFormData((prevState) => ({
      ...prevState,
      requirements: prevState.requirements.filter((_, i) => i !== index), // Eliminamos el requisito
    }));
  };

  // Maneja la selección del gestor comercial o técnico
  const handleAutocompleteChange = (value: User | null, name: 'commercialManager' | 'technicalManager') => {
    const id = value ? value.id : '';
    setFormData((prevState) => ({
      ...prevState,
      [name]: id, // Actualiza el campo correspondiente
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let typology;
      if (useDropdown === false) {
        typology = await createTypology(newTypologyName);
        console.log('typology devuelto por service', typology);
      } else {
        typology = formData.typology;
      }
      // Creamos un nuevo formData temporal con la tipología actualizada
      const updatedFormData = {
        ...formData,
        typology: typology, // Actualizamos el valor de typology en formData temporalmente
      };

      // Llamamos a newOpportunity con el formData actualizado
      await newOpportunity(updatedFormData);

      SnackbarUtilities.success('Oportunidad creada correctamente');
      setFormData({
        name: '',
        requirements: [],
        typology: {
          id: '',
          name: '',
        },
        commercialManager: '',
        technicalManager: '',
        accountId: '',
      });
      closeModal();
    } catch (error) {
      console.error('Error creating opportunity:', error);
      SnackbarUtilities.error('Error al crear oportunidad');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper elevation={0} style={{ padding: 25, maxWidth: 500, margin: 'auto', borderRadius: 6 }}>
      <Grid container alignItems={'center'} justifyContent='space-between'>
        <Grid size={11}>
          <Typography variant='h3' color='secondary' >Crear Oportunidad</Typography>
        </Grid>
        <Grid size={1} >
          <IconButton onClick={closeModal}>
            <DisabledByDefaultIcon color='disabled' />
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
          required
        />
        <Grid container alignItems={'center'} justifyContent='space-between'>
          <Grid size={9} sx={{ paddingRight: 2 }}>
            <TextField
              label='Agregar Requisito'
              variant='filled'
              fullWidth
              margin='normal'
              value={newRequirement}
              onChange={(e) => setNewRequirement(e.target.value)}
            />
          </Grid>
          <Grid size={3} marginTop={1}>
            <Button
              fullWidth
              variant='contained'
              color='secondary'
              sx={{ marginTop: 1, marginBottom: 1, paddingY: 1.2 }}
              onClick={handleAddRequirement}>
              <Typography variant="body2" color='white'>
                Agregar
              </Typography>
            </Button>
          </Grid>
        </Grid>
        <div style={{ display: 'flex', flexWrap: 'wrap', marginBottom: '16px' }}>
          {formData.requirements.map((req, index) => (
            <Chip
              key={index}
              label={req}
              color='primary'
              sx={{ margin: '2px' }}
              onDelete={() => handleRemoveRequirement(index)}
              deleteIcon={<DeleteIcon />}
            />
          ))}
        </div>

        <ToggleButtonGroup
          sx={{ marginTop: 2, marginBottom: 1 }}
          value={useDropdown}
          exclusive
          onChange={handleTypologyToggle}
          fullWidth
          color='primary'
        >
          <ToggleButton
            value={true}
          >Seleccionar Tipología
          </ToggleButton>
          <ToggleButton
            value={false}>Nueva Tipología
          </ToggleButton>
        </ToggleButtonGroup>

        {useDropdown ? (
          <FormControl variant='filled' fullWidth margin='normal'>
            <InputLabel id='typology-label'>Tipología</InputLabel>
            <Select
              labelId='typology-label'
              name='typology'
              value={formData.typology.id}
              onChange={handleTypologyChange}
              required
            >
              {typologies.map((typology) => (
                <MenuItem key={typology.id} value={typology.id}
                >
                  {typology.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        ) : (
          <TextField
            label='Nueva Tipología'
            variant='filled'
            fullWidth
            margin='normal'
            value={newTypologyName}
            onChange={(e) => {
              setNewTypologyName(e.target.value);
              setFormData(prevState => ({
                ...prevState,
                typology: {
                  id: '',
                  name: e.target.value
                }
              }));
            }}
            required
          />
        )}
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
          renderInput={(params) => <TextField {...params} label='Resp.  Técnico' variant='filled' margin='normal' />}
        />
        <Button
          sx={{ marginTop: 2, marginBottom: 1, paddingY: 1.2 }}
          type='submit'
          variant='contained'
          color='secondary'
          fullWidth
          disabled={loading}
        >
          <Typography variant="h4" color='white'>
            Crear
          </Typography>
        </Button>
      </form>
    </Paper>
  );
};

export default CreateOpportunity;
