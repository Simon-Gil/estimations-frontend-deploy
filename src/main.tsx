import { createRoot } from 'react-dom/client'
import App from './App'
import { AxiosInterceptor } from './Interceptors/axions.interceptor';
import { ThemeProvider as MuiThemeProvider, CssBaseline } from '@mui/material';
import theme from './Themes/theme';  

AxiosInterceptor();

createRoot(document.getElementById('root')!).render(
  <MuiThemeProvider theme={theme}>
      <CssBaseline />
        <App />
  </MuiThemeProvider>
)
