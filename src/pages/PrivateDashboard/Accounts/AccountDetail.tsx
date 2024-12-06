import { useEffect, useState, useMemo } from 'react';
import { Account } from '../../../models/account.model';
import { changeStatus, getOpportunitiesAccount } from '../../../services/opportunity.services';
import { Typography, CircularProgress, Box, Button, Chip, Modal, Tooltip, IconButton, MenuItem, Select, useTheme, Popover } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { Opportunity } from '../../../models/opportunity.models';
import Grid from '@mui/material/Grid2';
import { MaterialReactTable, useMaterialReactTable, type MRT_ColumnDef, } from 'material-react-table';
import { useNavigate } from 'react-router-dom';
import CreateOpportunity from './CreateOpportunity';
import AddIcon from '@mui/icons-material/Add';
import UploadDocument from '../Opportunity/UploadDocument';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import EmailIcon from '@mui/icons-material/Email';
import WorkIcon from '@mui/icons-material/Work';
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions';
import CreateProposal from '../Proposals/CreateProposal';
import TabIcon from '@mui/icons-material/Tab';
import EuroIcon from '@mui/icons-material/Euro';
import React from 'react';
import { useHasAccess } from '../../../hooks/useHasAccess';
import { PriceConfig } from '../../../models/prices.model';
import { getPriceConfig } from '../../../services/prices.services';
import EditAccount from './EditAccount';
import EditIcon from '@mui/icons-material/Edit';
import { MRT_Localization_ES } from 'material-react-table/locales/es';

const AccountDetail: React.FC = () => {
  const location = useLocation();
  const account = location.state?.account as Account;
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [openCreateOpportunity, setOpenCreateOpportunity] = useState<boolean>(false);
  const [openUploadDocument, setOpenUploadDocument] = useState<boolean>(false);
  const [opportunitySelected, setOpportunitySelected] = useState<string>('');
  const [openCreateProposal, setOpenCreateProposal] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const hasReadPriceConfigPermission = useHasAccess('account', ['readPriceConfig']);
  const [priceConfig, setPriceConfig] = useState<PriceConfig | null>(null);
  const [openEditAccount, setOpenEditAccount] = useState<boolean>(false);

  const navigate = useNavigate();
  const theme = useTheme();

  const fetchOpportunities = async () => {
    if (!account) return;
    setLoading(true);
    try {
      const opportunitiesData = await getOpportunitiesAccount(account.id);
      console.log('opportunities data', opportunitiesData);
      setOpportunities(opportunitiesData || []);
    } catch (error) {
      console.error('Error fetching opportunities:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPriceConfig = async () => {
    const response = await getPriceConfig(account.id);
    setPriceConfig(response);
  }

  useEffect(() => {
    if (hasReadPriceConfigPermission) {
      fetchPriceConfig();
    }
    fetchOpportunities();
  }, []);

  const handleUploadDocument = async (opportunityId: string) => {
    setOpportunitySelected(opportunityId);
    setOpenUploadDocument(true)
  };
  const handleProposal = async (opportunityId: string) => {
    setOpportunitySelected(opportunityId);
    setOpenCreateProposal(true)
  };

  const handleStatusChange = async (opportunityId: string, status: string) => {
    await changeStatus(opportunityId, status);
    fetchOpportunities();
  }

  const handleDetail = (proposalId: string) => {
    navigate('/dashboard/proposals/workspace', { state: { proposalId } });
  };

  const togglePopover = (event?: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event?.currentTarget || null);
  };

  const handleEdit = () => {
    setOpenEditAccount(true);
  };

  const columns = useMemo<MRT_ColumnDef<Opportunity>[]>(() => [
    {
      accessorKey: 'name',
      header: 'Oportunidad',
      size: 240,
    },
    {
      accessorKey: 'status',
      header: 'Estado',
      size: 100,
      Cell: ({ row }) => (
        <Select
          fullWidth
          size='small'
          value={row.original.status}
          onChange={(e) => handleStatusChange(row.original.id, e.target.value)}
          sx={{
            borderRadius: 2,
            backgroundColor:
              row.original.status === 'pending'
                ? '#E7A900'
                : row.original.status === 'won'
                  ? '#1F9704'
                  : row.original.status === 'lost'
                    ? '#C2132A'
                    : 'inherit',
            color: 'white',
            '& .MuiSelect-icon': {
              color: 'white', // Icono de la flecha
            },
          }}
        >
          <MenuItem value='pending'>Pending</MenuItem>
          <MenuItem value='won'>Won</MenuItem>
          <MenuItem value='lost'>Lost</MenuItem>
        </Select>
      ),
    },
    {
      accessorKey: 'proposals',
      header: 'Propuesta',
      size: 450,
      Cell: ({ row }) => (
        <>
          <Tooltip title='Crear Propuesta' arrow>
            <IconButton
              sx={{
                marginRight: '10px',
                height: '100%',
                backgroundColor: 'secondary.main',
                color: 'white',
                '&:hover': {
                  backgroundColor: 'primary.main'
                },
              }}
              onClick={(e) => {
                e.stopPropagation();
                handleProposal(row.original.id);
              }}>
              <AddIcon sx={{ color: 'white', fontSize: '16px' }} />
            </IconButton>
          </Tooltip>
          {row.original.proposals?.map((proposal, index) => (
            proposal.techProposal && (
              <Chip
                key={index} // Asegúrate de proporcionar una clave única
                label={
                  proposal.techProposal.length > 50
                    ? proposal.techProposal.slice(0, 50) + '...'
                    : proposal.techProposal
                }
                sx={{ marginRight: '5px', marginTop: '5px', marginBottom: '5px', fontSize: '0.75rem', fontWeight: '500', border: 2, borderColor: 'secondary', backgroundColor: 'transparent' }}
                onClick={(e) => {
                  e.stopPropagation(); // Evita que el evento afecte a elementos padres
                  handleDetail(proposal.id); // Llama a la función con el ID
                }}
              />
            )
          ))}
        </>
      ),
    },
    {
      header: 'Docs',
      size: 100,
      Cell: ({ row }) => (
        <Tooltip title='Documentación' arrow>
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              handleUploadDocument(row.original.id);
            }}
          >
            <TabIcon />
          </IconButton>
        </Tooltip>
      ),
    },
  ], []);

  return (
    <>
      {account && (
        <>
          <Grid container size={12} sx={{ display: 'flex', alignItems: 'center', marginBottom: 3 }}>
            <Box width={'35px'} height={'35px'} marginRight={1} display='flex' justifyContent='center' alignItems='center' borderRadius={1.2} sx={{ backgroundColor: 'secondary.main' }}>
              <AccountBalanceWalletIcon fontSize="medium" sx={{ color: 'white' }} />
            </Box>
            <Typography variant="h1">{account.name}</Typography>
          </Grid>
          <Box
            sx={{
              display: 'flex',
              gap: 1,
              flexWrap: 'wrap',
              marginBottom: 2,
            }}
          >
            <Tooltip title='Correo Electrónico' arrow>
              <Chip
                icon={<EmailIcon sx={{ fontSize: 18, color: `${theme.palette.secondary.main} !important` }} />}
                label={<Typography fontWeight={550} variant='body2' color='#secondary'>{account.email}</Typography>}
                sx={{ padding: 1, justifyContent: 'flex-start' }}
              />
            </Tooltip>
            <Tooltip title='Responsable Comercial' arrow>
              <Chip
                icon={<WorkIcon sx={{ fontSize: 18, color: `${theme.palette.secondary.main} !important` }} />}
                label={
                  <div>
                    <Typography fontWeight={550} color='#secondary' variant='body2'>{`${account.commercialManager?.name || ''} ${account.commercialManager?.lastname || 'No asignado'}`}</Typography>
                  </div>
                }
                sx={{ padding: 1, justifyContent: 'flex-start' }}
              />
            </Tooltip>
            <Tooltip title='Responsable Técnico' arrow>
              <Chip
                icon={<IntegrationInstructionsIcon sx={{ fontSize: 18, color: `${theme.palette.secondary.main} !important` }} />}
                label={
                  <div >
                    <Typography fontWeight={550} color='secondary' variant='body2'>{`${account.technicalManager?.name || ''} ${account.technicalManager?.lastname || 'No asignado'}`}</Typography>
                  </div>
                }
                sx={{ padding: 1, justifyContent: 'flex-start' }}
              />
            </Tooltip>
            <Tooltip title='Precios de perfiles para la cuenta' arrow>
              <Chip
                color='secondary'
                onClick={(event) => togglePopover(event)}
                icon={<EuroIcon sx={{ fontSize: 18, color: `white` }} />}
                label={
                  <div >
                    <Typography fontWeight={550} color='white' variant='body2'>{`Precios`}</Typography>
                  </div>
                }
                sx={{ padding: 1, justifyContent: 'flex-start' }}
              />
            </Tooltip>
            <Popover
              open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={() => setAnchorEl(null)}
              disableRestoreFocus={true}
              sx={{ marginTop: 5 }}
            >
              <Typography variant='body2' sx={{ maxWidth: '400px', lineHeight: 1.4, padding: 2 }}>
                <strong>Precios por perfil:</strong>
                {priceConfig?.profilePrices && priceConfig.profilePrices.length > 0 ? (
                  <ul>
                    {priceConfig.profilePrices.map((profilePrice) => (
                      <li key={profilePrice.profile.name}>
                        {profilePrice.profile.name}: {profilePrice.priceH}€
                      </li>
                    ))}
                  </ul>
                ) : (
                  <span>No hay precios configurados para los perfiles.</span>
                )}
              </Typography>
            </Popover>

            <Box
              onClick={handleEdit}
              sx={{ cursor: 'pointer', paddingTop: 0.5 }}
            >
              <Tooltip title='Editar Cuenta' arrow>
                <EditIcon />
              </Tooltip>
            </Box>

          </Box>
          <Modal
            open={openCreateOpportunity}
            onClose={() => setOpenCreateOpportunity(false)}
          >
            <Box sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 600,
              p: 1,
              borderRadius: 2,
              padding: 0,
            }}>
              <CreateOpportunity account={account} closeModal={() => setOpenCreateOpportunity(false)} />
            </Box>
          </Modal>
          <Modal
            open={openUploadDocument}
            onClose={() => setOpenUploadDocument(false)}
          >
            <Box sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 600,
              p: 1,
              borderRadius: 2,
              padding: 0,
            }}>
              {opportunitySelected && <UploadDocument opportunityId={opportunitySelected} closeModal={() => setOpenUploadDocument(false)} />}
            </Box>
          </Modal>
          <Modal
            open={openCreateProposal}
            onClose={() => setOpenCreateProposal(false)}
          >
            <Box sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 600,
              p: 1,
              borderRadius: 2,
              padding: 0,
            }}>
              <CreateProposal fetchOpportunities={() => fetchOpportunities()} opportunityId={opportunitySelected} closeModal={() => setOpenCreateProposal(false)} />
            </Box>
          </Modal>
          <Modal
            open={openEditAccount}
            onClose={() => setOpenEditAccount(false)}
          >
            <Box sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 600,
              p: 1,
              borderRadius: 2,
              padding: 0,
            }}>
              <EditAccount account={account} closeModal={() => setOpenEditAccount(false)} />
            </Box>
          </Modal>
        </>
      )}
      {loading ? (
        <CircularProgress />
      ) : opportunities.length === 0 ? (
        <Typography variant='body1'>No hay oportunidades disponibles para esta cuenta.</Typography>
      ) : (
        <MaterialReactTable
        columns={columns}
        data={opportunities}
        enableStickyHeader={true}
        localization={MRT_Localization_ES}
        enableBottomToolbar={false}
        enablePagination={false}
        initialState={{
          showGlobalFilter: true
        }}
        positionGlobalFilter="left"
        mrtTheme={{
          baseBackgroundColor: '#ffffff',
        }}
        muiTableContainerProps={{
          sx: {
            height: '68vh',
            '&::-webkit-scrollbar': {
              display: 'none',
            },
          },
        }}
        renderDetailPanel={({ row }) => (
          <Box sx={{ p: 1 }}>
            <Grid container size={12}>
              <Grid size={3}>
                <Chip
                  icon={<AccountBalanceWalletIcon sx={{ fontSize: 18, color: `${theme.palette.secondary.main} !important` }} />}
                  label={<Typography fontWeight={550} variant='body2' color='#secondary'>Cuenta</Typography>}
                  sx={{ padding: 1, justifyContent: 'flex-start' }}
                />
                <Chip
                  icon={<AccountBalanceWalletIcon sx={{ fontSize: 18, color: `${theme.palette.secondary.main} !important` }} />}
                  label={<Typography fontWeight={550} variant='body2' color='#secondary'>{row.original.typology.name}</Typography>}
                  sx={{ padding: 1, justifyContent: 'flex-start', marginTop: 1 }}
                />
              </Grid>
              <Grid size={7.5} sx={{ display: 'flex' }}>
                <Typography variant='body2' paddingRight={1.6} paddingTop={0.5}><strong>Requisitos:</strong></Typography>
                {row.original.requirements?.length > 0 ? (
                  row.original.requirements.map((req, index) => (
                    <Chip key={index} label={req} sx={{ backgroundColor: (theme) => theme.palette.background3.main, marginRight: '0.5rem', marginBottom: '0.5rem', color: 'white' }} />
                  ))
                ) : (
                  <Chip label='No hay requisitos' color='primary' variant='outlined' />
                )}
              </Grid>
              <Grid size={1.5}>
                <Typography variant='body2'><strong>Creado:</strong><br />{new Date(row.original.createdAt).toLocaleString().slice(0, -3)}</Typography>
                <Typography variant='body2'><strong>Actualizado:</strong><br />{new Date(row.original.updatedAt).toLocaleString().slice(0, -3)}</Typography>
              </Grid>
            </Grid>
          </Box>
        )}
      />
      )}
    </>
  );
};

export default AccountDetail;