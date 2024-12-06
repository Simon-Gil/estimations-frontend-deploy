import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import SettingsIcon from '@mui/icons-material/Settings';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import AssistantIcon from '@mui/icons-material/Assistant';

export const NAVIGATION = [
  {
    segment: 'home',
    title: 'Inicio',
    icon: <DashboardIcon  sx={{ color: '#ffffff' }}/>,
  },
  {
    segment: 'users',
    title: 'Usuarios',
    icon: <GroupIcon  sx={{ color: '#ffffff' }} />,
    permissions: { subjects: ['user'], actions: ['read']},
  },
  {
    segment: 'account',
    title: 'Cuentas',
    icon: <AccountBalanceWalletIcon  sx={{ color: '#ffffff' }}/>,
    permissions: { subjects: ['account'], actions: [] },
  },
  {
    segment: 'opportunities',
    title: 'Oportunidades',
    icon: <LocalActivityIcon  sx={{ color: '#ffffff' }}/>,
    permissions: { subjects: ['opportunity'], actions: [] },
  },
  {
    segment: 'proposals',
    title: 'Propuestas',
    icon: <AssistantIcon  sx={{ color: '#ffffff' }}/>,
    permissions: { subjects: ['proposal'], actions: [] },
  },
  {
    segment: 'config',
    title: 'Configuración',
    icon: <SettingsIcon  sx={{ color: '#ffffff' }}/>,
    permissions: { subjects: ['settings','roles_and_permissions'], actions: [] },
  },
  {
    segment: 'exit',
    title: 'Salir',
    icon: <ExitToAppIcon  sx={{ color: '#ffffff' }}/>,
  },
];

export default NAVIGATION;