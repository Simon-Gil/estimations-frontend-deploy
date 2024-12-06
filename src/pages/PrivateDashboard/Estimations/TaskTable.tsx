import { MaterialReactTable } from 'material-react-table';
import { Profile, Task } from '../../../models/estimation.model';
import { useEffect, useMemo, useState } from 'react';
import ProfileEstimationCell from './ProfileEstimationCell';
import { IconButton, Tooltip, Box } from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { addProfile, deleteTaskByID, getTaskDetail, patchTaskStatus } from '../../../services/estimation.services';
import { SnackbarUtilities } from '../../../Utilities/snackbar-manager';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { useSelector } from 'react-redux';
import { AppStore } from '../../../Redux/store';
import DeleteIcon from '@mui/icons-material/Delete';


interface TaskTableProps {
    tasks: Task[];
    profiles: Profile[];
    updateTasks: () => void;
}

const TaskTable: React.FC<TaskTableProps> = ({ tasks, profiles, updateTasks }) => {
    const [taskData, setTaskData] = useState(tasks);
    const deleteState = useSelector((store: AppStore) => store.delete);

    useEffect(() => {
    }, [deleteState.delete]);

    const refreshTaskData = async (taskId: string) => {
        try {
            const updatedTask = await getTaskDetail(taskId);
            console.log('Updated Task: ', updatedTask);
            console.log(updatedTask);
            setTaskData((prevTasks) =>
                prevTasks.map((task) => (task.id === taskId ? updatedTask : task))
            );
        } catch (error) {
            console.error('Error fetching task details:', error);
        }
    };

    const addProfileToTask = async (taskId: string, profileId: string) => {
        try {
            const response = await addProfile(taskId, profileId);
            SnackbarUtilities.success('Perfil ' + response.profile.name + ' agregado correctamente');
            refreshTaskData(taskId);  // Actualizar datos de la tarea después de agregar un perfil
        } catch (error) {
            console.error('Error adding profile:', error);
        }
    };

    const updateTaskStatus = async (taskId: string, status: string) => {
        try {
            const response = await patchTaskStatus(taskId, status);
            if (response.status === "done") {
                SnackbarUtilities.success('Tarea bloqueada correctamente');
            } else {
                SnackbarUtilities.success('Tarea desbloqueada correctamente');
            }
            refreshTaskData(taskId);
        } catch (error) {
            console.error('Error updating task status:', error);
        }
    };

    const deleteTask = async (taskId: string) => {
        try {
            await deleteTaskByID(taskId);
            SnackbarUtilities.success('Tarea eliminada correctamente');
            updateTasks();
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    }

    const columns = useMemo(() => [
        {
            header: 'Block/Unblock',
            muiTableBodyCellProps: { sx: { minWidth: '16px', maxWidth: '16px' } },
            Cell: ({ row }: { row: { original: Task } }) => {
                const task = row.original;

                const tasksFinish = task.hrsTaskProfiles?.every((taskProfile: { status: string }) => taskProfile.status !== "pending");

                if (deleteState.delete === true) {
                    return (
                        <Tooltip title="Eliminar tarea">
                            <IconButton onClick={() => deleteTask(task.id)} sx={{ padding: 0 }}>
                                <DeleteIcon style={{ fontSize: 16, opacity: 1 }} />
                            </IconButton>
                        </Tooltip>
                    );
                }

                if (task.status === "done" && !deleteState.delete) {
                    return (
                        <Tooltip title="Desbloquear tarea">
                            <IconButton onClick={() => updateTaskStatus(task.id, "pending")} style={{ display: 'flex', justifyContent: 'flex-start', padding: 0, margin: 0 }}>
                                <LockIcon style={{ fontSize: 16, opacity: 1 }} />
                            </IconButton>
                        </Tooltip>
                    );
                }

                if (tasksFinish && !deleteState.delete) {
                    return (
                        <Tooltip title="Bloquear tarea">
                            <IconButton onClick={() => updateTaskStatus(task.id, "done")} style={{ display: 'flex', justifyContent: 'flex-start', padding: 0, margin: 0 }}>
                                <LockOpenIcon style={{ fontSize: 16, opacity: 1 }} />
                            </IconButton>
                        </Tooltip>
                    );
                }

                return (
                    <Tooltip title="No puedes cerrar una tarea que no esté finalizada">
                        <IconButton style={{ display: 'flex', justifyContent: 'flex-start', padding: 0, margin: 0 }}>
                            <LockOpenIcon style={{ fontSize: 16, opacity: 0.3 }} />
                        </IconButton>
                    </Tooltip>
                );

            }
        },
        {
            accessorKey: 'description',
            header: 'Task Description',
            muiTableBodyCellProps: { sx: { minWidth: '200px', maxWidth: '200px', lineHeight: 1 } },
        },
        ...profiles.map((profile) => ({
            accessorKey: profile.name,
            header: profile.name,
            muiTableBodyCellProps: { sx: { minWidth: '120px', maxWidth: '120px' } },
            Cell: ({ row }: { row: { original: Task } }) => {
                const task = row.original;
                const profileMatch = task.hrsTaskProfiles?.find(
                    (taskProfile: { profile: { name: string } }) => taskProfile.profile.name === profile.name
                );
                return (
                    profileMatch ? (
                        <ProfileEstimationCell
                            profileMatch={profileMatch}
                            taskStatus={task.status}
                            taskId={task.id}
                            onUpdateHMin={(value) => profileMatch.hMin = value}
                            onUpdateHMax={(value) => profileMatch.hMax = value}
                            refreshTaskData={() => refreshTaskData(task.id)}
                        />
                    ) : (
                        <span style={{ width: '100%', display: 'inline-block', textAlign: 'center', justifyContent: 'space-between' }}>
                            <Tooltip title="Agregar Perfil a la Tarea">
                                <IconButton sx={{ padding: 0, opacity: '30%' }} onClick={() => addProfileToTask(task.id, profile.id)} >
                                    <AddBoxIcon style={{ fontSize: 22 }} />
                                </IconButton>
                            </Tooltip>
                        </span>
                    )
                );
            },
        })),
    ], [deleteState.delete]);

    if (!taskData || taskData.length === 0) {
        return (
            <Box sx={{ marginLeft: '18px', fontStyle: 'italic', color: 'gray', width: '800px', textAlign: 'left' }}>No hay tareas disponibles</Box>
        );
    }

    return (
        <MaterialReactTable
            columns={columns}
            data={taskData}
            enableTopToolbar={false}
            enableTableHead={false}
            enableBottomToolbar={false}
            muiTableContainerProps={{
                sx: {
                    boxShadow: 'none',
                    overflow: 'hidden',
                    '& .MuiTableCell-root': {
                        borderBottom: '1px solid #DC1484',
                        borderColor: '#DC1484',
                    },
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        bottom: 0,
                        width: '4px',
                        background: 'linear-gradient(to bottom, #060610, #DC1484, #DC1484)',
                        zIndex: 1,
                    },
                },
            }}
        />
    );
};

export default TaskTable;