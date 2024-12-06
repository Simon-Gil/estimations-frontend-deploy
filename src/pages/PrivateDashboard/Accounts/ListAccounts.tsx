import { useMemo, useEffect, useState } from 'react';
import { MaterialReactTable, type MRT_ColumnDef } from 'material-react-table';
import { getAccounts } from '../../../services/account.services';
import { useNavigate } from 'react-router-dom';
import { Account } from '../../../models/account.model';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import { Box, Button, CircularProgress, Modal, Tooltip, Typography } from '@mui/material';
import CreateAccount from './CreateAccount';
import EditAccount from './EditAccount';
import AddBoxIcon from '@mui/icons-material/AddBox';
import CreateOpportunity from './CreateOpportunity';
import { MRT_Localization_ES } from 'material-react-table/locales/es';
import { useHasAccess } from '../../../hooks/useHasAccess';
import Grid from '@mui/material/Grid2';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

const ListAccounts = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [openCreateAccount, setOpenCreateAccount] = useState<boolean>(false);
  const [openEditAccount, setOpenEditAccount] = useState<boolean>(false);
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
  const [openCreateOpportunity, setOpenCreateOpportunity] = useState<boolean>(false);
  const hasCreateAccountPermission = useHasAccess('account', ['create']);
  const hasUpdatePermission = useHasAccess('account', ['update']);
  const hasCreateOpportunityPermission = useHasAccess('opportunity', ['create']);
  const hasReadOpportunityPermission = useHasAccess('opportunity', ['read']);

  const navigate = useNavigate();

  useEffect(() => {

    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    setLoading(true);
    try {
      const accountsData = await getAccounts();
      setAccounts(accountsData);
      console.log('Accounts:', accountsData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching accounts:', error);
      setLoading(false);
    }
  };

  // Columnas a mostrar de las propiedades del modelo Account
  const columns = useMemo<MRT_ColumnDef<Account>[]>(() => [
    {
      header: 'Cuenta',
      size: 200,
      Cell: ({ row }) =>
        <>
          <Typography variant='body2'>{row.original.name} </Typography>
          <Typography sx={{ fontSize: '12px', color: 'gray' }}>{row.original.email} </Typography>
        </>,
    },
    {
      accessorKey: 'isCustomer',
      header: 'Cliente',
      size: 100,
      Cell: ({ cell }) => (cell.getValue() ? 'Sí' : 'No'),
    },
    {
      accessorKey: 'commercialManager.name',
      header: 'Resp. Comercial',
      Cell: ({ row }) => row.original.commercialManager ? `${row.original.commercialManager.name} ${row.original.commercialManager.lastname}` : 'No asignado',
    },
    {
      accessorKey: 'technicalManager.name',
      header: 'Resp. Técnico',
      Cell: ({ row }) => row.original.technicalManager ? `${row.original.technicalManager.name} ${row.original.technicalManager.lastname}` : 'No asignado',
    },
    {
      accessorKey: 'edit',
      header: 'Acciones',
      muiTableHeadCellProps: {
        sx: { display: 'none' },
      },
      size: 100,
      Cell: ({ row }) => (
        <>
          {hasUpdatePermission && (
            <Tooltip title='Editar Cuenta' arrow>
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  handleEdit(row.original);
                }}
              >
                <EditIcon />
              </IconButton>
            </Tooltip>
          )}
          {hasCreateOpportunityPermission && (
            <Tooltip title='Crear Oportunidad' arrow>
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  handleCreateOpportunityClick(row.original);
                }}
              >
                <AddBoxIcon color='primary' />
              </IconButton>
            </Tooltip>
          )}
        </>
      ),
    },
  ], []);

  const handleCreateOpportunityClick = (account: Account) => {
    console.log('Create opportunity for account:', account);
    console.log('openCreateOpportunity', openCreateOpportunity);

    setSelectedAccount(account);
    setOpenCreateOpportunity(true);
    console.log('openCreateOpportunity', openCreateOpportunity);
  };

  useEffect(() => {
    console.log('openCreateOpportunity after update', openCreateOpportunity);
  }, [openCreateOpportunity]);

  const handleEdit = (account: Account) => {
    setSelectedAccount(account);
    setOpenEditAccount(true);
  };

  const handleDetail = (account: Account) => {
    navigate('/dashboard/account/account-details', { state: { account } });
  };

  return (
    <div>
      <Grid container size={12} sx={{ marginBottom: 3 }}>
        <Grid size={6} sx={{ display: 'flex', alignItems: 'center'}}>
          <Box width={'35px'} height={'35px'} marginRight={1} display='flex' justifyContent='center' alignItems='center' borderRadius={1.2} sx={{ backgroundColor: 'secondary.main' }}>
            <AccountBalanceWalletIcon fontSize="medium" sx={{ color: 'white' }} />
          </Box>
            <Typography variant="h1">Cuentas</Typography>
        </Grid>
        <Grid size={6} justifyContent='flex-end' alignItems='center' display={'flex'}>
          <Button
            variant='contained'
            color='primary'
            onClick={() => setOpenCreateAccount(true)}
            sx={{ typography: 'h5', color: 'white' }}
          >
            Crear Cuenta
          </Button>
        </Grid>
      </Grid>
      {loading ? (
        <CircularProgress size={30} sx={{ color: '#DA1184' }} />
      ) : (
        <>
          <Modal
            open={openCreateAccount}
            onClose={() => setOpenCreateAccount(false)}
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
              <CreateAccount closeModal={() => setOpenCreateAccount(false)} fetchAccounts={fetchAccounts} />
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
              {selectedAccount && <EditAccount account={selectedAccount} closeModal={() => setOpenEditAccount(false)} fetchAccounts={fetchAccounts} />}
            </Box>
          </Modal>
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
              {selectedAccount && <CreateOpportunity account={selectedAccount} closeModal={() => setOpenCreateOpportunity(false)} />}
            </Box>
          </Modal>
          <MaterialReactTable
            columns={columns}
            data={accounts}
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
            muiTableBodyRowProps={({ row }) => ({
              onClick: hasReadOpportunityPermission ? () => handleDetail(row.original) : undefined,
              sx: {
                cursor: hasReadOpportunityPermission ? 'pointer' : 'default',
              }
            })}
          />
        </>
      )}
    </div>
  );
};

export default ListAccounts;
