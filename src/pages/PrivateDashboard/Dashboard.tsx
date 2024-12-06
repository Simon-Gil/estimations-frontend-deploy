import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar } from '@mui/material';
import { useSelector } from 'react-redux';
import { AppStore } from '../../Redux/store';
import NAVIGATION from '../../Config/navigation.config';
import logoBlanco from '../../assets/img/logoBlanco.png';
import { useEffect } from 'react';
import { removeToken }  from '../../Helpers/tokenHelpers';
import { useHasAccess } from '../../hooks/useHasAccess';

const DashboardLayoutWithRoutes = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userPermissions = useSelector((store: AppStore) => store.user.permissions);

  const handleNavigate = (path: string) => {
    console.log('path', path);
    if (path === 'exit') {
      removeToken();
    }
    navigate(path, { replace: false });
  };

  useEffect(() => {
    console.log('navigation', NAVIGATION);
    console.log('userPermissions', userPermissions);
  }, []);

  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer
        sx={{
          width: 220,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            maxWidth: 230,
            backgroundColor: (theme) => theme.palette.background2.main,
          },
          
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar sx={{ justifyContent: "center" }}>
          <img src={logoBlanco} alt="Logo" style={{ width: "80%" }} />
        </Toolbar>
        <img src="Logo" alt="" />
        <List>
          {NAVIGATION.filter((item) => {
            if (!item.permissions) {
              return true;
            }
            const { subjects, actions } = item.permissions;

            if (Array.isArray(subjects)) {
              return subjects.some(subject => useHasAccess(subject, actions));
            }

            return useHasAccess(subjects, actions);
          }).map((item) => {
            const isActive = location.pathname.includes(item.segment);
            return (
              <Box key={item.segment}>
                <ListItem disablePadding>
                  <ListItemButton
                    selected={isActive} // Aplicar estado seleccionado
                    sx={{
                      borderLeft: isActive ? '4px solid #DC1484' : '4px solid transparent',
                      bgcolor: isActive ? 'action.selected' : 'transparent',
                    }}
                    onClick={() => handleNavigate(item.segment)}
                  >
                    <ListItemIcon sx={{ minWidth: 'auto' }}>
                      <Box sx={{ width: '42px', color: isActive ? 'secondary.main' : 'primary.main' }}>
                        {item.icon}
                      </Box>
                    </ListItemIcon>
                    <ListItemText
                      primary={item.title}
                      primaryTypographyProps={{
                        color: isActive ? '#FF29A1' : 'white', // Cambia el color del texto principal
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              </Box>
            );
          })}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 4, paddingTop: 5 }}>
        <Outlet />
      </Box>
    </Box>
  );
}

export default DashboardLayoutWithRoutes;