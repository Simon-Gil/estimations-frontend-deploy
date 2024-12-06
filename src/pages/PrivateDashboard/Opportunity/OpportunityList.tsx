import { useEffect, useState, useMemo } from 'react';
import { changeStatus, deleteOpportunity, getOpportunities } from '../../../services/opportunity.services';
import { Typography, Box, Chip, Modal, Tooltip, IconButton, Select, MenuItem, useTheme, Button } from '@mui/material';
import { Opportunity } from '../../../models/opportunity.models';
import Grid from '@mui/material/Grid2';
import { MaterialReactTable, type MRT_ColumnDef, } from 'material-react-table';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import { MRT_Localization_ES } from 'material-react-table/locales/es';
import TabIcon from '@mui/icons-material/Tab';
import UploadDocument from './UploadDocument';
import CreateProposal from '../Proposals/CreateProposal';
import DeleteIcon from '@mui/icons-material/Delete';
import ConfirmDelete from '../../../Utilities/ConfirmDelete';
import { SnackbarUtilities } from '../../../Utilities/snackbar-manager';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { useHasAccess } from '../../../hooks/useHasAccess';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';

const OpportunityList: React.FC = () => {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [openUploadDocument, setOpenUploadDocument] = useState<boolean>(false);
  const [opportunitySelected, setOpportunitySelected] = useState<string>('');
  const [openCreateProposal, setOpenCreateProposal] = useState<boolean>(false);
  const [openConfirmDelete, setOpenConfirmDelete] = useState<boolean>(false);
  const hasDocumentPermission = useHasAccess('opportunity', ['manageDocument']);
  const hasDeletePermission = useHasAccess('opportunity', ['delete']);
  const hasCreateProposalPermission = useHasAccess('proposal', ['create']);
  const hasUpdateStatusPermission = useHasAccess('opportunity', ['updateStatus']);

  const navigate = useNavigate();
  const theme = useTheme();

  const fetchOpportunities = async () => {
    setLoading(true);
    try {
      const opportunitiesData = await getOpportunities();
      console.log('get opportunities->>>', opportunitiesData);
      setOpportunities(opportunitiesData);
    } catch (error) {
      console.error('Error fetching opportunities:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOpportunities();
  }, []);

  const handleUploadDocument = async (opportunityId: string) => {
    setOpportunitySelected(opportunityId);
    setOpenUploadDocument(true)
  };

  const handleStatusChange = async (opportunityId: string, status: string) => {
    await changeStatus(opportunityId, status);
    fetchOpportunities();
  }

  const handleProposal = async (opportunityId: string) => {
    setOpportunitySelected(opportunityId);
    setOpenCreateProposal(true)
  };

  const handleOpenDelete = async (opportunityId: string) => {
    setOpportunitySelected(opportunityId);
    setOpenConfirmDelete(true);
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      await deleteOpportunity(opportunitySelected);
      SnackbarUtilities.success('Oportunidad eliminada con éxito');
      await fetchOpportunities();
    } catch (error) {
      SnackbarUtilities.error('Error al eliminar la oportunidad');
      console.error('Error deleting opportunity:', error);
    } finally {
      setLoading(false);
      setOpenConfirmDelete(false);
    }
  };

  const confirmDelete = (confirmed: boolean) => {
    if (confirmed) {
      handleDelete();
      setOpenConfirmDelete(false);
    }
  };

  const handleDetail = (proposalId: string) => {
    navigate('/dashboard/proposals/workspace', { state: { proposalId } });
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
        <>
          {hasUpdateStatusPermission ? (
            <Select
              fullWidth
              size='small'
              value={row.original.status}
              onChange={(e) => handleStatusChange(row.original.id, e.target.value)}
              sx={{
                height: 34,
                width: 110,
                borderRadius: 2,
                paddingTop: '4px',
                backgroundColor:
                  row.original.status === 'pending'
                    ? '#E7A900'
                    : row.original.status === 'won'
                      ? '#1F9704'
                      : row.original.status === 'lost'
                        ? '#C2132A'
                        : 'inherit',
                '& .MuiSelect-icon': {
                  color: 'white',
                },
              }}
              MenuProps={{
                PaperProps: {
                  sx: {
                    backgroundColor: 'secondary.main', // Color de fondo del desplegable
                    color: 'white', // Color del texto dentro del menú
                  },
                },
              }}
            >
              <MenuItem value='pending'><Typography variant='body2' color='white'>Pendiente</Typography></MenuItem>
              <MenuItem value='won'><Typography variant='body2' color='white'>Ganado</Typography></MenuItem>
              <MenuItem value='lost'><Typography variant='body2' color='white'>Perdido</Typography></MenuItem>
            </Select>
          ) : (
            <Chip
              label={
                row.original.status === 'pending'
                  ? 'Pendiente'
                  : row.original.status === 'won'
                    ? 'Ganado'
                    : row.original.status === 'lost'
                      ? 'Perdido'
                      : row.original.status
              }
              sx={{
                borderRadius: 2,
                backgroundColor:
                  row.original.status === 'pending'
                    ? '#E7A900'
                    : row.original.status === 'won'
                      ? '#1F9704'
                      : row.original.status === 'lost'
                        ? '#c2132a'
                        : 'inherit',
                color: 'white',
                '& .MuiSelect-icon': {
                  color: 'white',
                },
              }}
            />
          )}
        </>
      ),
    },
    {
      accessorKey: 'proposals',
      header: 'Propuesta',
      size: 450,
      Cell: ({ row }) => (
        <>
          {hasCreateProposalPermission && (
            <Tooltip title='Abrir Propuesta' arrow>
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
          )}
          {row.original.proposals
            ?.sort((a) => (a.status === 'done' ? 1 : -1)) // Ordena para que la propuesta activa vaya primero
            .map((proposal, index) => (
              proposal.techProposal && (
                <Tooltip key={proposal.techProposal} title={proposal.status === 'done' ? 'Propuesta finalizada' : 'Propuesta activa'} arrow>
                  <Chip
                    key={index} // Asegúrate de proporcionar una clave única
                    label={
                      proposal.techProposal.length > 50
                        ? proposal.techProposal.slice(0, 50) + '...'
                        : proposal.techProposal
                    }
                    sx={{
                      marginRight: '5px', marginTop: '5px', marginBottom: '5px', fontSize: '0.75rem', fontWeight: '500', border: 2, borderColor: proposal.status === 'done' ? 'transparent' : 'secondary', // Si está 'done', no tendrá borde
                    }}
                    onClick={(e) => {
                      e.stopPropagation(); // Evita que el evento afecte a elementos padres
                      handleDetail(proposal.id); // Llama a la función con el ID
                    }}
                  />
                </Tooltip>
              )
            ))}
        </>
      ),
    },
    {
      header: 'Actions',
      size: 120,
      muiTableHeadCellProps: {
        sx: { display: 'none' }, // Oculta la celda del encabezado para esa columna
      },
      Cell: ({ row }) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {hasDocumentPermission && (
            <Tooltip title='Documentación' arrow>
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  handleUploadDocument(row.original.id);
                }}
                size='small'
                style={{ padding: 0 }}
              >
                <TabIcon fontSize='medium' />
              </IconButton>
            </Tooltip>
          )}
          {hasDeletePermission && (
            <Tooltip title='Eliminar Oportunidad' arrow>
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  handleOpenDelete(row.original.id);
                }}
                size='small' // Asegura un tamaño uniforme
                style={{ padding: 0 }} // Opcional para minimizar espacio extra
              >
                <DeleteIcon fontSize='medium' />
              </IconButton>
            </Tooltip>
          )}
        </div>
      ),
    },
  ], []);

  return (
    <>
      <Grid container size={12} sx={{ display: 'flex', alignItems: 'center', marginBottom: 3 }}>
          <Box width={'35px'} height={'35px'} marginRight={1} display='flex' justifyContent='center' alignItems='center' borderRadius={1.2} sx={{backgroundColor: 'secondary.main'}}>
            <LocalActivityIcon fontSize="medium" sx={{ color: 'white'}} />
          </Box>
          <Typography variant="h1">Oportunidades</Typography>
      </Grid>
      <>
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
          open={openConfirmDelete}
          onClose={() => setOpenConfirmDelete(false)}
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
            <ConfirmDelete subjectName={'oportunidad'} confirm={confirmDelete} closeModal={() => setOpenConfirmDelete(false)} />
          </Box>
        </Modal>
      </>
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
            height: '75vh',
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
    </>
  );
};

export default OpportunityList;