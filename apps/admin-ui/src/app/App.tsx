import { BrowserRouter } from 'react-router-dom';
import { Admin, CustomRoutes } from 'react-admin';
import {
  accountRoute,
  getFirebaseAuthProvider,
  LoginPage,
} from '@app/admin-auth-ui';
import { addApiTokenInterceptor, apiClient } from './apiClient';
import { Dashboard } from '../dashboard';
import { PostsResource } from '../posts';
import { ApiClientProvider } from '../common';
import { Layout } from './Layout';

export function App() {
  const authProvider = getFirebaseAuthProvider({
    firebase: {
      apiKey: import.meta.env.VITE_ADMIN_AUTH_API_KEY,
    },
    tenantId: import.meta.env.VITE_ADMIN_AUTH_TENANT_ID,
  });

  addApiTokenInterceptor(() => authProvider.getIdToken());

  return (
    <BrowserRouter>
      <ApiClientProvider value={apiClient}>
        <Admin
          authProvider={authProvider}
          loginPage={LoginPage}
          dashboard={Dashboard}
          layout={Layout}
          requireAuth={true}
        >
          {PostsResource}
          <CustomRoutes>{accountRoute()}</CustomRoutes>
        </Admin>
      </ApiClientProvider>
    </BrowserRouter>
  );
}

export default App;
