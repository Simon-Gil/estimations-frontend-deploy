import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { SnackbarProvider } from 'notistack'
import { SnackbarUtilitiesConfigurator } from './Utilities/snackbar-manager'
import { Provider } from 'react-redux';
import store from './Redux/store';
import Login from './pages/Login/Login'
import DashboardLayoutWithRoutes from './pages/PrivateDashboard/Dashboard';
import Home from './pages/PrivateDashboard/Home/Home';
import ListUsers from './pages/PrivateDashboard/Users/ListUsers';
import AuthGuard from './Guard/auth.guard';
import PermissionGuard from './Guard/permission.guard';
import { PrivateRoutes, PublicRoutes } from './models/routes';
import ListAccounts from './pages/PrivateDashboard/Accounts/ListAccounts';
import AccountDetail from './pages/PrivateDashboard/Accounts/AccountDetail';
import ListProposals from './pages/PrivateDashboard/Proposals/ListProposals';
import WorkspaceEstimation from './pages/PrivateDashboard/Estimations/WorkspaceEstimation';
import ResetPassword from './pages/RequestPassword/ResetPassword';
import OpportunityList from './pages/PrivateDashboard/Opportunity/OpportunityList';
import Config from './pages/PrivateDashboard/Config/Config';

function App() {
  return (
    <>
      <Provider store={store}>
        <SnackbarProvider maxSnack={3}>
          <SnackbarUtilitiesConfigurator />
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<Navigate to={PrivateRoutes.DASHBOARD} />} />
              <Route path='*' element={<Login />} />
              <Route path={PublicRoutes.LOGIN} element={<Login />} />
              <Route path={PublicRoutes.RESETPASSWORD} element={<ResetPassword />} />
              <Route element={<AuthGuard />}>
                <Route path={`${PrivateRoutes.DASHBOARD}/*`} element={<DashboardLayoutWithRoutes />}>
                  <Route path='home' element={<Home />} />
                  <Route path='users' element={
                    <PermissionGuard subjects={['user']} requiredActions={['read']}>
                      <ListUsers />
                    </PermissionGuard>
                  } />
                  <Route path='account' element={
                    <PermissionGuard subjects={['account']}>
                      <ListAccounts />
                    </PermissionGuard>
                  } />
                  //securizarla internamente y la manera en la que se llega a el
                  <Route path='account/account-details' element={
                    <PermissionGuard subjects={['account']}>
                      <AccountDetail />
                    </PermissionGuard>
                  } />
                  <Route path='opportunities' element={
                    <PermissionGuard subjects={['opportunity']}>
                      <OpportunityList />
                    </PermissionGuard>
                  } />
                  <Route path='config' element={
                    <PermissionGuard subjects={['settings', 'roles_and_permissions']}>
                      <Config />
                    </PermissionGuard>
                  } />
                  <Route path='proposals' element={
                    <PermissionGuard subjects={['proposal']}>
                      <ListProposals />
                    </PermissionGuard>
                  } />
                  <Route path='proposals/workspace/:proposalId' element={
                    <PermissionGuard subjects={['proposal']}>
                      <WorkspaceEstimation />
                    </PermissionGuard>
                  } />
                  <Route path='proposals/workspace' element={
                    <PermissionGuard subjects={['proposal']}>
                      <WorkspaceEstimation />
                    </PermissionGuard>
                  } />
                  <Route path='*' element={<Home />} />
                </Route>
              </Route>
            </Routes>
          </BrowserRouter>
        </SnackbarProvider>
      </Provider>
    </>
  )
}

export default App
