import { createTheme }from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light', // Modo oscuro
    text: {
      primary: '#060610', // Color de texto principal
      secondary: '#060610', // Color de texto secundario
    },
    primary: {
      main: '#DC1484', // Color principal
    },
    secondary: {
      main: '#1f183b', // Color secundario
    },
    error: {
      main: '#C2132A', // Color para perdido
    },
    warning: {
      main: '#E7A900', // Color para pendiente
    },
    success: {
      main: '#1F9704', // Color para ganado
    },
    background: {
      default: '#f3f3f3', // Fondo principal
      paper: '#f3f3f3', // Fondo de papel
    },
    background2: {
      main: '#1f183b', // Fondo secundario
    },
    background3: {
      main: '#190C3A', // Fondo terciario
    },
  },
  
  typography: {
    // Cargando la fuente DM Sans
    fontFamily: '"DM Sans", sans-serif',  

    allVariants: {
      color: '#060610', // Color de texto para todos los elementos
    },
    h1: {
      fontSize: '1.8rem',  // Título grande
      fontWeight: '700',  // Negrita
    },
    h2: {
      fontSize: '1.5rem',  // Título mediano
      fontWeight: '500', // Peso semi-negrita
    },
    h3: {
      fontSize: '1.3rem',  // Título pequeño
      fontWeight: '600',  // Peso normal
    },
    h4: {
      fontSize: '1.1rem',  // Título extra pequeño
      fontWeight: '600', 
      letterSpacing: '0.1em', 
    },
    h5: {
      fontSize: '0.9rem',  // Título extra pequeño
      fontWeight: '500', 
      letterSpacing: '0.05em', 
    },
    body1: {
      fontSize: '1rem',  // Cuerpo base
      fontWeight: 500,  // Peso normal
    },
    body2: {
      fontSize: '0.875rem',  // Cuerpo pequeño
      fontWeight: 500,  // Peso normal
    },
    subtitle1: {
      fontSize: '1.125rem',  // Subtítulo grande
      fontWeight: 900,  // Semi-negrita
      color: 'white'
    },
    subtitle2: {
      fontSize: '1rem',  // Subtítulo normal
      fontWeight: 300,  // Peso ligero
    },
    
  },
  components: {
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          color: '#060610', // Aquí puedes poner el color que desees para todos los íconos
        },
      },
    },
  },
});

export default theme;