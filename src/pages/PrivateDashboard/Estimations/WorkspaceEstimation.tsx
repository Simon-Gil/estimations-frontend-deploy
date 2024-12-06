import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { MaterialReactTable } from 'material-react-table';
import { Category, Estimation, Profile, SecondLevelCategory, Task, TaskWithSLC } from '../../../models/estimation.model';
import { deleteUserOnEstimation, getCategories, getDetail, getExcel, getProfiles, notifyUserEstimation, } from '../../../services/estimation.services';
import { Box, Button, Tooltip, Chip, IconButton, Modal, Paper, ToggleButton, ToggleButtonGroup, Typography, Popover } from '@mui/material';
import { completeEstimation, getPDF, getProposal } from '../../../services/proposal.services';
import CreateTask from './CreateTask';
import TaskTable from './TaskTable';
import Grid from '@mui/material/Grid2';
import { useSelector } from 'react-redux';
import { AppStore } from '../../../Redux/store';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EuroIcon from '@mui/icons-material/Euro';
import { SnackbarUtilities } from '../../../Utilities/snackbar-manager';
import { Account } from '../../../models/account.model';
import { LoadUserEstimations } from '../../../models/user.model';
import { Proposal } from '../../../models/opportunity.models';
import { getDepartments, getFilteredUsers } from '../../../services/users.services';
import HeaderWorkspace from './HeaderWorkspace';
import { changeMode } from '../../../Redux/states/mode';
import { useDispatch } from 'react-redux';
import AddUsers from '../Accounts/AddUsers';
import excelIcon from '../../../assets/img/excelIcon.png'
import pdfIcon from '../../../assets/img/pdfIcon.png'
import AddIcon from '@mui/icons-material/Add';
import WorkIcon from '@mui/icons-material/Work';
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions';
import theme from '../../../Themes/theme';
import { getAccount } from '../../../services/account.services';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import FinishProposal from '../Proposals/FinishProposal';
import DeleteIcon from '@mui/icons-material/Delete';
import { changeDelete } from '../../../Redux/states/delete';
import CancelIcon from '@mui/icons-material/Cancel';
import { Manager } from '../../../models/account.model';
import { useHasAccess } from '../../../hooks/useHasAccess';
import AssistantIcon from '@mui/icons-material/Assistant';

const WorkspaceEstimation: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const { proposalId: urlProposalId } = useParams<{ proposalId: string }>();
    const stateProposalId = location.state?.proposalId;
    const proposalId = stateProposalId || urlProposalId;
    const [proposal, setProposal] = useState<Proposal>();
    const [estimationId, setEstimationId] = useState<string>('');
    const [estimation, setEstimation] = useState<Estimation>();
    const [tableData, setTableData] = useState<Category[]>([]);
    const [profiles, setProfiles] = useState<Profile[]>([]);
    const [openCreateTask, setOpenCreateTask] = useState<boolean>(false);
    const [slcActive, setSlcActive] = useState<SecondLevelCategory>();
    const [tasks, setTasks] = useState<TaskWithSLC[]>();
    const user = useSelector((store: AppStore) => store.user);
    const [users, setUsers] = useState<LoadUserEstimations[]>([]);
    const [usersAssociated, setUsersAssociated] = useState<LoadUserEstimations[]>([]);
    const [openAddUsers, setOpenAddUsers] = useState(false);
    const [openProposal, setOpenProposal] = useState(false);
    const [commercialManager, setCommercialManager] = useState<Manager>();
    const [technicalManager, setTechnicalManager] = useState<Manager>();
    const [account, setAccount] = useState<Account>();
    const [popoverState, setPopoverState] = useState<{ anchorEl: HTMLElement | null; id: string | null }>({ anchorEl: null, id: null });
    const hasUpdateSpecialFields = useHasAccess('proposal', ['updateSpecialFields']);
    const mode = useSelector((store: AppStore) => store.mode);
    const deleteState = useSelector((store: AppStore) => store.delete);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (deleteState.delete) {
            dispatch(changeDelete(false));
        }
        fetchDepartments();
        fetchProfiles();
        fetchCategories();
        fetchProposal();
    }, []);

    const fetchProposal = async () => {
        try {
            const response = await getProposal(proposalId);
            setProposal(response);
            setEstimationId(response.estimation.id);
            fetchDetail(response.estimation.id);
            fetchAccount();
        } catch (error) {
            console.log('Error fetching proposal:', error);
        }
    }

    const fetchAccount = async () => {
        try {
            const response = await getAccount(proposalId);
            setAccount(response);
        } catch (error) {
            console.error('Error fetching account:', error);
        }
    }

    const fetchProfiles = async () => {
        try {
            setLoading(true);
            const profilesData = await getProfiles();
            setProfiles(profilesData);
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    }

    const fetchCategories = async () => {
        try {
            setLoading(true);
            const categoriesData = await getCategories();
            console.log('categoriesData:', categoriesData);
            setTableData(categoriesData);
        } catch (error) {
            console.error('Error fetching categories:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchDetail = async (id: string) => {
        setLoading(true);
        try {
            const estimationData = await getDetail(id);
            setCommercialManager(estimationData.opportunity.commercialManager);
            setTechnicalManager(estimationData.opportunity.technicalManager);
            setEstimation(estimationData);
            setUsersAssociated(estimationData.users);
            const newTasks: TaskWithSLC[] = [];
            console.log('estimationData:', estimationData);
            estimationData.firstLevelCategories.forEach((catlevel1: Category) => {
                catlevel1.secondLevelCategories.forEach((catlevel2: SecondLevelCategory) => {
                    const slc = catlevel2.name;
                    catlevel2.tasks.forEach((task: Task) => {
                        newTasks.push({ slc: slc, task: task });
                    });
                });
            });
            setTasks(newTasks);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        } finally {
            setLoading(false);
        }
    };

    const updateTasks = async () => {
        try {
            const estimationData = await getDetail(estimationId);
            const newTasks: TaskWithSLC[] = [];
            estimationData.firstLevelCategories.forEach((catlevel1: Category) => {
                catlevel1.secondLevelCategories.forEach((catlevel2: SecondLevelCategory) => {
                    const slc = catlevel2.name;
                    catlevel2.tasks.forEach((task: Task) => {
                        newTasks.push({ slc: slc, task: task });
                    });
                });
            });
            setTasks(newTasks);
            console.log('New Tasks:', newTasks);

        } catch (error) {
            console.error('Error adding task:', error);
        }
    }

    const getFunctional = async () => {
        try {
            const blob = await getPDF(proposalId);
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'document.pdf'; // Nombre del archivo
            link.click();
            URL.revokeObjectURL(url);
            SnackbarUtilities.success(`Descargando PDF`);
        } catch (error) {
            SnackbarUtilities.error(`Error al descargar PDF`);
            console.error('Error creating proposal:', error);
        }
    }

    const accountDetail = (account: Account) => {
        navigate('/dashboard/account/account-details', { state: { account } });
    };

    const columns = [
        {
            accessorKey: 'categoriaNivel1',
            header: '',
            muiTableBodyCellProps: {
                sx: {
                    minWidth: '80px',
                    maxWidth: '80px',
                },
            },
            Cell: ({ row }: { row: { original: Category } }) => {
                return (
                    <Typography color='#DC1484' variant='body2'>{row.original.name}</Typography>
                );
            },
        },
        {
            accessorKey: 'subcategoriasNivel2',
            header: 'Categorías de Nivel 2',
            Cell: ({ row }: { row: { original: Category } }) => {
                const subcategories = row.original.secondLevelCategories;
                return (
                    <MaterialReactTable
                        key={tasks?.length}
                        columns={columns2}
                        data={subcategories}
                        enableTopToolbar={false}
                        enableTableHead={false}
                        enableBottomToolbar={false}
                        muiTableContainerProps={{
                            sx: {
                                boxShadow: 'none',
                                '& .MuiTableCell-root': {
                                    borderBottom: '0px solid #ccc', // Establece un borde más grueso para las celdas
                                },
                            },
                            className: 'no-striped-table', // Aquí no aplicamos la clase 'striped-table' a la tabla interna
                        }}
                    />
                );
            },
        },
    ];

    const columns2 = [
        {
            accessorKey: 'categoriaNivel2',
            header: 'Categoría Nivel 2',
            muiTableBodyCellProps: {
                sx: {
                    minWidth: '95px',
                    maxWidth: '95px',
                },
            },
            Cell: ({ row }: {
                row: { original: SecondLevelCategory }
            }) => {
                return (
                    <div
                        style={{ position: 'relative', cursor: 'pointer' }}
                        onClick={() => {
                            const { name, id } = row.original;
                            setSlcActive({ name: name, id: id, tasks: [] });
                            setOpenCreateTask(true);
                        }}
                        onMouseEnter={(e) => e.currentTarget.classList.add('hover')}
                        onMouseLeave={(e) => e.currentTarget.classList.remove('hover')}
                    >
                        <Tooltip title={`Agregar Tarea de ${row.original.name}`} arrow>
                            <Typography color='#060610' className='cellText' variant='body2'>{row.original.name}</Typography>
                        </Tooltip>
                    </div>
                );
            },
        },
        {
            header: 'Tareas',
            Cell: ({ row }: {
                row: { original: SecondLevelCategory }
            }) => {
                const categoryName = row.original.name;
                const filteredTasks = tasks?.filter(task => task.slc === categoryName) || [];

                return (
                    <TaskTable tasks={filteredTasks.map(task => task.task)} profiles={profiles} updateTasks={updateTasks} />
                );
            },

        },
    ];

    const downloadExcel = async (estimationId: string) => {
        setLoading(true);
        try {
            const response = await getExcel(estimationId);

            const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }));

            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'estimacion.xlsx');
            document.body.appendChild(link);
            link.click();

            link.remove();
            window.URL.revokeObjectURL(url);

        } catch (error) {
            console.error('Error al descargar el Excel:', error);
        } finally {
            setLoading(false);
        }
    };

    const changeDeleteMode = () => {
        dispatch(changeDelete(!deleteState.delete));
    }

    const handleModeChange = (event: React.MouseEvent<HTMLElement>, newValue: string | null) => {
        if (newValue != null) {
            dispatch(changeMode(newValue));
        }
    };

    const fetchDepartments = async (): Promise<void> => {
        setLoading(true);
        try {
            const departments = await getDepartments();
            const softwareDept: { id: string; name: string } | undefined = departments.find((dept: { id: string; name: string }) => dept.name === 'Software');

            if (!softwareDept) {
                return console.error('Department Software not found');
            }

            const users = await getFilteredUsers(softwareDept.id);
            setUsers(users);

        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    const deleteUser = async (userId: string) => {
        setLoading(true);
        try {
            await deleteUserOnEstimation(estimationId, userId);
            SnackbarUtilities.success('Usuario eliminado con éxito');
            fetchDetail(estimationId);
            setLoading(false);
        } catch (error) {
            console.error('Error deleting user:', error);
            setLoading(false);
        }
    }

    const notifyFinish = async () => {
        setLoading(true);
        try {
            await notifyUserEstimation(estimationId);
            SnackbarUtilities.success('Finalizada con éxito');
            setLoading(false);
        } catch (error) {
            console.error('Error finalizing estimation:', error);
            setLoading(false);
        }
    }

    const handlePopOver = (event: React.MouseEvent<HTMLElement>, id: string) => {
        if (popoverState.anchorEl && popoverState.id === id) {
            // Si el Popover está abierto y corresponde al mismo ID, ciérralo
            setPopoverState({ anchorEl: null, id: null });
        } else {
            // Si no, ábrelo con el nuevo anclaje e ID
            setPopoverState({ anchorEl: event.currentTarget, id });
        }
    };

    const isOpen = (id: string): boolean => popoverState.anchorEl !== null && popoverState.id === id;

    const handleCompleteEstimation = async () => {
        setLoading(true);
        try {
            await completeEstimation(estimationId);
            SnackbarUtilities.success('Estimación finalizada');
            setLoading(false);
        } catch (error) {
            console.error('Error finalizing estimation:', error);
            setLoading(false);
        }
    }

    const openProposalModal = async () => {
        if (openProposal === false) {
            setOpenProposal(true);
        } else {
            setOpenProposal(false);
        }
    }

    return (
        <div>
            <Grid container size={12} sx={{ width: '100% !important', marginTop: '-15px', marginBottom: '15px' }} >
                <Grid container size={10} alignItems='center' sx={{ height: '40px' }}>
                    <Paper onClick={(e) => handlePopOver(e, 'account')} sx={{ height: '100%', backgroundColor: '#f5f5f5', padding: 2, borderRadius: 1, width: '30%', marginRight: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                        <Grid container size={12} justifyContent='space-between' alignItems='center'>
                            <Grid size={2}>
                                <AccountBalanceWalletIcon sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }} />
                            </Grid>
                            <Grid size={10}>
                                <Typography variant='body2' sx={{ lineHeight: 1.2 }}>{account?.name}</Typography>
                            </Grid>
                        </Grid>
                        <Popover
                            open={isOpen('account')}
                            anchorEl={popoverState.anchorEl}
                            onClose={() => setPopoverState({ anchorEl: null, id: null })}
                            disableRestoreFocus={true}
                            sx={{ marginTop: 7, }}
                        >
                            <Typography variant='body2' sx={{ maxWidth: '400px', lineHeight: 1.4, padding: 2 }}>
                                <strong>Correo: </strong>{account?.email}<br />
                                <strong>Precios por perfil:</strong>
                                {account?.priceConfig?.profilePrices && account.priceConfig.profilePrices.length > 0 ? (
                                    <ul>
                                        {account.priceConfig.profilePrices.map((profilePrice) => (
                                            <li key={profilePrice.profile.name}>
                                                {profilePrice.profile.name}: {profilePrice.priceH}€
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <span>No hay precios configurados para los perfiles.</span>
                                )}
                                <Button fullWidth variant='contained'
                                    onClick={() => account && accountDetail(account)}
                                >Ir a Cuenta</Button>
                            </Typography>
                        </Popover>
                    </Paper>
                    <Paper onClick={(e) => handlePopOver(e, 'proposal')} sx={{ height: '100%', backgroundColor: '#f5f5f5', padding: 2, borderRadius: 1, width: '33%', marginRight: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                        <Grid container size={12} justifyContent='space-between' alignItems='center'>
                            <Grid size={1}>
                                <AssistantIcon sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }} />
                            </Grid>
                            <Grid size={11}>
                                <Typography variant='body2' sx={{ lineHeight: 1.2 }}>
                                    {proposal?.techProposal && proposal.techProposal.length > 32
                                        ? `${proposal.techProposal.slice(0, 32)}...`
                                        : proposal?.techProposal}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Paper >
                    <Popover
                        open={isOpen('proposal')}
                        anchorEl={popoverState.anchorEl}
                        onClose={() => setPopoverState({ anchorEl: null, id: null })}
                        disableRestoreFocus={true}
                        sx={{ marginTop: 7, }}
                    >
                        <Typography variant='body2' sx={{ maxWidth: '400px', lineHeight: 1.4, padding: 2 }}>
                            <strong>{proposal?.techProposal}</strong><br />
                            <strong>Estado: </strong>{proposal?.status}<br />
                            <strong>Presupuesto: </strong>{proposal?.total && proposal.total !== 0 ? proposal.total : 'Por definir'}<br />
                            <strong>Contexto y Objetivo: </strong>{proposal?.estimatedMonths ? proposal.estimatedMonths : 'Por definir'}<br />
                            <strong>Contexto y Objetivo: </strong>{proposal?.goalAndContext}
                        </Typography>
                    </Popover>
                    {
                        estimation?.minCost !== undefined && estimation?.minCost !== null && estimation?.minCost !== 0 && (
                            <>
                                <Paper sx={{ height: '100%', backgroundColor: '#f5f5f5', padding: 0.5, borderRadius: 1, width: '30%', marginRight: 1 }}>
                                    <Grid container size={12}>
                                        <Grid container size={9} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <Grid size={6}>
                                                <Typography variant='body2' color='#7d7d7d' sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                    {mode.value === 'time' ? (<>Min {estimation?.hMin} h</>) : (<>Min {estimation?.minCost}€</>)}
                                                </Typography>
                                            </Grid>
                                            <Grid size={6}>
                                                <Typography variant='body2'>
                                                    {mode.value === 'time' ? (<>Max {estimation?.hMax} h</>) : (<>Max {estimation?.maxCost}€</>)}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                        <Grid size={3} alignSelf={'center'}>
                                            <ToggleButtonGroup
                                                size='medium'
                                                value={mode.value}
                                                exclusive
                                                onChange={handleModeChange}
                                            >
                                                <Tooltip title='Estimación en Horas' arrow>
                                                    <ToggleButton
                                                        value='time'
                                                        sx={{ padding: 0.5, borderRadius: 1, }}
                                                    >
                                                        <AccessTimeIcon sx={{ fontSize: '20px' }} />
                                                    </ToggleButton>
                                                </Tooltip>

                                                <Tooltip title='Estimación en Euros' arrow>
                                                    <ToggleButton
                                                        value='money'
                                                        sx={{ padding: 0.5, borderRadius: 1, }}
                                                    >
                                                        <EuroIcon sx={{ fontSize: '20px' }} />
                                                    </ToggleButton>
                                                </Tooltip>
                                            </ToggleButtonGroup>
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </>
                        )
                    }
                </Grid >
                <Grid size={2} justifyContent='flex-end' alignItems='center' display={'flex'}>
                    {user.email === technicalManager?.email && (
                        <Button
                            sx={{ height: '35px' }}
                            size='small'
                            variant='contained'
                            color='primary'
                            onClick={() => {
                                handleCompleteEstimation();
                            }}
                        >
                            Finalizar
                        </Button>
                    )}
                    {estimation?.status === 'done' && hasUpdateSpecialFields && (
                        <Button
                            //margin-left: 5px por si existieste el caso de que el technicalManger tenga updateSpecialFields y le salgan ambos botones
                            sx={{ height: '35px', marginLeft: '5px' }}
                            size='small'
                            variant='contained'
                            color='primary'
                            onClick={() => { openProposalModal() }}
                        >
                            Propuesta
                        </Button>
                    )
                    }
                    {(user.email !== technicalManager?.email && user.email !== commercialManager?.email && usersAssociated.some(u => u.email === user.email)) && (
                        <Button
                            sx={{ height: '35px' }}
                            size='small'
                            variant='contained'
                            color='primary'
                            onClick={() => { notifyFinish() }}
                        >
                            Finalizar
                        </Button>
                    )}

                </Grid>
            </Grid >
            <Paper >
                <HeaderWorkspace />
                <MaterialReactTable
                    columns={columns}
                    data={tableData}
                    enableTopToolbar={false}
                    enableTableHead={false}
                    enableSorting={false}
                    enableColumnActions={false}
                    enableBottomToolbar={false}
                    muiTablePaperProps={{
                        elevation: 0,
                        sx: {
                            borderTopLeftRadius: 0,
                            borderTopRightRadius: 0,
                            boxShadow: 'none',
                        },
                    }}
                    muiTableContainerProps={{
                        sx: {
                            height: '595px',
                            width: '100%',
                            boxShadow: 'none',
                            '& .MuiTableRow-root:hover': {
                                backgroundColor: 'none',
                            },
                            '& .MuiTableCell-root': {
                                borderColor: '#40190E',
                            },
                            '& hover': {
                                borderColor: '#40190E',
                                backgroundColor: 'none !important',
                            },
                        },
                        className: 'estimation-table',
                    }}
                />
            </Paper>
            <Grid container size={12} sx={{ marginTop: '15px' }}>
                <Grid size={10.8}>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        <Tooltip title='Responsable Comercial'>
                            <Chip icon={<WorkIcon sx={{ fontSize: 18, paddingLeft: 0.5 }} />}
                                label={`${commercialManager?.name} ${commercialManager?.lastname}`}
                                color="secondary"
                            />
                        </Tooltip>
                        <Tooltip title='Responsable Comercial'>
                            <Chip icon={<IntegrationInstructionsIcon sx={{ fontSize: 18, paddingLeft: 0.5 }} />}
                                label={`${technicalManager?.name} ${technicalManager?.lastname}`}
                                color="secondary"
                            />
                        </Tooltip>
                        {usersAssociated && usersAssociated.length > 0 && (
                            usersAssociated.map((user, index) => {
                                // Determinar si el usuario es eliminable
                                const isDeletable = deleteState.delete;

                                return (
                                    <Tooltip
                                        key={index}
                                        title={isDeletable ? 'Eliminar usuario' : ''}
                                        arrow
                                    >
                                        <Chip
                                            label={`${user.name} ${user.lastname}`}
                                            color={isDeletable ? 'error' : 'secondary'}
                                            onClick={isDeletable ? () => deleteUser(user.id) : undefined}
                                            deleteIcon={isDeletable ? <CancelIcon /> : undefined}
                                            onDelete={isDeletable ? () => deleteUser(user.id) : undefined}
                                        />
                                    </Tooltip>
                                );
                            })
                        )}
                        {!deleteState.delete && (
                            <Tooltip title='Agregar Usuarios'>
                                <IconButton sx={{
                                    height: '100%',
                                    backgroundColor: 'primary.main',
                                    color: 'white',
                                    '&:hover': {
                                        backgroundColor: 'secondary.main'
                                    },
                                }} onClick={() => setOpenAddUsers(true)}>
                                    <AddIcon sx={{ color: 'white', fontSize: '16px' }} />
                                </IconButton>
                            </Tooltip>
                        )}
                    </Box>
                </Grid>

                <Grid size={1.2}>
                    <Grid container size={12} justifyContent='flex-end'>
                        {proposal?.status === 'done' && (
                            <Grid size={4} display='flex' justifyContent='flex-end' sx={{ cursor: 'pointer' }}>
                                <Tooltip title='Descargar Propuesta' arrow>
                                    <Box onClick={() => getFunctional()}
                                        sx={{ backgroundColor: theme.palette.secondary.main, height: 32, width: 32, borderRadius: 1, paddingTop: '5px' }}>
                                        <img src={pdfIcon} alt='Excel Icon' height={20} />
                                    </Box>
                                </Tooltip>
                            </Grid>
                        )}
                        <Grid size={4} display='flex' justifyContent='flex-end' sx={{ cursor: 'pointer' }}>
                            <Tooltip title='Descargar Excel' arrow>
                                <Box onClick={() => downloadExcel(estimationId)}
                                    sx={{ backgroundColor: theme.palette.success.main, height: 32, width: 32, borderRadius: 1, paddingTop: '5px' }}>
                                    <img src={excelIcon} alt='Excel Icon' height={20} />
                                </Box>
                            </Tooltip>
                        </Grid>
                        <Grid size={4} display='flex' justifyContent='flex-end' sx={{ cursor: 'pointer' }}>
                            <Tooltip title='Seleccionar elementos a eliminar' arrow>
                                <Box onClick={() => changeDeleteMode()}
                                    sx={{ backgroundColor: theme.palette.error.main, height: 32, width: 32, borderRadius: 1, paddingTop: '4px' }}>
                                    <DeleteIcon fontSize='medium' sx={{ color: 'white' }} />
                                </Box>
                            </Tooltip>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Modal
                open={openCreateTask}
                onClose={() => setOpenCreateTask(false)}
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
                    {slcActive && (
                        <CreateTask updateTasks={updateTasks} estimationId={estimationId} closeModal={() => setOpenCreateTask(false)} slc={slcActive} profiles={profiles} />
                    )}
                </Box>
            </Modal>
            <Modal
                open={openAddUsers}
                onClose={() => setOpenAddUsers(false)}
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
                    <AddUsers fetchDetail={() => fetchDetail(estimationId)} estimationId={estimationId} usersAssociated={usersAssociated} users={users} closeModal={() => setOpenAddUsers(false)} />
                </Box>
            </Modal>
            <Modal
                open={openProposal}
                onClose={() => setOpenProposal(false)}
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
                    {proposal && (
                        <FinishProposal min={estimation?.minCost} max={estimation?.maxCost} proposal={proposal} closeModal={() => setOpenProposal(false)} fetchProposal={fetchProposal} />
                    )}
                </Box>
            </Modal>

        </div >
    );
};

export default WorkspaceEstimation;
