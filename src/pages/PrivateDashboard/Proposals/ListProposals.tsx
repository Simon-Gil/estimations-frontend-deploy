import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createEstimation, getProposals } from '../../../services/estimation.services';
import { MaterialReactTable, MRT_ColumnDef } from 'material-react-table';
import { Box, Button, Chip, IconButton, Modal, Paper, Tooltip, Typography } from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { Proposal } from '../../../models/opportunity.models';
import { MRT_Localization_ES } from 'material-react-table/locales/es';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteProposal } from '../../../services/proposal.services';
import { SnackbarUtilities } from '../../../Utilities/snackbar-manager';
import ConfirmDelete from '../../../Utilities/ConfirmDelete';
import { useHasAccess } from '../../../hooks/useHasAccess';
import Grid from '@mui/material/Grid2';
import AssistantIcon from '@mui/icons-material/Lightbulb';

function ListProposals() {
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [openCreateEstimation, setOpenCreateEstimation] = useState<boolean>(false);
  const [estimationCreated, setEstimationCreated] = useState<string>('');
  const [proposalSelected, setProposalSelected] = useState<string>('');
  const [openConfirmDelete, setOpenConfirmDelete] = useState<boolean>(false);
  const hasDeletePermission = useHasAccess('proposal', ['delete']);
  const hasReadSpecialPermission = useHasAccess('proposal', ['readSpecialFields']);


  const navigate = useNavigate();

  useEffect(() => {
    fetchProposals();
  }, []);

  const fetchProposals = async () => {
    setLoading(true);
    try {
      const proposalsData = await getProposals();
      setProposals(proposalsData);
      console.log('Proposals:', proposalsData);
    } catch (error) {
      console.error('Error fetching estimations:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDelete = async (proposalId: string) => {
    setProposalSelected(proposalId);
    setOpenConfirmDelete(true);
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      await deleteProposal(proposalSelected);
      SnackbarUtilities.success('Oportunidad eliminada con éxito');
      await fetchProposals();
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

  const columns = useMemo<MRT_ColumnDef<Proposal>[]>(() => [
    {
      accessorKey: 'techProposal',
      header: 'Propuesta',
      size: 250,
    },
    {
      accessorKey: 'status',
      header: 'Estado',
      size: 100,
      Cell: ({ row }) => {
        const statusLabel = {
          pending: 'Pendiente',
          ready_for_validation: 'Por validar',
          done: 'Finalizada',
        }[row.original.status] || row.original.status;

        return (
          <Chip
            key={row.original.id}
            label={statusLabel}
            sx={{
              borderRadius: 2,
              backgroundColor:
                row.original.status === 'pending'
                  ? '#E7A900'
                  : row.original.status === 'done'
                    ? '#1F9704'
                    : row.original.status === 'ready_for_validation'
                      ? '#ff5c00'
                      : 'inherit',
              color: 'white',
              '& .MuiSelect-icon': {
                color: 'white',
              },
            }}
          />
        );
      },
    },
    {
      accessorKey: 'total',
      header: 'Costo',
      size: 100,
      Cell: ({ row }) => (
        <>
          {row.original.total ? (
            <Chip
              key={row.original.id}
              label={row.original.total}
            >
            </Chip>
          ) : (
            <Typography variant='body2' color='textSecondary'>
              Sin definir
            </Typography>
          )}
        </>
      ),
    },
    {
      accessorKey: 'estimatedMonths',
      header: 'Plazo',
      size: 100,
      Cell: ({ row }) => (
        <>
          {row.original.estimatedMonths ? (
            <Chip
              key={row.original.id}
              label={row.original.estimatedMonths}
            >
            </Chip>
          ) : (
            <Typography variant='body2' color='textSecondary'>
              Sin definir
            </Typography>
          )}
        </>
      ),
    },
    {
      accessorKey: 'estimation',
      header: 'Estimación',
      size: 100,
      Cell: ({ row }) => (
        row.original.estimation === null ? (
          <Tooltip title='Crear Estimación' arrow>
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                handleCreateEstimation(row.original.id);
              }}
            >
              <AddBoxIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Chip
            key={row.original.estimation.id}
            label={row.original.estimation.status === 'done' ? 'Finalizada'
              : row.original.estimation.status === 'pending' ? 'Pendiente' :
                row.original.estimation.status}
            sx={{
              borderRadius: 2,
              backgroundColor:
                row.original.estimation.status === 'pending'
                  ? '#E7A900'
                  : row.original.estimation.status === 'done'
                    ? '#1F9704'
                    : 'inherit',
              color: 'white',
              '& .MuiSelect-icon': {
                color: 'white',
              },
            }}>
          </Chip>
        )
      ),
    },
    {
      header: 'Actions',
      size: 100,
      muiTableHeadCellProps: {
        sx: { display: 'none' },
      },
      Cell: ({ row }) => (
        <>
          {hasDeletePermission && (
            <Tooltip title='Eliminar Propuesta' arrow>
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  handleOpenDelete(row.original.id);
                }}
                size='small'
                style={{ padding: 0 }}
              >
                <DeleteIcon fontSize='medium' />
              </IconButton>
            </Tooltip>
          )}
        </>
      ),
    },
  ], []);

  const handleDetail = (proposalId: string) => {
    navigate('/dashboard/proposals/workspace', { state: { proposalId } });
  };

  const handleCreateEstimation = async (proposalId: string) => {
    const users: string[] = [];
    await createEstimation(users, proposalId);
    setOpenCreateEstimation(true)
    fetchProposals();
    setEstimationCreated(proposalId);
  };

  return (
    <>
      <Grid container size={12} sx={{ display: 'flex', alignItems: 'center', marginBottom: 3 }}>
        <Box width={'35px'} height={'35px'} marginRight={1} display='flex' justifyContent='center' alignItems='center' borderRadius={1.2} sx={{ backgroundColor: 'secondary.main' }}>
          <AssistantIcon fontSize="medium" sx={{ color: 'white' }} />
        </Box>
        <Typography variant="h1">Propuestas</Typography>
      </Grid>
      <MaterialReactTable
        columns={columns}
        data={proposals}
        enableStickyHeader={true}
        localization={MRT_Localization_ES}
        enableBottomToolbar={false}
        enablePagination={false}
        initialState={{
          showGlobalFilter: true,
          columnVisibility: {
            total: hasReadSpecialPermission,
            estimatedMonths: hasReadSpecialPermission,
          },
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
        muiTableBodyRowProps={({ row }) => ({
          onClick: () => handleDetail(row.original.id),
          sx: {
            cursor: 'pointer',
          },
        })}
      />
      <Modal
        open={openCreateEstimation}
        onClose={() => setOpenCreateEstimation(false)}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 2,
            width: 400,
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            borderRadius: 2,
          }}
        >
          <Typography variant='h5' marginBottom={1} textAlign={'center'}>Estimación Creada</Typography>
          <Typography variant='h6' textAlign={'center'}>¿Quieres ir a la Estimación?</Typography>
          <Button
            sx={{ marginTop: 2 }}
            variant='contained'
            color='primary'
            onClick={() => {
              navigate('/dashboard/estimations/workspace', { state: { estimationId: estimationCreated } });
            }}
            fullWidth
          >
            Abrir
          </Button>
        </Paper>
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
          <ConfirmDelete subjectName={'propuesta'} confirm={confirmDelete} closeModal={() => setOpenConfirmDelete(false)} />
        </Box>
      </Modal>
    </>
  );
};
export default ListProposals