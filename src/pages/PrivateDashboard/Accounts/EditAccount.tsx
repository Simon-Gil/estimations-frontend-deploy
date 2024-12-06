import { Autocomplete, TextField, Button, Paper, Typography, ToggleButtonGroup, ToggleButton, IconButton } from '@mui/material';
import { useState, useEffect } from 'react';
import { SnackbarUtilities } from '../../../Utilities/snackbar-manager';
import { validatePriceConfigToSend } from '../../../Utilities/validators';
import { getUsers } from '../../../services/users.services';
import { getProfiles, getPriceConfig, assignDefault, newPrice } from '../../../services/prices.services';
import { updateAccount } from '../../../services/account.services';
import { updatePriceConfig } from '../../../services/prices.services';
import { PriceConfigToSend } from '../../../models/prices.model';
import { Account } from '../../../models/account.model';
import { User, BasicUserData } from '../../../models/user.model';
import Grid from '@mui/material/Grid2';
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';
import { inputNumberStyles } from '../../../Styles/components.styles';
import { useHasAccess } from '../../../hooks/useHasAccess';

interface EditAccountProps {
  account: Account;
  closeModal: () => void;
  fetchAccounts?: () => void;
}

const EditAccount: React.FC<EditAccountProps> = ({ account, closeModal, fetchAccounts }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [users, setUsers] = useState<User[]>([]);
  const [profiles, setProfiles] = useState<{ id: string, name: string, priceH?: number }[]>([]);
  const [priceConfig, setPriceConfig] = useState<{ id: string, isDefault: boolean }>({ id: '', isDefault: true });
  const [customPrices, setCustomPrices] = useState<{ [key: string]: number }>({});
  const [initialTypeIsDefault, setInitialTypeIsDefault] = useState<boolean>(true);
  const [tempCustomPrices, setTempCustomPrices] = useState<{ [key: string]: number }>({});
  const [accountName, setAccountName] = useState<string>(account.name);
  const [accountEmail, setAccountEmail] = useState<string>(account.email);
  const [accountCommercialManager, setAccountCommercialManager] = useState<BasicUserData>(account.commercialManager || { id: '', name: '', lastname: '', email: '' });
  const [accountTechnicalManager, setAccountTechnicalManager] = useState<BasicUserData>(account.technicalManager || { id: '', name: '', lastname: '', email: '' });
  const hasAssignPricePermission = useHasAccess('account', ['managePriceConfig']);

  useEffect(() => {
    console.log('account:', account);
    fetchUsers();
    if (account) {
      fetchPriceConfig();
    }
  }, [account]);

  // Funciones para manejar los cambios
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAccountName(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAccountEmail(e.target.value);
  };

  const handleCommercialManagerChange = (event: any, value: BasicUserData | null) => {
    setAccountCommercialManager(value || { id: '', name: '', lastname: '', email: '' });
  };

  const handleTechnicalManagerChange = (event: any, value: BasicUserData | null) => {
    setAccountTechnicalManager(value || { id: '', name: '', lastname: '', email: '' });
  };

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

  const fetchPriceConfig = async () => {
    try {
      setLoading(true);
      const price = await getPriceConfig(account.id);
      console.log('price:', price);
      setInitialTypeIsDefault(price.isDefault);
      setPriceConfig({ id: price.id, isDefault: price.isDefault });
      if (!price.isDefault) {
        const profilesData = await getProfiles();
        const unifiedProfiles = profilesData.map((profile: { id: string, name: string }) => {
          const matchedProfile = price.profilePrices.find((p: { profile: { name: string }, priceH: string }) => p.profile.name === profile.name);
          return {
            ...profile,
            priceH: matchedProfile ? parseFloat(matchedProfile.priceH) : 0 // Precio personalizado
          };
        });
        setProfiles(unifiedProfiles);
        interface Profile {
          id: string;
          name: string;
          priceH: number;
        }

        interface CustomPrices {
          [key: string]: number;
        }

        setCustomPrices(
          unifiedProfiles
            .map((profile: Profile): CustomPrices => ({ [profile.id]: profile.priceH }))
            .reduce((acc: CustomPrices, curr: CustomPrices) => ({ ...acc, ...curr }), {})
        );
      }

    } catch (error) {
      console.error('Error al cargar la configuración de precios:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePriceType = async (event: React.MouseEvent<HTMLElement>, newValue: boolean) => {
    if (newValue !== null) {
      setPriceConfig((prevConfig) => ({
        ...prevConfig,
        isDefault: newValue,
      }));

      if (newValue) {
        // Cambia a 'default'
        setTempCustomPrices(customPrices); // Guarda precios actuales
        setCustomPrices({}); // Limpia precios personalizados
      } else {
        // Cambia a 'custom'
        if (tempCustomPrices && Object.keys(tempCustomPrices).length > 0) {
          // Restaura precios desde `tempCustomPrices` si existen
          setCustomPrices(tempCustomPrices);
        } else {
          // Si no hay precios guardados, inicializa
          try {
            const profilesData = await getProfiles();
            const unifiedProfiles = profilesData.map((profile: { id: string, name: string }) => ({
              ...profile,
              priceH: 0, // Inicializa todos los precios a 0
            }));
            setProfiles(unifiedProfiles);
            setCustomPrices(unifiedProfiles.reduce((acc: { [key: string]: number }, profile: { id: string, priceH: number }) => ({ ...acc, [profile.id]: profile.priceH }), {}));
          } catch (error) {
            console.error('Error al inicializar los precios personalizados:', error);
          }
        }
      }
    }
  };


  const handleCustomPriceChange = (profile: string, value: number) => {
    setCustomPrices((prevPrices) => ({
      ...prevPrices,
      [profile]: value,
    }));
  };

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const accountDataToSend = {
      id: account.id,
      name: accountName,
      email: accountEmail,
      commercialManager: accountCommercialManager,
      technicalManager: accountTechnicalManager,
    }
    try {
      if (!priceConfig.isDefault) {
        const finalPriceConfig: PriceConfigToSend = {
          profilePrices: Object.keys(customPrices).map((profile) => ({
            profile,
            priceH: customPrices[profile],
          })),
        };
        validatePriceConfigToSend(finalPriceConfig);
        if (initialTypeIsDefault === true) {
          await newPrice(finalPriceConfig, account.id);
        } else {
          await updatePriceConfig(finalPriceConfig, priceConfig.id);
        }
        await updateAccount(accountDataToSend, priceConfig.isDefault);
        closeModal();
        if (fetchAccounts) {
          fetchAccounts();
        }
        SnackbarUtilities.success('Cuenta modificada con precio personalizado');
        setLoading(false);
      } else {
        await assignDefault(account.id);
        await updateAccount(accountDataToSend, priceConfig.isDefault);
        closeModal();
        if (fetchAccounts) {
          fetchAccounts();
        }
        SnackbarUtilities.success('Cuenta modificada con precio default');
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <Paper elevation={0} style={{ padding: 25, maxWidth: 500, margin: 'auto', borderRadius: 6 }}>
      <Grid container alignItems={'center'} justifyContent='space-between'>
        <Grid size={11}>
          <Typography variant='h3' color='secondary' >Editar Cuenta</Typography>
        </Grid>
        <Grid size={1} >
          <IconButton onClick={closeModal}>
            <DisabledByDefaultIcon />
          </IconButton>
        </Grid>
      </Grid>
      <form onSubmit={handleEdit}>
        <TextField
          label='Nombre'
          variant='filled'
          fullWidth
          margin='normal'
          value={accountName}
          onChange={handleNameChange}
        />
        <TextField
          label='Correo Electrónico'
          variant='filled'
          fullWidth
          margin='normal'
          value={accountEmail}
          onChange={handleEmailChange}
        />

        {hasAssignPricePermission && (
        <ToggleButtonGroup
          sx={{ marginTop: 1 }}
          value={priceConfig.isDefault}
          exclusive
          onChange={handlePriceType}
          fullWidth
          color='primary'
        >          
          <ToggleButton value={true}>Precio Default</ToggleButton>
          <ToggleButton value={false}>Precio Custom</ToggleButton>
        </ToggleButtonGroup>
        )}
        {!priceConfig.isDefault && (
          <Grid container size={12} spacing={2}>
            {profiles.map((profile) => (
              <Grid size={2.4} key={profile.id}>
                <TextField
                  label={`${profile.name}`}
                  variant='filled'
                  fullWidth
                  margin='normal'
                  type='number'
                  value={customPrices[profile.id] || ''}
                  InputProps={{ disableUnderline: true, inputProps: { style: { appearance: 'textfield', textAlign: 'center' } } }}
                  InputLabelProps={{ style: { textAlign: 'center', width: '100%' } }}
                  sx={inputNumberStyles}
                  onChange={(e) => {
                    const value = parseFloat(e.target.value);
                    if (value < 1) {
                      SnackbarUtilities.warning('Asigna un precio válido');
                      handleCustomPriceChange(profile.id, 1);
                    } else {
                      handleCustomPriceChange(profile.id, value);
                    }
                  }}
                />
              </Grid>
            ))}
          </Grid>
        )}

        <Autocomplete
          value={accountCommercialManager?.id ? accountCommercialManager : null}
          options={users}
          getOptionLabel={(option) => `${option.name} ${option.lastname}`}
          onChange={handleCommercialManagerChange}
          fullWidth
          renderInput={(params) => (
            <TextField {...params} label='Gestor Comercial' variant='filled' margin='normal' />
          )}
        />
        <Autocomplete
          value={accountTechnicalManager?.id ? accountTechnicalManager : null}
          options={users}
          getOptionLabel={(option) => `${option.name} ${option.lastname}`}
          onChange={handleTechnicalManagerChange}
          fullWidth
          renderInput={(params) => (
            <TextField {...params} label='Gestor Técnico' variant='filled' margin='normal' />
          )}
        />
        <Button
          sx={{ marginTop: 2, marginBottom: 1, paddingY: 1.2 }}
          type='submit'
          variant='contained'
          color='secondary'
          fullWidth>
          <Typography variant='h4' color='white'>
            Actualizar
          </Typography>
        </Button>
      </form>
    </Paper>
  );
};

export default EditAccount;
