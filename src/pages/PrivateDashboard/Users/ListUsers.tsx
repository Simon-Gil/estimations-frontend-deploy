import { useMemo, useEffect, useState } from 'react';
import { MaterialReactTable, type MRT_ColumnDef } from 'material-react-table';
import { blockUnblock, getUsers } from '../../../services/users.services';
import { User } from '../../../models/user.model';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import { Box, Button, CircularProgress, Modal, Tooltip, Typography } from '@mui/material';
import CreateUser from './CreateUser';
import EditUser from './EditUser';
import { SnackbarUtilities } from '../../../Utilities/snackbar-manager';
import BlockIcon from '@mui/icons-material/Block';
import { MRT_Localization_ES } from 'material-react-table/locales/es';
import { useHasAccess } from '../../../hooks/useHasAccess';
import GroupIcon from '@mui/icons-material/Group';
import Grid from '@mui/material/Grid2';

const ListUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [openCreateUser, setOpenCreateUser] = useState<boolean>(false);
  const [openEditUser, setOpenEditUser] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const hasCreatePermission = useHasAccess('user', ['create']);
  const hasUpdatePermission = useHasAccess('user', ['update']);
  const hasBlockPermission = useHasAccess('user', ['block']);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const usersData = await getUsers();
      console.log('usersData:', usersData);
      setUsers(usersData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching users:', error);
      setLoading(false);
    }
  };

  const columns = useMemo<MRT_ColumnDef<User>[]>(() => [
    {
      accessorKey: 'name',
      header: 'Nombre',
      size: 80,
    },
    {
      accessorKey: 'lastname',
      header: 'Apellido',
      size: 120,
    },
    {
      accessorKey: 'email',
      header: 'Email',
      size: 250,
    },
    {
      accessorKey: 'department.name',
      header: 'Departamento',
      size: 110,
    },
    {
      accessorKey: 'grade.name',
      header: 'Nivel',
      size: 110,
    },
    {
      accessorKey: 'edit',
      header: 'Editar',
      muiTableHeadCellProps: {
        sx: { display: 'none' }, // Oculta la celda del encabezado para esa columna
      },
      size: 100,
      Cell: ({ row }) => (
        <>
          {hasUpdatePermission && (
            <Tooltip title='Editar Usuario' arrow>
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
          {hasBlockPermission && (
            <Tooltip title='Bloquear Usuario' arrow>
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  blockUnblockUser(row.original.id, row.original.isBlocked);
                }}
              >
                {row.original.isBlocked === true ? (
                  <BlockIcon color='success' />
                ) : (
                  <BlockIcon color='action' />
                )}
              </IconButton>
            </Tooltip>
          )}
        </>
      ),
    },
  ], []);

  const blockUnblockUser = async (userId: string, isBlocked: boolean) => {
    const changeBlock = isBlocked ? false : true;
    try {
      const response = await blockUnblock(userId, changeBlock);
      console.log('response:', response);
      SnackbarUtilities.success('Usuario actualizado correctamente');
      fetchUsers();
    } catch (error) {
      console.error('Error blocking user:', error);
    }
  };

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setOpenEditUser(true);
  };

  return (
    <>
      <Grid container size={12} sx={{marginBottom: 3 }}>
        <Grid size={6} sx={{ display: 'flex', alignItems: 'center'}}>
          <Box width={'35px'} height={'35px'} marginRight={1} display='flex' justifyContent='center' alignItems='center' borderRadius={1.2} sx={{ backgroundColor: 'secondary.main' }}>
            <GroupIcon fontSize="medium" sx={{ color: 'white' }} />
          </Box>
          <Typography variant="h1">Usuarios</Typography>
        </Grid>
        <Grid size={6} justifyContent='flex-end' alignItems='center' display={'flex'}>
          <Button
            variant='contained'
            color='primary'
            onClick={() => setOpenCreateUser(true)}
            sx={{ typography: 'h5', color: 'white' }}
          >
            Crear Usuario
          </Button>
        </Grid>
      </Grid>
      {loading ? (
        <CircularProgress size={30} sx={{ color: '#DA1184' }} />
      ) : (
        <>
          <Modal
            open={openCreateUser}
            onClose={() => setOpenCreateUser(false)}
          >
            <Box sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 600,
              p: 1,
              padding: 0,
            }}>
              <CreateUser closeModal={() => setOpenCreateUser(false)} fetchUsers={fetchUsers} />
            </Box>
          </Modal>
          <Modal
            open={openEditUser}
            onClose={() => setOpenEditUser(false)}
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
              {selectedUser && <EditUser user={selectedUser} closeModal={() => setOpenEditUser(false)} fetchUsers={fetchUsers} />}
            </Box>
          </Modal>
          <MaterialReactTable
            columns={columns}
            data={users}
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
            muiTableBodyRowProps={({ row }) => ({
              sx: {
                color: row.original.isBlocked ? '#red' : 'inherit',
              },
            })}
            muiTableContainerProps={{
              sx: {
                height: '75vh',
                '&::-webkit-scrollbar': {
                  display: 'none',
                },
              },
            }}
          />
        </>
      )}
    </>
  );
};

export default ListUsers;
